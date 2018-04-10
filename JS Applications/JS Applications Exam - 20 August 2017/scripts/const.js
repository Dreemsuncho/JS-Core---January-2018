



(function (app) {
    $(function () {

        app.CONST = {
            username: "username",
            authToken: "authToken",
            id: "id",

            headerBasic: "Basic",
            headerKinvey: "Kinvey",

            urlWelcome: "#/",
            urlLogin: "#/login",
            urlRegister: "#/register",
            urlLogout: "#/logout",
            urlCatalog: "#/catalog",

            urlPost: "#/posts/:id",
            urlPostEdit: "#/posts/:id/edit",
            urlPostDelete: "#/posts/:id/delete",
            urlPostCreate: "#/posts/new",
            urlPostsMy:"#/posts/my",

            urlCommentCreate: "#/posts/:id/comments/new",
            urlCommentDelete: "#/posts/:id/comments/:commentId/delete"
        }

    });
})(window.App);