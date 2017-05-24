/*
functions and event listeners for the frequent and common items
 */

//increments the users frequent item
function incrementItem(name) {
    return firebase.database().ref('/users/' + uid + "/frequentItems/" + name).once('value').then(function (snapshot) {
        var ref = firebase.database().ref('/users/' + uid + "/frequentItems/" + name);
        number = snapshot.val();
        if (number != null) {
            number++;
            ref.set(number)
        } else {
            ref.set(1)
        }
    })

}

//event listener for clicknig an item panel. opens add item popup and autofills it
$(document).on("click", "#add-popup .item-panel", function () {
    var name = $(this).children("p").text().toLowerCase();
    $("#add-popup").popup("close");
    setTimeout(function () {
        $("#custom-item-popup").popup("open")
    }, 100);
    $("#food-name").val(name);
    autoFillFridgeAdd()
});
//event listener for clicknig an item panel. opens add item popup and autofills it
$(document).on("click", "#add-popup2 .item-panel", function () {
    var name = $(this).children("p").text().toLowerCase();
    $("#add-popup2").popup("close");
    setTimeout(function () {
        $("#custom-item-popup2").popup("open")
    }, 100);
    $("#food-name-list").val(name);
    autoFillListAdd()
});

//fills the frequently purchased items page on the fridge
function fillFrequentlyPurchasedItemsFridge() {
    return firebase.database().ref('/users/' + uid + "/frequentItems/").orderByValue().limitToLast(8).once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            createItemPanelFridge(snapshot.key);
        })

    })
}
//fills the frequently purchased items page on the list
function fillFrequentlyPurchasedItemsList() {
    return firebase.database().ref('/users/' + uid + "/frequentItems/").orderByValue().limitToLast(8).once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            createItemPanelList(snapshot.key);
        })

    })
}
//creates the fridge item panels and appends them
function createItemPanelFridge(name) {
    return firebase.database().ref('/autofill/' + name + "/foodGroup").orderByValue().once('value').then(function (snapshot) {
        if (snapshot.val() != null) {
            var category = snapshot.val().substr(0, 1);
            $("#bought-items").prepend('<div class="item-panel"> <img height="50" width="50" src="icons/' + category + '.svg" class="add-icons"> <p>' + name + '</p> </div>')
        } else {
            $("#bought-items").prepend('<div class="item-panel"> <img height="50" width="50" src="icons/o.svg" class="add-icons"> <p>' + name + '</p> </div>')

        }
    })
}
//creates the list item panels and appends them
function createItemPanelList(name) {
    return firebase.database().ref('/autofill/' + name + "/foodGroup").orderByValue().once('value').then(function (snapshot) {
        if (snapshot.val() != null) {
            var category = snapshot.val().substr(0, 1);
            $("#bought-items2").prepend('<div class="item-panel"> <img height="50" width="50" src="icons/' + category + '.svg" class="add-icons"> <p>' + name + '</p> </div>')
        } else {
            $("#bought-items2").prepend('<div class="item-panel"> <img height="50" width="50" src="icons/o.svg" class="add-icons"> <p>' + name + '</p> </div>')

        }
    })
}