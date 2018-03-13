

function attachEvents() {
    $("#btnDelete").click(function () {

        let townNameToDelete = $("#townName").val();
        let towns = Array.from($("#towns option"));
        
        let resultText = townNameToDelete;
        
        towns.forEach(town => {
            let townCurrent = $(town)
            let townNameCurrent = townCurrent.val();
            
            if (townNameCurrent === townNameToDelete) {
                townCurrent.remove();
                
                if (resultText === townNameToDelete) {
                    resultText += " deleted.";
                }
            }
        })
        
        if (resultText === townNameToDelete) {
            resultText += " not found.";
        }

        $("#townName").val("")
        $("#result").text(resultText)
    })
}