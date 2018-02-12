function solve(flights) {
    let landedPlanes = []
    let towns = {}

    flights.forEach(flight => {
        [planeID, town, passengersCount, action] = flight.split(" ")

        if (!(town in towns)) {
            towns[town] = { arrivals: 0, departures: 0, ids: new Set() }
        }
        let townStat = towns[town]

        if (action === "land" && !isPlaneAlreadyLanded(planeID)) {
            landedPlanes.push(planeID)
            townStat.arrivals += Number(passengersCount)
            townStat.ids.add(planeID)
        }
        else if (action === "depart" && isPlaneAlreadyLanded(planeID)) {
            landedPlanes.splice(landedPlanes.indexOf(planeID), 1)
            townStat.departures += Number(passengersCount)
            townStat.ids.add(planeID)
        }

    })

    console.log("Planes left:")
    let myTown = landedPlanes.sort((id1, id2) => id1.localeCompare(id2))
    myTown.forEach(id => console.log("- " + id))

    let sortableTowns = []
    for (town in towns) {
        sortableTowns.push({ "name": town, "planeInfo": towns[town] })
    }
    sortableTowns = sortableTowns.filter(t => t.planeInfo.ids.size !== 0).sort(sortTowns)

    for (town of sortableTowns) {
        console.log(town.name)

        let arrivals = town.planeInfo.arrivals
        console.log("Arrivals: " + arrivals)

        let departures = town.planeInfo.departures
        console.log("Departures: " + departures)

        console.log("Planes:")
        let planes = Array
            .from(town.planeInfo.ids)
            .sort((id1, id2) => id1.localeCompare(id2))
            .forEach(id => console.log("-- " + id))
    }

    function sortTowns(town1, town2) {
        if (town1.planeInfo.arrivals > town2.planeInfo.arrivals) {
            return -1
        }
        else if (town1.planeInfo.arrivals < town2.planeInfo.arrivals) {
            return 1
        }
        else {
            return town1.name.localeCompare(town2.name)
        }
    }

    function isPlaneAlreadyLanded(planeID) {
        return landedPlanes.some(id => id === planeID)
    }
}
