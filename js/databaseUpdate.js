/*
contains functions and event listeners for updating items in the database
 */

//event listener for the fridge save changes button. gets data from fields and gives to updateFridgeItem
$(document).on("click", "#item-popup .save-button", function () {
    var key = currentPopupItemContainer.children(".list-item").attr("data-key");
    var name = $("#item-popup-name-fridge").val();
    var expire = $("#item-popup-expire-fridge").datepicker("getDate").getTime();
    var quantity = $("#item-popup-quantity-fridge").val();
    var price = $("#item-popup-price-fridge").val();
    var units = $("#quantity-options-item-fridge").val();
    updateFridgeItem(key, name, expire, quantity, units, price);
    $("#item-popup").popup("close");
    redrawList()
});
//updates a fridge item with new information
function updateFridgeItem(itemKey, name, expire, quantity, units, price) {
    return firebase.database().ref('/users/' + uid + "/fridge/").once('child_added').then(function (snapshot) {
        var fridgeId = snapshot.key;
        firebase.database().ref('fridge/' + fridgeId + "/" + itemKey).update({
            name: name,
            expire: expire,
            quantity: quantity,
            price: price,
            units: units
        });
    });
}
//event listener for the list save changes button. gets data from fields and gives to updateListItem
$(document).on("click", "#item-popup2 .save-button", function () {
    var key = currentPopupItemContainer.children(".list-item").attr("data-key");
    var name = $("#item-popup-name-list").val();
    var quantity = $("#item-popup-quantity-list").val();
    var price = $("#item-popup-price-list").val();
    var units = $("#quantity-options-item-list").val();
    updateListItem(key, name, quantity, units, price);
    $("#item-popup2").popup("close");
    redrawShoppingList()
})
//updates a list item with new information
function updateListItem(itemKey, name, quantity, units, price) {
    return firebase.database().ref('/users/' + uid + "/list/").once('child_added').then(function (snapshot) {
        var listId = snapshot.key;
        firebase.database().ref('list/' + listId + "/" + itemKey).update({
            name: name,
            quantity: quantity,
            price: price,
            units: units
        });
    });
}
