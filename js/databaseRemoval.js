/*
contains functions and event listeners for removing items from the database
 */

//event listener for fridge "i ate it" button
$(document).on("click", "#fridge .ate-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    removeItem(itemContainer)
});
//event listener for fridge "i threw it away" button
$(document).on("click", "#fridge .expired-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    removeItem(itemContainer)
});

//event listener for item popup "i ate it" button
$(document).on("click", "#item-popup .ate-button", function () {
    removeItem(currentPopupItemContainer);
    $("#item-popup").popup("close")
});
//event listener for item popup "i threw it away" button
$(document).on("click", "#item-popup .expired-button", function () {
    removeItem(currentPopupItemContainer);
    $("#item-popup").popup("close")
});

//event listener for list "i ate it" button
$(document).on("click", "#list .ate-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    removeListItem(itemContainer)
});
//event listener for list "i threw it away" button
$(document).on("click", "#list .expired-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    removeListItem(itemContainer)
});

//event listener for item popup 2 "i ate it" button
$(document).on("click", "#item-popup2 .ate-button", function () {
    removeListItem(currentPopupItemContainer);
    $("#item-popup2").popup("close")
});
//event listener for item popup 2 "i threw it away" button
$(document).on("click", "#item-popup2 .expired-button", function () {
    removeListItem(currentPopupItemContainer);
    $("#item-popup2").popup("close")
});

//removes the given fridge item from the database
function removeItem(itemContainer) {
    var itemBack = itemContainer.children(".list-item-back");
    var item = itemContainer.children(".list-item");
    var itemKey = item.attr("data-key");
    var name = item.children(".item-name").text();
    return firebase.database().ref('/users/' + uid + "/fridge/").once('child_added').then(function (snapshot) {
        var fridgeId = snapshot.key;
        firebase.database().ref('/fridge/' + fridgeId + "/" + itemKey).remove().then(function () {
            itemBack.animate({
                left: "-=100%"
            }, function () {
                itemContainer.remove();
                setCollapsibleNumbers()
            })
        })
    })
}
//removes the given list item from the database
function removeListItem(itemContainer) {
    var itemBack = itemContainer.children(".list-item-back");
    var item = itemContainer.children(".list-item");
    var itemKey = item.attr("data-key");
    var name = item.children(".item-name").text();
    return firebase.database().ref('/users/' + uid + "/list/").once('child_added').then(function (snapshot) {
        var listId = snapshot.key;
        firebase.database().ref('/list/' + listId + "/" + itemKey).remove().then(function () {
            itemBack.animate({
                left: "-=100%"
            }, function () {
                itemContainer.remove();
                setCollapsibleNumbers()
            });
            //checks if the shopping list is empty and shows text if it is
            setTimeout(function () {
                return firebase.database().ref('/list/' + listId).orderByChild("expire").once('value').then(function (snapshot) {
                    if (snapshot.numChildren() === 0) {
                        ($(".shopping-empty").show())
                    }
                })
            }, 500)
        })
    })
}