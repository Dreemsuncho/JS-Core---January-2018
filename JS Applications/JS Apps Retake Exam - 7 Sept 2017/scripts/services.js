

(function (app) {
    $(function () {

        const pathTemplateHeader = "./templates/common/header.hbs";
        const pathTemplateFooter = "./templates/common/footer.hbs";
        const pathTemplateMenu = "./templates/common/menu.hbs";
        const pathTemplateChirps = "./templates/partials/chirps.hbs";
        const pathTemplateLogin = "./templates/login.hbs";
        const pathTemplateRegister = "./templates/register.hbs";
        const pathTemplateFeed = "./templates/feed.hbs";
        const pathTemplateFeedMe = "./templates/me.hbs";
        const pathTemplateDiscover = "./templates/discover.hbs";

        const ss = sessionStorage;

        // constants
        const _CONST = app.constants;
        const urlFeed = _CONST.urlFeed;
        const urlLogin = _CONST.urlLogin;

        // auth
        const AUTH = app.auth
        const isUserLoggedIn = AUTH.isUserLoggedIn;

        // utils
        const UTILS = app.utils;
        const validateInputRegister = UTILS.validateInputRegister;
        const validateTextChirp = UTILS.validateTextChirp;
        const calcTime = UTILS.calcTime;
        const checkUserExistence = UTILS.checkUserExistence;
        const saveCurrentUser = UTILS.saveCurrentUser;

        // notifications
        const NOTIFICATIONS = app.notifications
        const showInfo = NOTIFICATIONS.showInfo;
        const showError = NOTIFICATIONS.showError;
        const handleError = NOTIFICATIONS.handleError;

        // rest
        const REST = app.rest;
        const GET = REST.GET;
        const POST = REST.POST;
        const PUT = REST.PUT;
        const DELETE = REST.DELETE;


        let GET_Home = function () {
            if (isUserLoggedIn()) {
                this.redirect(urlFeed);
            } else {
                this.redirect(urlLogin);
            }
        }

        let GET_Login = function () {
            this.loadPartials({
                header: pathTemplateHeader,
                footer: pathTemplateFooter
            }).then(function () {
                this.partial(pathTemplateLogin);
            });
        }

        let POST_Login = function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            let reqBody = {
                username, password
            }

            POST("user", "login", _CONST.headerBasic, reqBody)
                .then(function (res) {
                    let message = "Login successful.";
                    saveCurrentUser(ctx, message, res);
                })
                .catch(handleError);
        }

        let GET_Register = function () {
            this.loadPartials({
                header: pathTemplateHeader,
                footer: pathTemplateFooter
            }).then(function () {
                this.partial(pathTemplateRegister);
            });
        }

        let POST_Register = function (ctx) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPass = this.params.repeatPass;

            let isValidRegisterInput = validateInputRegister(username, password, repeatPass);

            if (isValidRegisterInput) {
                let reqBody = { username: username, password: password, subscriptions: [] };

                POST("user", "", _CONST.headerBasic, reqBody)
                    .then(function (res) {
                        let message = "User registration successful.";
                        saveCurrentUser(ctx, message, res);
                    })
                    .catch(handleError);
            }
            else {
                showError("Invalid register data!");
            }
        }

        let logout = function (ctx) {
            POST("user", "_logout", _CONST.headerKinvey)
                .then(function () {
                    ss.clear();
                    ctx.redirect(urlLogin);
                    showInfo("Logout successful.");
                })
                .catch(handleError);
        };



        let GET_Feed = async function (ctx) {
            if (!isUserLoggedIn()) {
                this.redirect(urlLogin);
                return;
            }

            this.loggedUser = ss.getItem(_CONST.username);
            this.queryUser = this.params.username;

            let username = this.queryUser || this.loggedUser;
            let isUserExists = await checkUserExistence(username);

            if (isUserExists) {
                let chirpAuthors = ss.getItem(_CONST.subscriptions);
                let followingCount = JSON.parse(chirpAuthors).length;

                let urlChirpsUser = `chirps?query={"author": "${username}"}&sort={"_kmd.ect": 1}`;
                let urlChirpsSub = `chirps?query={"author":{"$in": ${chirpAuthors}}}&sort={"_kmd.ect": 1}`;

                let urlFollowers = `?query={"${_CONST.subscriptions}":"${username}"}`;

                let user = await GET(`user`, `?query={"username":"${username}"}`, _CONST.headerKinvey);
                let responseChirpsSub = await GET("appdata", urlChirpsSub, _CONST.headerKinvey);
                let responseChirpsUser = await GET("appdata", urlChirpsUser, _CONST.headerKinvey);
                let responseFollowers = await GET("user", urlFollowers, _CONST.headerKinvey);

                let isHomePage = this.queryUser === undefined;
                this.isLoggedUser = this.loggedUser === this.queryUser;
                this.hasFollow = chirpAuthors.includes(this.queryUser);
                this.username = username;
                this.userId = user[0]._id;
                this.chirpAuthors = chirpAuthors;
                this.followingCount = followingCount;
                this.followersCount = responseFollowers.length;
                this.chirpsCount = responseChirpsUser.length;
                this.chirps = (isHomePage === true
                    ? responseChirpsSub
                    : responseChirpsUser).map(function (chirp) {
                        return {
                            id: chirp._id,
                            author: chirp.author,
                            created: calcTime(chirp._kmd.ect),
                            text: chirp.text
                        }
                    });

                this.loadPartials({
                    header: pathTemplateHeader,
                    footer: pathTemplateFooter,
                    menu: pathTemplateMenu,
                    chirps: pathTemplateChirps
                }).then(function () {
                    isHomePage === true
                        ? this.partial(pathTemplateFeed)
                        : this.partial(pathTemplateFeedMe);
                });
            }
        }

        let POST_Chirp = function (ctx) {
            let author = ss.getItem(_CONST.username);
            let text = this.params.text;

            let isValidTextChirp = validateTextChirp(text);

            if (isValidTextChirp) {
                let reqBody = {
                    author: author,
                    text: text
                };

                POST("appdata", "chirps", _CONST.headerKinvey, reqBody)
                    .then(function () {
                        ctx.redirect(_CONST.urlFeed + "/" + author);
                        showInfo("Chirp published.");
                    })
                    .catch(handleError);
            }
            else {
                showError("Chirp cannot be empty string and must be at most 150 symbols.")
            }
        }

        let DELETE_Chirp = async function () {
            let chirpId = this.params.id;
            let url = "chirps/" + chirpId;

            try {
                await DELETE("appdata", url, _CONST.headerKinvey);
                this.redirect(urlFeed + "/" + ss.getItem(_CONST.username));
                showInfo("Chirp deleted.");
            }
            catch (err) {
                handleError(err);
            }
        }

        let GET_Discover = async function () {

            let resultUsers = await GET("user", "", _CONST.headerKinvey);
            this.loggedUser = ss.getItem(_CONST.username);

            // context
            this.users = [];
            this.hasUsers = resultUsers.length > 0;

            let usernames = resultUsers
                .map(u => u.username)
                .filter(u => u !== this.loggedUser);

            let url = `?query={"subscriptions":{"$in":${JSON.stringify(usernames)}}}`;
            let res = await GET(`user`, url, _CONST.headerKinvey);

            resultUsers.forEach(user => {
                if (user.username !== this.loggedUser) {
                    let username = user.username;
                    let followers = res.filter(u => u.subscriptions.includes(username)).length;
                    this.users.push({ username, followers });
                }
            });

            this.loadPartials({
                header: pathTemplateHeader,
                menu: pathTemplateMenu,
                footer: pathTemplateFooter
            }).then(function () {
                this.partial(pathTemplateDiscover);
            });
        }

        let POST_Follow = async function () {
            let loggedUsername = ss.getItem(_CONST.username);
            let loggedUser = await GET(`user`, `?query={"username":"${loggedUsername}"}`, _CONST.headerKinvey);
            let userId = loggedUser[0]._id;
            let targetUsername = this.params.username;

            let reqBody = {
                subscriptions: loggedUser[0].subscriptions
            }


            let messageInfo;
            if (this.path.startsWith("/#/follow")) {
                reqBody.subscriptions.push(targetUsername);
                messageInfo=`Subscribed to ${targetUsername}`;
            } else {
                reqBody.subscriptions = reqBody.subscriptions.filter(name => name !== targetUsername);
                messageInfo=`Unsubscribed to ${targetUsername}`;
            }

            try {
                let res = await PUT("user", userId, _CONST.headerKinvey, reqBody);
                ss.setItem(_CONST.subscriptions, JSON.stringify(reqBody.subscriptions));
                this.redirect("/#/feed/" + targetUsername);
                showInfo(messageInfo);
            }
            catch (err) {
                handleError(err);
            }
        }


        app.services = {
            GET_Home,
            GET_Login,
            GET_Register,
            GET_Feed,
            GET_Discover,

            POST_Login,
            POST_Register,
            POST_Chirp,
            POST_Follow,

            DELETE_Chirp,
            logout
        };
    });
})(window.App);