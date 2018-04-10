
function getInfo() {

    let id = $("#stopId");
    let url = `https://judgetests.firebaseio.com/businfo/${id.val()}.json`;

    let stopName = $("#stopName")
    let listBuses = $("#buses");
    
    listBuses.empty();

    $.get(url)
        .then(function (res) {
            let busName = res.name;
            let buses = res.buses;

            stopName.text(res.name);

            for (let busId in buses) {
                let timeArrive = buses[busId];
                let li = $("<li>").text(`Bus ${busId} arrives in ${timeArrive} minutes`);

                listBuses.append(li);
            }
        })
        .fail(function () {
            stopName.text("Error");
        });
}

