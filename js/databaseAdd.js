/*
containes functions and event listeners to add items to the database
 */

var almostMsPerDay = 86399999
//event listener for the fridge add item button
$("#add-button-fridge").click(function () {
    if (addItemValidate()) {
        readFridgeInput();
        redrawList();
    }
});

//event listener for the list add item page
$("#add-button-list").click(function () {
    if (addListValidate()) {
        readListInput();
        redrawShoppingList();
    }
});

//reads the fridge add item page fields and sends the data to addFridgeItem
function readFridgeInput(){
    var uid = firebase.auth().currentUser.uid;
    var name = $("#food-name").val().toLowerCase()
    var type = $("#food-group").val().substr(0, 1).toLowerCase();
    var expires = ($("#expiry-date").datepicker("getDate").getTime() + almostMsPerDay)
    var units = $("#quantity-options-add-fridge").val()
    var quantity = null
    var price = null
    if (units === "--") {
        units = ""
    }
    if (!isNaN(parseInt($("#item-quantity").val()))) {
        quantity = parseInt($("#item-quantity").val())
    }
    if (!isNaN(parseFloat($("#item-price").val()))) {
        price = parseFloat($("#item-price").val())

    }
    $("#fridge-add-form").trigger("reset");
    incrementItem(name)
    addFridgeItem(uid, name, expires, type, quantity, units, price)

}

//reads the list add item page fields and sends the data to addListItem
function readListInput(){
    var uid = firebase.auth().currentUser.uid;
    var name = $("#food-name-list").val().toLowerCase()
    var type = $("#food-group-list").val().substr(0, 1).toLowerCase();
    var units = $("#quantity-options-add-list").val()
    var quantity = null
    var price = null
    if (!isNaN(parseInt($("#item-quantity-list").val()))) {
        quantity = parseInt($("#item-quantity-list").val())
    }
    if (!isNaN(parseFloat($("#item-price-list").val()))) {
        price = parseFloat($("#item-price-list").val())

    }
    $("#list-add-form").trigger("reset");
    addListItem(uid, name, type, quantity, units, price)
}

//adds the given data to the fridge database
function addFridgeItem(uid, name, expire, category, quantity, units, price) {
    var itemData = {
        name: name,
        expire: expire,
        category: category,
        quantity: quantity,
        units: units,
        price: price,
        date: Date.now()
    };
    return firebase.database().ref('/users/' + uid + "/fridge/").once('child_added').then(function (snapshot) {
        var fridgeId = snapshot.key;
        var newItemKey = firebase.database().ref().child('fridge/' + fridgeId).push().key;
        var updates = {};
        updates['/fridge/' + fridgeId + "/" + newItemKey] = itemData;
        return firebase.database().ref().update(updates);
    });
}
//adds the given data to the shopping list database
function addListItem(uid, name, category, quantity, units, price) {
    var itemData = {
        name: name,
        category: category,
        quantity: quantity,
        units: units,
        price: price,
        date: Date.now()
    };
    return firebase.database().ref('/users/' + uid + "/list/").once('child_added').then(function (snapshot) {
        var listId = snapshot.key;
        var newItemKey = firebase.database().ref().child('list/' + listId).push().key;
        var updates = {};
        updates['/list/' + listId + "/" + newItemKey] = itemData;
        return firebase.database().ref().update(updates);
    });
}

//event listener to reset fridge add item page form when popup closes
$("#custom-item-popup").on("popupafterclose", function (event, ui) {
    $("#fridge-add-form").trigger("reset")
});
//event listener to reset list add item page form when popup closes
$("#custom-item-popup2").on("popupafterclose", function (event, ui) {
    $("#list-add-form").trigger("reset")
});