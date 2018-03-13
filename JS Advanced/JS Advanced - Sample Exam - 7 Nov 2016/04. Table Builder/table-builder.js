

function tableBuilder(selector) {

    let mainWrapper = $(selector)
    mainWrapper.empty();
    let table = $("<table>");

    let createTable = function (columnNames) {
        let tr = $("<tr>");

        columnNames.forEach(cName => {
            let th = $("<th>" + cName + "</th>");
            tr.append(th);
        });
        tr.append($("<th>Action</th>"));

        table.append(tr);
        mainWrapper.append(table);
    }

    let fillData = function (dataRows) {
        dataRows.forEach(row => {
            let tr = $("<tr>");

            row.forEach(col => {
                let td = $("<td>").text(col);
                tr.append(td)
            });

            let td = $("<td>");
            let deleteBtn = $("<button>Delete</button>").click(function () {
                $(this).parent().parent().remove()
            })
            td.append(deleteBtn);
            tr.append(td);
            table.append(tr);
        });
    }

    return {
        createTable,
        fillData
    }
}
