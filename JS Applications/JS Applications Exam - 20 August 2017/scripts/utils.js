



(function (app) {
    $(function () {

        let ss = sessionStorage;
        let _CONST = app.CONST;

        function calcTime(dateIsoFormat) {
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

        let isValidRegisterInput = function (username, password, repeatPassword) {
            let result = false;

            if (username.length >= 3 &&
                password.length >= 6 &&
                /^[A-Za-z]+$/.test(username) &&
                /^[A-Za-z0-9]+$/.test(password) &&
                password === repeatPassword
            ) {
                result = true;
            }

            return result;
        }

        let isValidLoginInput = function (username, password) {
            let result = false;

            if (username.length >= 3 &&
                password.length >= 6 &&
                /^[A-Za-z]+$/.test(username) &&
                /^[A-Za-z0-9]+$/.test(password)
            ) {
                result = true;
            }

            return result;
        }

        let isValidCreatePostInput = function (url, title) {
            let result = false;

            if (url !== undefined && title !== undefined && url.startsWith("http")) {
                result = true;
            }
            return result;
        }

        let loadTemplates = function (ctx, templates, templateMain) {
            ctx.loadPartials(templates)
                .then(function () {
                    this.partial(templateMain);
                });
        }

        let fillSessionData = function (response) {
            ss.setItem(_CONST.id, response._id);
            ss.setItem(_CONST.username, response.username);
            ss.setItem(_CONST.authToken, response._kmd.authtoken);
        }

        let clearSessionData = function (response) {
            ss.removeItem(_CONST.id);
            ss.removeItem(_CONST.username);
            ss.removeItem(_CONST.authToken);
        }


        app.UTILS = {
            isValidRegisterInput,
            isValidLoginInput,
            isValidCreatePostInput,
            loadTemplates,
            fillSessionData,
            clearSessionData,
            calcTime
        }

    });
})(window.App);