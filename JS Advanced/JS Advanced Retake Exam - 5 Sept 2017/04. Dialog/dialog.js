

class Dialog {
    constructor(message, callback) {
        this.message = message;
        this.callback = callback;
        this.inputs = []
    }

    addInput(label, name, type) {
        this.inputs.push([label, name, type])
    }

    render() {
        let overlay = $("<div class='overlay'>");
        let dialog = $("<div class='dialog'>");
        let message = $(`<p>${this.message}</p>`);

        dialog.append(message);

        this.inputs.forEach(input => {
            let label = input[0];
            let name = input[1];
            let type = input[2];
            let labelInput = `
                <label>${label}</label>
                <input name="${name}" type="${type}">
                `;
            dialog.append(labelInput);
        });

        let okButton = $("<button>OK</button>").click(this._submit.bind(this, overlay));
        let cancelButton = $("<button>Cancel</button>").click(this._cancel.bind(this, overlay));

        dialog.append(okButton);
        dialog.append(cancelButton);
        overlay.append(dialog);

        $(document.body).append(overlay);
    }

    _submit(overlay, ev) {
        let values = {}
        $(overlay).find("input").each((ind, el) => values[el.name] = el.value)
        $(overlay).remove();

        this.callback(values);
    }

    _cancel(overlay, ev) {
        $(overlay).remove();
    }
}