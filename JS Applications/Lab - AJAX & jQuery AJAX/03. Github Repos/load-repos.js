


function loadRepos() {
    let repos = $("#repos");
    let username = $("#username").val();
    let url = "https://api.github.com/users/" + username + "/repos";

    repos.empty();

    $.ajax({
        url: url,
        success: function (res) {
            res.forEach(rep => {
                let item = $("<li>");
                let anchor = $(`<a href="${rep.html_url}">`).text(rep.full_name);
                item.append(anchor);
                repos.append(item)
            });
        },
        error: function () {
            let item = $("<li>").text("Error");
            repos.append(item);
        }
    })
}