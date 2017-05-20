/*
 contains functions and event listeners for removing items from the database
 */
var removed = []
//event listener for fridge "i ate it" button
$(document).on("click", "#fridge .list-item-back .ate-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    prepRemoveFridgeItem(itemContainer)
    $("#confirm-popup").popup("open")

});
//event listener for fridge "i threw it away" button
$(document).on("click", "#fridge .list-item-back .expired-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    prepRemoveFridgeItem(itemContainer)
    $("#garbage-popup").popup("open")

});

//event listener for item popup "i ate it" button
$(document).on("click", "#item-popup .ate-button", function () {
    prepRemoveFridgeItem(currentPopupItemContainer);
    $("#item-popup").popup("close")
});
//event listener for item popup "i threw it away" button
$(document).on("click", "#item-popup .expired-button", function () {
    prepRemoveFridgeItem(currentPopupItemContainer);
    $("#item-popup").popup("close")
    setTimeout(function () {
        $("#garbage-popup").popup("open")

    }, 200)

});

//event listener for list "i ate it" button
$(document).on("click", "#list .list-item-back .ate-button", function () {
    var itemContainer = $(this).parent().parent().parent();
    removeListItem(itemContainer)
});
//event listener for list "i threw it away" button
$(document).on("click", "#list .list-item-back .expired-button", function () {
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
function prepRemoveFridgeItem(itemContainer) {
    removed.itemContainer = itemContainer;
    var itemBack = itemContainer.children(".list-item-back");
    removed.itemBack = itemBack
    var item = itemContainer.children(".list-item");
    var itemKey = item.attr("data-key");
    removed.key = itemKey
    var name = item.children(".item-name").text();
    return firebase.database().ref('/users/' + uid + "/fridge/").once('child_added').then(function (snapshot) {
        var fridgeId = snapshot.key;
        removed.fridgeKey = fridgeId
        return firebase.database().ref('/fridge/' + fridgeId + "/" + itemKey).once('value').then(function (snapshot) {
            removed.category = snapshot.val().category;
            removed.name = snapshot.val().name;

            removed.date = Date.now()
            removed.units = snapshot.val().units
            if(snapshot.val().quantity === null || snapshot.val().quantity === undefined){
                removed.quantity = "no-data"
            }else{
                removed.quantity = snapshot.val().quantity;

            }
            if(snapshot.val().price === null || snapshot.val().price === undefined){
                removed.price = "no-data"
            }else{
                removed.price = snapshot.val().price;

            }



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

function addToHistory() {
    var percent = parseInt($("#amount-slider").val())
    firebase.database().ref('history/' + uid + "/" + removed.key).set({
        name: removed.name,
        category: removed.category,
        date: removed.date,
        quantity: removed.quantity,
        price: removed.price,
        units: removed.units,
        percent: percent
    }).then(function(){
        firebase.database().ref('/fridge/' + removed.fridgeKey + "/" + removed.key).remove().then(function () {
            removed.itemBack.animate({
                left: "-=100%"
            }, function () {
                removed.itemContainer.remove();
                setCollapsibleNumbers()
            })
        })
    })
}
function addToHistoryEaten() {
    firebase.database().ref('history/' + uid + "/" + removed.key).set({
        name: removed.name,
        category: removed.category,
        date: removed.date,
        quantity: removed.quantity,
        price: removed.price,
        units: removed.units,
        percent:0
    }).then(function(){
        firebase.database().ref('/fridge/' + removed.fridgeKey + "/" + removed.key).remove().then(function () {
            removed.itemBack.animate({
                left: "-=100%"
            }, function () {
                removed.itemContainer.remove();
                setCollapsibleNumbers()
            })
        })
    })

}
$(document).on("click", "#confirm-amount", function () {
    addToHistory();
    $("#garbage-popup").popup("close")
    $("#slider-form").trigger("reset")


});
$(document).on("click", "#cancel-amount", function () {
    $("#garbage-popup").popup("close")
    $("#slider-form").trigger("reset")
    resetSlidePositions()
});

$(document).on("change", "#amount-slider", function () {
    $("#confirm-amount").prop("disabled", false);

})

$(document).on("popupbeforeposition", "#garbage-popup", function () {
    $("#confirm-amount").prop("disabled", true);

})

$(document).on("click", "#confirm-button", function () {
    addToHistoryEaten();
    $("#confirm-popup").popup("close")


});
$(document).on("click", "#cancel-button", function () {
    $("#confirm-popup").popup("close")
    resetSlidePositions()
});
