



(function (app) {
    $(function () {

        const ss = sessionStorage;

        const host = "https://baas.kinvey.com";
        const appKey = "kid_SJAdcUMof";
        const appSecret = "227ee14a3b0d4852b6aee15f6a147de5";

        const _CONST = app.CONST;

        let makeRequest = function (method, module, url, auth, data) {
            let req = {
                method: method,
                url: `${host}/${module}/${appKey}/${url}`,
                headers: makeHeaders(auth)
            }

            if (data !== undefined) {
                req.data = JSON.stringify(data);
                req.headers["Content-Type"] = "application/json";
            }

            return req;
        }

        let makeHeaders = function (auth) {
            let token = btoa(appKey + ":" + appSecret);

            if (auth !== _CONST.headerBasic) {
                token = ss.getItem(_CONST.authToken);
            }

            return { "Authorization": auth + " " + token }
        }


        let GET = function (module, url, auth) {
            let req = makeRequest("GET", module, url, auth);
            return $.ajax(req);
        }

        let POST = function (module, url, auth, data) {
            let req = makeRequest("POST", module, url, auth, data);
            return $.ajax(req);
        }

        let PUT = function (module, url, auth, data) {
            let req = makeRequest("PUT", module, url, auth, data);
            return $.ajax(req);
        }

        let DELETE = function (module, url, auth) {
            let req = makeRequest("DELETE", module, url, auth);
            return $.ajax(req);
        }

        app.AJAX = { GET, POST, PUT, DELETE }
    });
})(window.App);