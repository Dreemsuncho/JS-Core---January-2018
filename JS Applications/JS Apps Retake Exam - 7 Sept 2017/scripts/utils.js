
(function (app) {
    $(function () {

        let ss = sessionStorage;

        // notifications
        const NOTIFICATIONS = app.notifications;
        const showInfo = NOTIFICATIONS.showInfo;
        const showError = NOTIFICATIONS.showError;
        // rest
        const POST = app.rest.POST;
        // constants
        const _CONST = app.constants;


        let calcTime = function (dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);
            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }

        function validateInputRegister(username, password, repeatPass) {
            let result = false;

            if (typeof username === "string" &&
                username.length >= 5 &&
                password.length > 0 &&
                password === repeatPass
            ) {
                result = true;
            }
            return result;
        }

        function validateTextChirp(text) {
            let result = false;

            if (text.length > 0 && text.length <= 150) {
                result = true;
            }
            return result;
        }

        let checkUserExistence = async function (username) {
            let result = await POST("rpc", "check-username-exists", _CONST.headerBasic, { username: username });

            let isUserExists = result.usernameExists
            if (isUserExists) {
                return true;
            } else {
                showError("Username '" + username + "' does not exist!");
                return false;
            }
        }

        let saveCurrentUser = function (ctx, message, response) {
            ss.setItem(_CONST.authToken, response._kmd.authtoken);
            ss.setItem(_CONST.username, response.username);
            ss.setItem(_CONST.subscriptions, JSON.stringify(response.subscriptions));
            ctx.redirect(_CONST.urlFeed);
            showInfo(message);
        }


        app.utils = {
            calcTime,
            validateInputRegister,
            validateTextChirp,
            checkUserExistence,
            saveCurrentUser
        }
    });
})(window.App);
