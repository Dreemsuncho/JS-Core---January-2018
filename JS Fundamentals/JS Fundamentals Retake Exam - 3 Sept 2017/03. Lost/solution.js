
function lost(keyword, text) {
    const msgRegex = new RegExp(`${keyword}(.*)${keyword}`)
    const northEastRegex = /(north|east)\D*(\d{2})[^,]*,\D*(\d{6})/img;

    let long = ''
    let lat = ''

    let match = northEastRegex.exec(text)
    while (match) { 
        if (match[1].toLowerCase() === 'east') {
            long = `${match[2]}.${match[3]} E`
        }
        else {
            lat = `${match[2]}.${match[3]} N`
        }
        match = northEastRegex.exec(text)
    }   

    let message = msgRegex.exec(text)[1]
    console.log(lat)
    console.log(long)
    console.log(`Message: ${message}`)
}