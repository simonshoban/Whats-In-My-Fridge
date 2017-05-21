$(document).on("click", "#custom-cancel-button", function () {
    $("#custom-database").popup("close")


});
$(document).on("click", "#custom-confirm-button", function () {
    addCustomItem();
});
$(document).on("click", "#added-confirm-button", function () {
    $("#added-item").popup("close")
});
function addCustomItem(){
    var name = $("#custom-food-name").val().toLowerCase()
    var foodGroup = $("#custom-food-group").val()
    var expire = parseInt($("#custom-expiry-date").val())*msPerDay
    var updatedObj = {}
    updatedObj[name] = name;
    firebase.database().ref('/customAutoComplete/' + uid ).update(updatedObj).then(function(){
        firebase.database().ref('/customAutoFill/' + uid + "/" + name).set({
            foodGroup:foodGroup,
            expire:expire
        }).then(function(){
            $("#custom-database").popup("close")
            setTimeout(function(){
                $("#added-item").popup("open")
            }, 300)
        })
    })


}