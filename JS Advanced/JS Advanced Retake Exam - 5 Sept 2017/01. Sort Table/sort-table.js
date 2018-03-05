function sort(colIndex, descending) {

    if (colIndex === undefined ||
        descending === undefined) {
        return;
    }

    let table = $("#products");
    let tBody = table.find("tbody")
    let tRows = Array.from(tBody.find("tr"));

    tRows.sort((a, b) => {
        let firstVal = $(a).find(`td:nth-child(${colIndex + 1})`).text()
        let secondVal = $(b).find(`td:nth-child(${colIndex + 1})`).text()

        let result = undefined;

        if (colIndex === 0) {
            result = firstVal.localeCompare(secondVal);
        } else {
            result = Number(firstVal) - Number(secondVal);
        }

        return result;
    });

    if (descending === true) {
        tRows.reverse();
    }

    $(tRows).each((i, tr) => $(tr).appendTo(tBody))

}