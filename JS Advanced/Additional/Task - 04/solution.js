

class Dialog {
    constructor(message, callback) {
        this.message = message;
        this.callback = callback;

        this.packageInputs = [];
    }

    addInput(labelText, name, type) {
        let label = $("<label>").text(labelText);
        let input = $(`<input name="${name}" type="${type}">`);
        let fragment = { label: label, input: input }
        this.packageInputs.push(fragment);
    }

    render() {
        let dialog = this._buildDialog();
        dialog.appendTo(document.body);
    }

    _buildDialog() {
        let dialog = $("<div>").addClass("overlay");
        let diablogBody = $("<div>").addClass("dialog");
        let dialogMessage = $("<p>").text(this.message);
        let btnOk = $("<button>").text("OK").click(_ => {
            let params = {};

            this.packageInputs.forEach(fragment => {
                let inputName = $(fragment.input).attr("name");
                let inputValue = $(fragment.input).val();
                params[inputName] = inputValue;
            });

            this.callback(params);
            dialog.remove();
        });
        let btnCancel = $("<button>").text("Cancel").click(_ => {
            dialog.remove();
        });

        dialog.append(diablogBody);
        diablogBody.append(dialogMessage);
        this.packageInputs.forEach(fragment => {
            diablogBody.append(fragment.label);
            diablogBody.append(fragment.input);
        });
        diablogBody.append(btnOk);
        diablogBody.append(btnCancel);

        return dialog;
    }
}