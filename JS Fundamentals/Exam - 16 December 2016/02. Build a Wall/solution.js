function solve(arr) {
    arr = arr.map(Number)

    let totalConcrete = 0
    let dailyConcreteUsed = []

    while (true) {

        let isFinished = true
        let currentDailyConcreteUsed = 0

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < 30) {
                arr[i] += 1
                currentDailyConcreteUsed += 195
                isFinished = false
            }
        }

        if (isFinished) {
            break
        }
        else {
            dailyConcreteUsed.push(currentDailyConcreteUsed)
        }
    }

    let totalConcreteUsed = dailyConcreteUsed.reduce((d1, d2) => d1 + d2)
    let totalPesosSpend = totalConcreteUsed * 1900
    console.log(dailyConcreteUsed.join(", "))
    console.log(totalPesosSpend + " pesos")
}
