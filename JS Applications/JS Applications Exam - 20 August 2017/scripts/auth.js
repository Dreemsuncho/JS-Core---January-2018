



(function (app) {
    $(function () {

        let _CONST = app.CONST;
        let ss = sessionStorage;

        let isUserLoggedIn = function () {
            let username = ss.getItem(_CONST.username);
            return username !== null;
        }

        let getLoggedUser = function () {
            return ss.getItem(_CONST.username);
        }

        app.AUTH = { isUserLoggedIn, getLoggedUser }
    });
})(window.App);