



function loadRepos() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let doc = document.getElementById("res");
            doc.textContent = this.responseText;
        }
    };

    req.open("GET", "https://api.github.com/users/testnakov/repos", true);
    req.send();
}