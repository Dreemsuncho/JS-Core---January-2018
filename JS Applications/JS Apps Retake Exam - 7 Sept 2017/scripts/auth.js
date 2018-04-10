

(function (app) {
    $(function () {

        let _CONST = app.constants;
        let ss = sessionStorage;

        let isUserLoggedIn = function () {
            let username = ss.getItem(_CONST.username);
            return username !== null;
        };


        app.auth = { isUserLoggedIn }
        
    });
})(window.App);
