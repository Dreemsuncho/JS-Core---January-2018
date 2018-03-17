



function move(command) {
    let townsAvailable = $("#available-towns option:selected");
    let townsSelected = $("#selected-towns option:selected");

    switch (command) {
        case "right":
            if (townsAvailable.length > 0) {
                let optionSelected = $(townsAvailable[0]);
                $("#selected-towns").append(optionSelected);
            }
            break;
        case "left":
            if (townsSelected.length > 0) {
                let optionSelected = $(townsSelected[0]);
                $("#available-towns").append(optionSelected);
            }
            break;
        case "print":
            let towns = Array.from($("#selected-towns option").map((ind, option) => option.textContent)).join("; ");
            $("div#output").text(towns);
            break;
    }
}