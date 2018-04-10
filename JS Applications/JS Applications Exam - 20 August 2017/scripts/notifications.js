
(function (app) {
    $(function () {

        let boxLoading = $("#loadingBox");
        let boxError = $("#errorBox").click(function () { $(this).fadeOut() });
        let boxInfo = $("#infoBox").click(function () { $(this).fadeOut() });

        let loadings = 0;

        $(document).on({
            ajaxStart: function () {
                if (loadings === 0) {
                    boxLoading.fadeIn();
                }
                loadings += 1;
            },
            ajaxStop: function () {
                setTimeout(() => {
                    loadings -= 1;
                    if (loadings === 0) {
                        boxLoading.fadeOut();
                    }
                }, 600);
            }
        });

        let showInfo = function (message) {
            boxInfo.find("span").text(message);
            boxInfo.fadeIn(
                setTimeout(function () {
                    boxInfo.fadeOut();
                }, 3000)
            );
        }

        let showError = function (message) {
            boxError.find("span").text(message);
            boxError.fadeIn();
        }

        let handleError = function (err) {
            let message = err.responseJSON === undefined
                ? err.message || "Something went wrong"
                : err.responseJSON.description || err.responseJSON.error

            showError(message);
        }


        app.NOTIFY = { showInfo, showError, handleError }
    });
})(window.App);
