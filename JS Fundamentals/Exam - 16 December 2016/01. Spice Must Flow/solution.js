function solve(yeld) {

    let yeldRemain = Number(yeld)
    let totalYeld = 0
    let daysOperated = 0

    while (yeldRemain >= 100) {
        totalYeld += yeldRemain - 26
        daysOperated += 1
        yeldRemain -= 10
    }

    if (yeld >= 100) {
        totalYeld -= 26
    }

    console.log(daysOperated)
    console.log(totalYeld)
}

solve(200)