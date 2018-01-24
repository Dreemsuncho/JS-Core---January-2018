function hungryProgrammer(meals, commands) {

    // helper function
    let utilFuncs = { isNumbersValid: (num1, num2) => !(isNaN(num1) || isNaN(num1)) }
    let mealsEaten = 0

    for (let i = 0; i < commands.length; i++) {
        let commandArgs = commands[i].split(" ")
        let cmd = commandArgs[0]

        if (cmd === "End") {
            break;
        }

        switch (cmd) {
            case "Serve":
                if (meals.length > 0) {
                    serve(meals)
                }
                break;

            case "Eat":
                if (meals.length > 0) {
                    eat(meals)
                    mealsEaten += 1
                }
                break;

            case "Add":
                let mealToAdd = commandArgs[1];
                add(meals, mealToAdd)
                break;

            case "Consume":
                if (commandArgs.length === 3) {
                    let startIndex = Number(commandArgs[1])
                    let endIndex = Number(commandArgs[2])

                    let result = consume(meals, startIndex, endIndex)
                    mealsEaten += result
                }
                break;

            case "Shift":
                if (commandArgs.length === 3) {
                    let index1 = Number(commandArgs[1])
                    let index2 = Number(commandArgs[2])
                    shift(meals, index1, index2)
                }
                break;
        }
    }
    printOutput();

    function serve(meals) {
        if (meals.length > 0) {
            let meal = meals.pop()
            console.log(`${meal} served!`)
        }
    }

    function eat(meals) {
        if (meals.length > 0) {
            let meal = meals.shift()
            console.log(`${meal} eaten`)
        }
    }

    function add(meals, mealToAdd) {
        if (mealToAdd !== undefined) {
            meals.unshift(mealToAdd)
        }
    }

    function consume(meals, startIndex, endIndex) {
        let eatenCount = 0

        let isIndexesValid = utilFuncs.isNumbersValid(startIndex, endIndex) && meals[startIndex + 1] !== undefined
        if (isIndexesValid) {
            eatenCount = endIndex - startIndex + 1
            meals.splice(startIndex, eatenCount)
            console.log("Burp!")
        }
        return eatenCount
    }

    function shift(meals, index1, index2) {
        let isIndexesValid = utilFuncs.isNumbersValid(index1, index1)

        if (isIndexesValid &&
            meals[index1] !== undefined &&
            meals[index2] !== undefined) {

            let old = meals[index1]
            meals[index1] = meals[index2]
            meals[index2] = old
        }
    }

    function printOutput() {
        let result = "";
        if (meals.length > 0) {
            result = `Meals left: ${meals.join(", ")}`;
        }
        else {
            result = "The food is gone";
        }
        console.log(result);
        console.log(`Meals eaten: ${mealsEaten}`);
    }
}