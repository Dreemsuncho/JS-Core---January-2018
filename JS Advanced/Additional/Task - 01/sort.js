function sort(colIndex, descending) {
    let rows = $("#products tbody tr");
    let newRows;

    if (colIndex === 0) {
        newRows = rows.sort((tr1, tr2) => {
            let name1 = $(tr1).find("td")[0].textContent;
            let name2 = $(tr2).find("td")[0].textContent;
            return descending === false
                ? name1.localeCompare(name2)
                : name2.localeCompare(name1);
        });
    } else {
        newRows = rows.sort((tr1, tr2) => {
            let price1 = Number($(tr1).find("td")[1].textContent);
            let price2 = Number($(tr2).find("td")[1].textContent);
            return descending === false
                ? price1 - price2
                : price2 - price1;
        });
    }

    $("#products tbody").append(newRows);
}