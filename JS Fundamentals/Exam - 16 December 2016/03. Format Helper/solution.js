function solve([text]) {
    return text.replace(/([.,!?:;])\s*/g, "$1 ")
        .replace(/\s+([.,!?:;])/g, "$1")
        .replace(/\.\s*\.\s*\.\s*!/g, "...!")
        .replace(/\.\s+([0-9])/g, ".$1")
        .replace(/"([^"]+)"/g, (match, gr) => `"${gr.trim()}"`)
}