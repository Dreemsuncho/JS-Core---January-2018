
class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.online = false;

        this._box; // contact box
    }

    set online(val) {
        this._online = val;
        this._setOnlineStatus(val);
    }

    get online() {
        return this._online;
    }

    _setOnlineStatus(isOnline) {
        let box = $(this._box);
        let title = box.find(".title");

        if (isOnline === true) {
            title.addClass("online");
        } else {
            title.removeClass("online");
        }
    }

    _compose() {
        let box = $("<article>")

        let title = $(`
            <div class="title">
                ${this.firstName} ${this.lastName}
            </div>
        `);
        let info = $(`
            <div class="info" style="display: none">
                <span>&phone; ${this.phone}</span>
                <span>&#9993; ${this.email}</span>
            </div>
        `);
        let button = $("<button>&#8505;</button>").click(function () {
            let displayBlock = "block";
            let displayNone = "none";
            let currentDisplay = info.css("display");

            if (currentDisplay === displayBlock) {
                info.css("display", displayNone)
            } else {
                info.css("display", displayBlock)
            }
        });

        title.append(button);
        box.append(title)
        box.append(info)

        this._box = box;
        this._setOnlineStatus(this.online);
        return box;
    }

    render(id) {
        let contactBox = this._compose();
        $("#" + id).append(contactBox);
    }
}