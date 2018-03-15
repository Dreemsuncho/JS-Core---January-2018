

class TitleBar {
    constructor(title) {
        this.title = title;
        this.titleBar = document.createDocumentFragment();
        this._generateTitleBar();
    }

    addLink(href, name) {
        let newLink = $("<a>").addClass("menu-link").attr("href", href).text(name);
        this.nav.append(newLink);
    }

    appendTo(selector) {
        $(this.titleBar).prependTo($(selector))
    }

    _generateTitleBar() {
        this.header = $("<header>").addClass("header");
        this.headerRow = $("<div>").addClass("header-row");
        this.button = $("<a>&#9776;</a>").addClass("button").click(toggleMenu.bind(this));
        this.title = $("<span>").addClass("title").text(this.title);
        this.drawer = $("<div>").addClass("drawer").css("display", "none");
        this.nav = $("<nav>").addClass("menu");

        this.header.appendTo(this.titleBar);
        this.header.append(this.headerRow);
        this.header.append(this.drawer);

        this.headerRow.append(this.button);
        this.headerRow.append(this.title);

        this.drawer.append(this.nav);

        function toggleMenu() {
            let isDrawerVisible = this.drawer.css("display") === "block";
            if (isDrawerVisible === true) {
                this.drawer.css("display", "none")
            } else {
                this.drawer.css("display", "block")
            }
        }
    }
}

$(document).ready(function () {
    let header = new TitleBar('Title Bar Problem');
    header.addLink('/', 'Home');
    header.addLink('about', 'About');
    header.addLink('results', 'Results');
    header.addLink('faq', 'FAQ');
    header.appendTo('#container');
})
