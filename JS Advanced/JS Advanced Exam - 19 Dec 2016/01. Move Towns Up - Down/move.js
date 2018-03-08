

function move(direction) {

    let towns = $("#towns");
    let selected = towns.find("option:selected")

    if (direction === -1) {
        $(selected[0]).prev().before(selected)
    }
    else {
        $(selected[0]).next().after(selected)
    }
} 