



(function (app) {
    $(function () {

        // constants
        const _CONST = app.CONST;

        // services
        const SERVICES = app.SERVICES;
        const getWelcome = SERVICES.getWelcome;
        const getCatalog = SERVICES.getCatalog;
        const getPost = SERVICES.getPost;
        const getPostEdit = SERVICES.getPostEdit;
        const getPostCreate = SERVICES.getPostCreate;
        const getPostDelete = SERVICES.getPostDelete;
        const getPostsMy = SERVICES.getPostsMy;
        const getCommentDelete = SERVICES.getCommentDelete;
        const postPostEdit = SERVICES.postPostEdit;
        const postLogin = SERVICES.postLogin;
        const postRegister = SERVICES.postRegister;
        const postPostCreate = SERVICES.postPostCreate;
        const postCommentCreate = SERVICES.postCommentCreate;
        const logout = SERVICES.logout;


        const _sammy = $.sammy(".content", function () {

            this.use("Handlebars", "hbs");

            this.get(_CONST.urlWelcome, getWelcome);
            this.get(_CONST.urlCatalog, getCatalog);
            this.get(_CONST.urlLogout, logout);
            this.get(_CONST.urlPostCreate, getPostCreate);
            this.get(_CONST.urlPostsMy, getPostsMy);
            this.get(_CONST.urlPostEdit, getPostEdit);
            this.get(_CONST.urlPost, getPost);
            this.get(_CONST.urlPostDelete, getPostDelete);
            this.get(_CONST.urlCommentDelete, getCommentDelete);

            this.post(_CONST.urlLogin, postLogin);
            this.post(_CONST.urlRegister, postRegister);
            this.post(_CONST.urlPostCreate, postPostCreate);
            this.post(_CONST.urlPostEdit, postPostEdit);
            this.post(_CONST.urlCommentCreate, postCommentCreate);
        });

        _sammy.run(_CONST.urlWelcome);
    });
})(window.App);