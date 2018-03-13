

function attachEvents() {
    
    $("#btnAdd").click(function () {
        let inputVal = $("#newItem").val();

        if (inputVal !== "") {
            let option = $("<option>");
            option.text(inputVal);
            $("#towns").append(option)
        }
        $("#newItem").val("")
    });


    $("#btnDelete").click(function () {
        let selectedItem = $("#towns option:selected");
        selectedItem.remove();
    });
}