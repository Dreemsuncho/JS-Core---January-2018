

class PaymentManager {
    constructor(title) {
        this.title = title;
    }

    render(id) {
        let table = this._generateHtml();
        $("#" + id).append(table);
    }

    _generateHtml() {
        let table = $("<table>");
        let caption = $("<caption>").text(`${this.title} Payment Manager`);
        let tHead = $(`
            <thead>
                <tr>
                    <th class="name">Name</th>
                    <th class="category">Category</th>
                    <th class="price">Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
        `);

        let tBody = $("<tbody>").addClass("payments");

        let tFoot = $("<tfoot>").addClass("input-data");
        let trFoot = $("<tr>");

        let tdName = $("<td>");
        let tdCategory = $("<td>");
        let tdPrice = $("<td>");
        let tdBtn = $("<td>");

        let inputName = $("<input name='name' type='text'>");
        let inputCategory = $("<input name='category' type='text'>");
        let inputPrice = $("<input name='price' type='number'>");

        let btnAdd = $("<button>").text("Add").click(function () {
            let trBody = $("<tr>");

            let nameInput = $(tFoot.find("input")[0]);
            let categoryInput = $(tFoot.find("input")[1]);
            let priceInput = $(tFoot.find("input")[2]);

            if (nameInput.val() === "" || categoryInput.val() === "" || priceInput.val() === "") {
                return;
            }



            let tdName = $("<td>").text(nameInput.val())
            let tdCategory = $("<td>").text(categoryInput.val())
            let tdPrice = $("<td>").text(Number(Number(priceInput.val()).toFixed(2)))
            let tdBtn = $("<td>")
            let btnDelete = $("<button>").text("Delete").click(function () { trBody.remove() });

            nameInput.val("");
            categoryInput.val("");
            priceInput.val("");

            trBody.append(tdName);
            trBody.append(tdCategory);
            trBody.append(tdPrice);
            trBody.append(tdBtn);
            tdBtn.append(btnDelete);
            tBody.append(trBody)
        });

        table.append(caption);
        table.append(tHead);
        table.append(tBody);
        table.append(tFoot);

        tFoot.append(trFoot);
        trFoot.append(tdName);
        trFoot.append(tdCategory);
        trFoot.append(tdPrice);
        trFoot.append(tdBtn);

        tdName.append(inputName);
        tdCategory.append(inputCategory);
        tdPrice.append(inputPrice);
        tdBtn.append(btnAdd);

        return table;
    }
}