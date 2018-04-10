
(function (app) {
    $(function () {
        
        const host = "https://baas.kinvey.com";
        const appKey = "kid_HyUCb1N5G";
        const appSecret = "ccd1c0ba532948bd823f2afa5b7b1757";

        const ss = window.sessionStorage;
        const _CONST = app.constants;

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


        app.rest = { GET, POST, PUT, DELETE }

    });
})(window.App);
