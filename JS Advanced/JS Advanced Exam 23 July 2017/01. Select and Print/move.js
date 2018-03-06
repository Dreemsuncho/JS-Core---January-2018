

function move(command) {
    let selectedTowns = $("#selected-towns");
    let availTowns = $("#available-towns");

    let townToAppend;

    switch (command) {
        case "left":
            townToAppend = `<option>${selectedTowns.val()}</option>`;
            availTowns.append(townToAppend)

            $("#selected-towns option:selected").remove();
            break;
            
            case "right":
            townToAppend = `<option>${availTowns.val()}</option>`;
            selectedTowns.append(townToAppend)
            
            $("#available-towns option:selected").remove();
            break;

        case "print":
            let townsToPrint = []

            selectedTowns.children().each((ind, item) => {
                townsToPrint.push(item.value)
            });

            $("#output").append(townsToPrint.join("; "))
            break;
    }
}