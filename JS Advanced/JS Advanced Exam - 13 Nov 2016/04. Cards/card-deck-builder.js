
function cardDeckBuilder(selector) {
    let suits = {
        C: "\u2663",
        D: "\u2666",
        H: "\u2665",
        S: "\u2660"
    }
    let mainWrapper = $(selector);

    let addCard = function (face, suit) {
        let div = $(`<div class="card">${face} ${suits[suit]}</div>`);

        div.click(function () {
            mainWrapper.find("div").each((ind, elem) => {
                let currentElem = $(elem)
                mainWrapper.prepend(currentElem);
            });
        });
        mainWrapper.append(div);
    }

    return { addCard }
}