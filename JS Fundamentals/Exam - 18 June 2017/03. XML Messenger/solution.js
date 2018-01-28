function solve(tag) {

    const tagValidator = /^<message((?:\s*[a-z]+="[a-zA-Z0-9 .]+"\s*)*)>([^<>]+)<\/message>$/g;

    var tokens = tagValidator.exec(tag)
    if (tokens === null) {
        console.log('Invalid message format')
        return
    }

    let [match, attributes, message] = tokens
    const attrValidator = /(?=.*from="([a-zA-Z0-9 .]+)")(?=.*to="([a-zA-Z0-9 .]+)")/g;

    let attrTokens = attrValidator.exec(attributes)
    if (attrTokens === null) {
        console.log("Missing attributes")
        return
    }

    let from = attrTokens[1]
    let to = attrTokens[2]

    let bodyMessage = message.split('\n')
        .map(part => `<p>${part}</p>`)
        .join('\n\t')

    let html = `
<article>
    <div>From: <span class="sender">${from}</span></div>
    <div>To: <span class="recipient">${to}</span></div>
    <div>
        ${bodyMessage}
    </div>
</article>
`
    return html
}