


class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;

        this._online = false;
        this.article = $("<article>");
    }

    get online() {
        return this._online
    }
    set online(val) {
        let title = this.article.find("div.title");
        if (val === true) {
            title.addClass("online")
        } else {
            title.removeClass("online")
        }
        this._online = val;
    }

    render(id) {
        let element = this._generateHtml();
        let wrapperElement = $(`#${id}`);
        wrapperElement.append(element)
    }

    _generateHtml() {
        let info = $("<div>").addClass("info").css("display", "none");
        let phone = $("<span>").html(`&phone; ${this.phone}`);
        let email = $("<span>").html(`&#9993; ${this.email}`);

        let title = $("<div>").addClass(`title ${this.online ? "online" : ""}`).text(`${this.firstName} ${this.lastName}`);
        let button = $("<button>").html("&#8505;").click(function () { Contact._toggleInfo(info) });

        phone.appendTo(info)
        email.appendTo(info)
        button.appendTo(title)


        title.appendTo(this.article);
        info.appendTo(this.article)

        return this.article;
    }

    static _toggleInfo(info) {
        info.css("display") === "none"
            ? info.css("display", "block")
            : info.css("display", "none")
    }
}

let c1 = new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com");
let c2 = new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg");
let c3 = new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com");
let contacts = [c1, c2, c3];
contacts.forEach(c => c.render('main'));

window.c1 = c1;
window.c2 = c2;
window.c3 = c3;



let data = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    phone: '0888 123 456',
    email: 'i.ivanov@gmail.com'
};

let contact = new Contact(data.firstName, data.lastName, data.phone, data.email)
contact.online = true;
contact.render('main');

let element = $('#main').find('article');
let title = element.find('.title');
console.log(title.hasClass('online'))