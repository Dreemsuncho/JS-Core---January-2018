

(function (app) {
    $(function () {

        // constants
        const _CONST = app.constants;
        const urlLogin = _CONST.urlLogin;
        const urlRegister = _CONST.urlRegister;
        const urlLogout = _CONST.urlLogout;
        const urlFeed = _CONST.urlFeed;
        const urlFeedUser = _CONST.urlFeedUser;
        const urlChirp = _CONST.urlChirp;
        const urlChirpId = _CONST.urlChirpId;
        const urlDiscover = _CONST.urlDiscover;
        const urlFollow = _CONST.urlFollow;
        const urlUnfollow = _CONST.urlUnfollow;

        // services
        const SERVICES = app.services;
        const GET_Home = SERVICES.GET_Home;
        const GET_Login = SERVICES.GET_Login;
        const GET_Register = SERVICES.GET_Register;
        const GET_Feed = SERVICES.GET_Feed;
        const GET_Discover = SERVICES.GET_Discover;
        const POST_Login = SERVICES.POST_Login;
        const POST_Register = SERVICES.POST_Register;
        const POST_Chirp = SERVICES.POST_Chirp;
        const POST_Follow = SERVICES.POST_Follow;
        const DELETE_Chirp = SERVICES.DELETE_Chirp;
        const logout = SERVICES.logout

        // auth
        const AUTH = app.auth
        const isUserLoggedIn = AUTH.isUserLoggedIn;


        const _appSammy = $.sammy("#main", function () {

            this.use("Handlebars", "hbs");

            // DELETE
            this.get(urlChirpId, DELETE_Chirp)

            // GET
            this.get("#/", GET_Home);
            this.get(urlRegister, GET_Register);
            this.get(urlLogin, GET_Login);
            this.get(urlLogout, logout);
            this.get(urlFeed, GET_Feed);
            this.get(urlFeedUser, GET_Feed);
            this.get(urlDiscover, GET_Discover);
            this.get(urlFollow, POST_Follow);
            this.get(urlUnfollow, POST_Follow);

            // POST
            this.post(urlLogin, POST_Login);
            this.post(urlRegister, POST_Register);
            this.post(urlChirp, POST_Chirp);
        });

        app.ctx = _appSammy;
        _appSammy.run("#/");
    });
})(window.App);
