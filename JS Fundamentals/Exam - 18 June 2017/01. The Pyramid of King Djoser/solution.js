function solve(base, increment) {
    let stone = 0,
        marble = 0,
        lapisLazuli = 0,
        gold = 0

    let steps = 1

    while (base > 2) {
        let parameter = 4 * base
        let outerLayer = (parameter - 4) * increment

        stone += ((base - 2) ** 2) * increment

        if (steps % 5 !== 0) {
            marble += outerLayer
        }
        else {
            lapisLazuli += outerLayer
        }

        base -= 2
        steps += 1
    }

    console.log("Stone required: " + Math.ceil(stone))
    console.log("Marble required: " + Math.ceil(marble))
    console.log("Lapis Lazuli required: " + Math.ceil(lapisLazuli))
    console.log("Gold required: " + Math.ceil(base * base * increment))
    console.log("Final pyramid height: " + Math.floor(steps * increment))
}

