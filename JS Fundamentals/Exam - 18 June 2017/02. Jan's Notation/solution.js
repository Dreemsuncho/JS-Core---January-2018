function solve(arr) {

    let savedNumbers = []

    arr.forEach(element => {
        if (isNaN(element)) {

            let num2 = savedNumbers.pop()
            let num1 = savedNumbers.pop()

            if (num1 === undefined || num2 === undefined) {
                console.log("Error: not enough operands!")
            }
            else {
                switch (element) {
                    case "+":
                        savedNumbers.push(num1 + num2)
                        break
                    case "-":
                        savedNumbers.push(num1 - num2)
                        break
                    case "*":
                        savedNumbers.push(num1 * num2)
                        break
                    case "/":
                        savedNumbers.push(num1 / num2)
                        break
                }
            }
        }
        else {
            savedNumbers.push(element)
        }
    });

    if (savedNumbers.length > 1) {
        console.log("Error: too many operands!")
    }
    else if (savedNumbers.length > 0) {
        console.log(savedNumbers[0])
    }
}
