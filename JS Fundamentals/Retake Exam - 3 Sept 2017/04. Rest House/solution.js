function solve(inputRooms, guests) {
    const roomDouble = "double-bedded"
    const roomTriple = "triple"

    let rooms = []
    inputRooms.forEach(room => {
        rooms.push({
            number: room.number,
            type: room.type,
            guests: [],
            emptyBeds: room.type === roomDouble ? 2 : 3
        })
    });

    for (pair of guests) {
        let guest1 = pair.first
        let guest2 = pair.second

        let isGuest1Accommodate = false;
        let isGuest2Accommodate = false;

        for (room of rooms) {
            if (isGuest1Accommodate && isGuest2Accommodate) {
                break
            }

            if ((!isGuest1Accommodate && !isGuest2Accommodate) && room.emptyBeds > 1) {
                if (room.type === roomDouble && guest1.gender !== guest2.gender ||
                    (room.type === roomTriple && guest1.gender === guest2.gender &&
                        (room.guests[0] === undefined || room.guests[0].gender === guest1.gender))) {
                    room.guests.push(guest1, guest2)
                    room.emptyBeds -= 2
                    isGuest1Accommodate = true
                    isGuest2Accommodate = true
                }
            }
            else if (guest1.gender === guest2.gender && room.type === roomTriple && room.emptyBeds > 0 && (room.guests[0] === undefined || room.guests[0].gender === guest1.gender)) {
                if (!isGuest1Accommodate) {
                    room.guests.push(guest1)
                    isGuest1Accommodate = true
                    room.emptyBeds -= 1
                }
                else if (!isGuest2Accommodate) {
                    room.guests.push(guest2)
                    isGuest2Accommodate = true
                    room.emptyBeds -= 1
                }
            }
        }
    }

    let remainGuests = guests.length * 2
    rooms.forEach(r => remainGuests -= r.guests.length)

    rooms.sort((r1, r2) => r1.number.localeCompare(r2.number))
        .forEach(room => {
            console.log("Room number: " + room.number)

            room.guests.sort((g1, g2) => g1.name.toLowerCase().localeCompare(g2.name.toLowerCase()))
                .forEach(guest => {
                    console.log("--Guest Name: " + guest.name)
                    console.log("--Guest Age: " + guest.age)
                })

            console.log("Empty beds in the room: " + room.emptyBeds)
        })
    console.log("Guests moved to the tea house: " + remainGuests)
}