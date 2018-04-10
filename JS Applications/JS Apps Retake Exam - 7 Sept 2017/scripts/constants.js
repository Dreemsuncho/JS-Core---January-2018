
(function (app) {
    $(function () {

        app.constants = {
            username: "username",

            headerBasic: "Basic",
            headerKinvey: "Kinvey",

            authToken: "authToken",
            subscriptions: "subscriptions",

            urlFeed: "#/feed",
            urlFeedUser: "#/feed/:username",
            urlLogin: "#/login",
            urlRegister: "#/register",
            urlLogout: "#/logout",
            urlChirp: "#/chirp",
            urlChirpId: "#/chirp/:id",
            urlDiscover:"#/discover",
            urlFollow:"#/follow/:username",
            urlUnfollow:"#/unfollow/:username"
        }

    });
})(window.App);