/*
initializes jquery ui components
 */

//initializes fridge item popup datepicker
$("#expiry-date").datepicker({
    firstDay: 1,
    minDate: 0,
    dateFormat: "yy-mm-dd"

});
//initializes fridge add item date picker
$("#item-popup-expire-fridge").datepicker({
    firstDay: 1,
    minDate: 0,
    dateFormat: "yy-mm-dd"

});
//stores availiable tags for autocomplete
var availableTags = [];
getAvailiableTags();
//gets the availiable tags for autofill from the database
function getAvailiableTags() {
    return firebase.database().ref('/autocomplete').once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            availableTags[availableTags.length] = snapshot.key
        })
    })
}

//initializes fridge add item autocomplete
$(function () {
    $("#food-name").autocomplete({
        source: availableTags
    })
});
//initializes list add item autocomplete
$(function () {
    $("#food-name-list").autocomplete({
        source: availableTags
    })
});