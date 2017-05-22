/*
 contains functions and event listeners for the autofill feature
 */

//fills the category and expire fields of the list add item page based on whats in the name field
function autoFillFridgeAdd() {
    var name = $("#food-name").val().toLowerCase()

    return firebase.database().ref('/customAutoFill/' + uid + "/" + name).once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            if (snapshot.hasChild("foodGroup")) {
                var expireDay = snapshot.val().expire + Date.now();
                $("#food-group").val(snapshot.val().foodGroup).selectmenu("refresh");
                $("#expiry-date").val(new Date(expireDay).toISOString().substr(0, 10));

            }
            return true;
        }
        return firebase.database().ref('/autofill/' + name).once('value').then(function (snapshot) {
            if (snapshot.hasChild("foodGroup")) {
                var expireDay = snapshot.val().expire + Date.now();
                $("#food-group").val(snapshot.val().foodGroup).selectmenu("refresh");
                $("#expiry-date").val(new Date(expireDay).toISOString().substr(0, 10));

            }
        })


    })


}

//fills the category and expire fields of the list add item page based on whats in the name field
function autoFillListAdd() {
    var name = $("#food-name-list").val().toLowerCase()
    return firebase.database().ref('/customAutoFill/' + uid + "/" + name).once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            if (snapshot.hasChild("foodGroup")) {
                var expireDay = snapshot.val().expire + Date.now();
                $("#food-group-list").val(snapshot.val().foodGroup).selectmenu("refresh");
            }
            return true;
        }
        return firebase.database().ref('/autofill/' + $("#food-name-list").val().toLowerCase()).once('value').then(function (snapshot) {
            if (snapshot.hasChild("foodGroup")) {
                var expireDay = snapshot.val().expire + Date.now();
                $("#food-group-list").val(snapshot.val().foodGroup).selectmenu("refresh");

            }
        })


    })


}
//calls autofill when focus is no longer on fridge add item name field
$("#food-name").on("focusout", function () {
    autoFillFridgeAdd()
});
//calls autofill when the autocomplete menu closes on fridge page
$("#food-name").on("autocompleteclose", function () {
    autoFillFridgeAdd()
});

//calls autofill when focus is no longer on list add item name field
$("#food-name-list").on("focusout", function () {
    autoFillListAdd()
});
//calls autofill when the autocomplete menu closes on list page
$("#food-name-list").on("autocompleteclose", function () {
    autoFillListAdd()
});