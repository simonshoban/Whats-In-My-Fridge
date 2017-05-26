//Closes popup when the cancel button is clicked
$(document).on("click", "#custom-cancel-button", function () {
    $("#custom-database").popup("close")
    $("#custom-database-popup form").trigger("reset");

});

//Adds custom item to database when the confirm button is clicked
$(document).on("click", "#custom-confirm-button", function () {
    if(addCustomItemValidate()){
        addCustomItem();
        $("#custom-database-popup form").trigger("reset");
    }
});

//Closes popup after confirm button is clicked
$(document).on("click", "#added-confirm-button", function () {
    $("#added-item").popup("close")
});

//Adds custom item to database
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
            getAvailiableTags()
            $("#custom-database").popup("close")
            setTimeout(function(){
                $("#added-item").popup("open")
            }, 500)
        })
    })
}

//Deletes custom item from database
function deleteCustomItem(key){
    firebase.database().ref('customAutoFill/' + uid + "/" + key).remove()
    firebase.database().ref('customAutoComplete/' + uid + "/" + key).remove()
}