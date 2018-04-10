
(function (app) {
    $(function () {

        const ss = sessionStorage;

        // path templates
        const pathTemplateWelcome = "./templates/welcome.hbs";
        const pathTemplateHeader = "./templates/common/header.hbs";
        const pathTemplateFooter = "./templates/common/footer.hbs";
        const pathTemplateMenu = "./templates/common/menu.hbs";
        const pathTemplateLogin = "./templates/login.hbs";
        const pathTemplateRegister = "./templates/register.hbs";
        const pathTemplateCatalog = "./templates/catalog.hbs";
        const pathTemplatePost = "./templates/sub/post.hbs";
        const pathTemplateComments = "./templates/comments.hbs";
        const pathTemplateSubmit = "./templates/submit.hbs";
        const pathTemplatePostEdit = "./templates/edit.hbs";
        const pathTemplatePostsMy = "./templates/my-posts.hbs";

        // ajax
        const AJAX = app.AJAX;
        const GET = AJAX.GET;
        const POST = AJAX.POST;
        const PUT = AJAX.PUT;
        const DELETE = AJAX.DELETE;

        // constants
        const _CONST = app.CONST;
        const urlWelcome = _CONST.urlWelcome;
        const urlLogin = _CONST.urlLogin;
        const urlRegister = _CONST.urlRegister;
        const urlLogout = _CONST.urlLogout;
        const urlCatalog = _CONST.urlCatalog;

        // notifications
        const NOTIFY = app.NOTIFY;
        const showInfo = NOTIFY.showInfo;
        const showError = NOTIFY.showError;
        const handleError = NOTIFY.handleError;

        // authentication
        const AUTH = app.AUTH;
        const isUserLoggedIn = AUTH.isUserLoggedIn;
        const getLoggedUser = AUTH.getLoggedUser;

        // utils
        const UTILS = app.UTILS;
        const isValidRegisterInput = UTILS.isValidRegisterInput;
        const isValidLoginInput = UTILS.isValidLoginInput;
        const isValidCreatePostInput = UTILS.isValidCreatePostInput;
        const fillSessionData = UTILS.fillSessionData;
        const clearSessionData = UTILS.clearSessionData;
        const calcTime = UTILS.calcTime;
        const loadTemplates = UTILS.loadTemplates;


        let getWelcome = function (ctx) {
            if (isUserLoggedIn() === true) {
                ctx.redirect(_CONST.urlCatalog);
                return;
            }

            let templates = {
                header: pathTemplateHeader,
                footer: pathTemplateFooter
            }
            loadTemplates(ctx, templates, pathTemplateWelcome);
        }

        let getPost = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            try {
                let postId = ctx.params.id;

                ctx.post = await GET(`appdata`, `posts/${postId}`, _CONST.headerKinvey);
                ctx.post.description = ctx.post.description || "No description";
                ctx.comments = await GET(`appdata`, `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, _CONST.headerKinvey);
                // time map
                ctx.post.time = calcTime(ctx.post._kmd.ect)
                // time and author map
                ctx.comments.forEach(c => {
                    c.time = calcTime(c._kmd.ect);
                    c.isAuthor = c.author === getLoggedUser();
                });

                let templates = {
                    header: pathTemplateHeader,
                    footer: pathTemplateFooter,
                    menu: pathTemplateMenu
                }
                loadTemplates(ctx, templates, pathTemplateComments);
            }
            catch (err) {
                handleError(err);
            }
        }

        let getCatalog = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            try {
                ctx.posts = await GET("appdata", "posts?query={}&sort={\"_kmd.ect\": -1}", _CONST.headerKinvey);
                ctx.posts.forEach((p, i) => {
                    p.rank = i + 1;
                    p.time = calcTime(p._kmd.ect);
                    p.isAuthor = p.author === getLoggedUser();
                });

                let templates = {
                    header: pathTemplateHeader,
                    footer: pathTemplateFooter,
                    menu: pathTemplateMenu,
                    post: pathTemplatePost
                }
                loadTemplates(ctx, templates, pathTemplateCatalog);
            }
            catch (err) { handleError(err); }
        }

        let getPostsMy = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            let username = getLoggedUser();
            try {
                ctx.posts = await GET(`appdata`, `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, _CONST.headerKinvey);
                ctx.posts.forEach((p, i) => {
                    p.rank = i + 1;
                    p.time = calcTime(p._kmd.ect);
                    p.isAuthor = true
                });


                let templates = {
                    header: pathTemplateHeader,
                    footer: pathTemplateFooter,
                    menu: pathTemplateMenu,
                    post: pathTemplatePost
                }
                loadTemplates(ctx, templates, pathTemplatePostsMy);
            }
            catch (err) {
                handleError(err);
            }
        }

        let postLogin = function (ctx) {
            (async function () {
                let username = ctx.params.username;
                let password = ctx.params.password;

                if (isValidLoginInput(username, password)) {
                    try {
                        let responseLogin = await POST("user", "login", _CONST.headerBasic, { username, password });
                        fillSessionData(responseLogin);
                        ctx.redirect(urlCatalog);
                        showInfo("Login successful.");
                    }
                    catch (err) { handleError(err); }
                }
                else {
                    let errMessage = "Username must be at least 3 characters long and must have only alphabet letters! " +
                        "Password must be at least 6 symbols long and should have only alphabet letters and digits!";
                    showError(errMessage);
                }
            })();
        }

        let postRegister = function (ctx) {
            (async function () {
                let username = ctx.params.username;
                let password = ctx.params.password;
                let repeatPassword = ctx.params.repeatPass;

                if (isValidRegisterInput(username, password, repeatPassword)) {
                    try {
                        let responseRegister = await POST("user", "", _CONST.headerBasic, { username, password });
                        fillSessionData(responseRegister);
                        ctx.redirect(urlCatalog);
                        showInfo("User registration successful.");
                    }
                    catch (err) { handleError(err); }
                }
                else {
                    let errMessage = "Username must be at least 3 characters long and must have only alphabet letters! " +
                        "Password must be at least 6 symbols long and should have only alphabet letters and digits! " +
                        "Both passwords must match!";
                    showError(errMessage);
                }
            })();
        }

        let getPostCreate = function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(urlWelcome);
                return;
            }

            let templates = {
                header: pathTemplateHeader,
                footer: pathTemplateFooter,
                menu: pathTemplateMenu
            }
            loadTemplates(ctx, templates, pathTemplateSubmit);
        }

        let postPostCreate = function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            (async function () {
                let author = getLoggedUser();
                let url = ctx.params.url;
                let title = ctx.params.title;
                let imageUrl = ctx.params.image;
                let description = ctx.params.comment;

                if (isValidCreatePostInput(url, title)) {
                    try {
                        let reqBody = { author, url, title, imageUrl, description };
                        let responsePostCreate = await POST("appdata", "posts", _CONST.headerKinvey, reqBody);
                        ctx.redirect(urlCatalog);
                        showInfo("Post created.");
                    }
                    catch (err) {
                        handleError(err);
                    }
                }
                else {
                    showError("Url must start with 'http' and title is mandatory!");
                }
            })();
        }

        let getPostEdit = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            try {
                let postId = ctx.params.id;
                this.post = await GET(`appdata`, `posts/${postId}`, _CONST.headerKinvey);

                let templates = {
                    header: pathTemplateHeader,
                    footer: pathTemplateFooter,
                    menu: pathTemplateMenu
                }
                loadTemplates(ctx, templates, pathTemplatePostEdit);
            }
            catch (err) {
                handleError(err)
            }
        }

        let postPostEdit = function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            (async function () {
                let author = getLoggedUser();
                let url = ctx.params.url;
                let postId = ctx.params.id;
                let title = ctx.params.title;
                let imageUrl = ctx.params.image;
                let description = ctx.params.description;

                try {
                    let reqBody = { author, url, postId, title, imageUrl, description };
                    let responsePost = await PUT(`appdata`, `posts/${postId}`, _CONST.headerKinvey, reqBody);
                    ctx.redirect(urlCatalog);
                    showInfo(`Post ${title} updated.`);
                }
                catch (err) {
                    handleError(err);
                }
            })();
        }

        let getPostDelete = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            try {
                let postId = this.params.id;
                let responseDelete = await DELETE(`appdata`, `posts/${postId}`, _CONST.headerKinvey);
                ctx.redirect(_CONST.urlCatalog);
                showInfo("Post deleted.");
            }
            catch (err) {
                handleError(err);
            }
        }

        let postCommentCreate = function (ctx) {
            (async function () {
                if (isUserLoggedIn() === false) {
                    ctx.redirect(_CONST.urlWelcome);
                    return;
                }

                let content = ctx.params.content;
                let postId = ctx.params.id;
                let author = getLoggedUser();
                let reqBody = { content, postId, author }

                try {
                    let responseCreateComment = await POST("appdata", "comments", _CONST.headerKinvey, reqBody);
                    ctx.redirect(`#/posts/${postId}`);
                    showInfo("Comment created.");
                }
                catch (err) {
                    handleError(err);
                }
            })();
        }
        
        let getCommentDelete = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }
            
            let postId = ctx.params.id;
            let commentId = ctx.params.commentId;
            
            try {
                let responseCommentDelete = await DELETE("appdata", `comments/${commentId}`, _CONST.headerKinvey);
                ctx.redirect(`#/posts/${postId}`);
                showInfo("Comment deleted.");
            }
            catch (err) {
                handleError(err);
            }
        }

        let logout = async function (ctx) {
            if (isUserLoggedIn() === false) {
                ctx.redirect(_CONST.urlWelcome);
                return;
            }

            try {
                await POST("user", "_logout", _CONST.headerKinvey);
                clearSessionData();
                ctx.redirect(urlCatalog);
                showInfo("Logout successful.");
            }
            catch (err) {
                handleError(err);
            }
        }


        app.SERVICES = {
            getWelcome,
            getCatalog,
            getPost,
            getPostCreate,
            getPostEdit,
            getPostDelete,
            getPostsMy,
            getCommentDelete,
            postPostEdit,
            postLogin,
            postRegister,
            postPostCreate,
            postCommentCreate,
            logout
        }

    });
})(window.App);