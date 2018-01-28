function solve(primaryMap, secondaryMap, overlayCoords, startCoord) {
    let primaryRowLen = primaryMap.length
    let primaryColLen = primaryMap[0].length

    overlayCoords.forEach(row => {
        let overlyX = row[0]
        let overlyY = row[1]

        let currentOverlyX = overlyX
        let currentOverlyY = overlyY

        secondaryMap.forEach(row => {
            row.forEach(val => {
                if (val === 1) {
                    if (primaryRowLen > currentOverlyX && primaryColLen > currentOverlyY) {

                        let oldValue = primaryMap[currentOverlyX][currentOverlyY]
                        let newValue = oldValue === val ? 0 : val
                        primaryMap[currentOverlyX][currentOverlyY] = newValue
                    }
                }
                currentOverlyY += 1
            })
            currentOverlyX += 1
            currentOverlyY = overlyY
        })
    })

    let currentX = startCoord[0]
    let currentY = startCoord[1]
    let currentPos = [currentX, currentY]
    let prevDirection;
    let stepsAmount = 1

    while (true) {
        if (primaryMap[currentX + 1] !== undefined && primaryMap[currentX + 1][currentY] === 0 && prevDirection !== 'Top') {

            currentPos = [currentX + 1, currentY]
            prevDirection = 'Bottom'
            currentX += 1;
        }
        else if (primaryMap[currentX - 1] !== undefined && primaryMap[currentX - 1][currentY] === 0 && prevDirection !== 'Bottom') {

            currentPos = [currentX - 1, currentY]
            prevDirection = 'Top'
            currentX -= 1;
        }
        else if (primaryMap[currentX] !== undefined && primaryMap[currentX][currentY + 1] === 0 && prevDirection !== 'Left') {

            currentPos = [currentX, currentY + 1]
            prevDirection = 'Right'
            currentY += 1;
        }
        else if (primaryMap[currentX] !== undefined && primaryMap[currentX][currentY - 1] === 0 && prevDirection !== 'Right') {
            
            currentPos = [currentX, currentY - 1]
            prevDirection = 'Left'
            currentY -= 1;
        }
        else {
            break
        }
        stepsAmount += 1
    }


    let result;
    if (currentX === primaryRowLen - 1 ||
        currentY === primaryColLen - 1 ||
        currentX === 0 ||
        currentY === 0) {

        result = prevDirection
    }
    else {

        result = "Dead end"
        if (currentX + 1 <= primaryRowLen / 2) {

            if (currentY + 1 > primaryColLen / 2)
                result += ' 1'
            else
                result += ' 2'
        }

        if (currentX + 1 > primaryRowLen / 2) {

            if (currentY + 1 > primaryColLen / 2)
                result += ' 4'
            else
                result += ' 3'
        }
    }

    console.log(stepsAmount)
    console.log(result)
}
