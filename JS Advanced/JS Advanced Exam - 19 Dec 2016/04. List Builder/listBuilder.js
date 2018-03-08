function listBuilder(selector) {

    let element = $(selector);
    let ul = $("<ul>")

    let createNewList = () => {
        element.empty();
        element.append(ul)
    }

    let addItem = (str) => {
        let li = $("<li>");
        let btnUp = $("<button>Up</button>").click(function () {
            let $this = $(this).parent();
            $this.prev().before($this);
        })
        let btnDown = $("<button>Down</button>").click(function () {
            let $this = $(this).parent();
            $this.next().after($this);
        })

        li.text(str)
        li.append(btnUp)
        li.append(btnDown)

        ul.append(li);
    }

    return { createNewList, addItem }
}



$(function () {
    let builder = listBuilder("#main");
    builder.createNewList();
    builder.addItem("Sofia");
    builder.addItem("Varna");
    builder.addItem("Sofia <new>");
    builder.addItem("Pleven");
});