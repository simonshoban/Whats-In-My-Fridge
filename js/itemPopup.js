/*
contains functions and event listeners for the item popups
 */

//variable to store the item currently open in the item panel
var currentPopupItemContainer;

//event listener to fill the fridge item panel with item info when opened
$(document).on("click", "#fridge .list-item", function () {
    var item = $(this);
    currentPopupItemContainer = item.parent();
    return firebase.database().ref('/users/' + uid + "/fridge/").once('child_added').then(function (snapshot) {
        var fridgeId = snapshot.key;
        return firebase.database().ref('/fridge/' + fridgeId + "/" + item.attr("data-key")).once('value').then(function (snapshot) {
            var name = snapshot.val().name;
            var date = snapshot.val().date;
            var expire = snapshot.val().expire;
            var quantity = snapshot.val().quantity;
            var units = snapshot.val().units;
            var price = snapshot.val().price;
            $("#item-popup-name-fridge").val(name);
            $("#item-popup .item-popup-expires").html("Purchased: " + new Date(date).toDateString());
            $("#item-popup-expire-fridge").val(new Date(expire).toISOString().substr(0, 10));
            if (snapshot.hasChild("quantity")) {
                $("#item-popup-quantity-fridge").val(quantity);
                $("#quantity-options-item-fridge").val(units).selectmenu("refresh")

            }
            if (snapshot.hasChild("price")) {
                $("#item-popup-price-fridge").val(price)
            }
            $("#storage").html("");
            $("#expired").html("");
            return firebase.database().ref('/info/' + name).once('value').then(function (snapshot) {
                if (snapshot.val() != null) {
                    fillExpiredInfo(name);
                    fillStorageInfo(name);
                    $("#item-popup").popup("open")

                } else {
                    $("#item-popup").popup("open")

                }
            })

        })
    })
});
//event listener to fill the list item panel with item info when opened
$(document).on("click", "#list .list-item", function () {
    var item = $(this);
    currentPopupItemContainer = item.parent();
    return firebase.database().ref('/users/' + uid + "/list/").once('child_added').then(function (snapshot) {
        var listId = snapshot.key;
        return firebase.database().ref('/list/' + listId + "/" + item.attr("data-key")).once('value').then(function (snapshot) {
            var name = snapshot.val().name;
            var date = snapshot.val().date;
            var quantity = snapshot.val().quantity;
            var units = snapshot.val().units;
            var price = snapshot.val().price;
            $("#item-popup-name-list").val(name);
            $("#item-popup .item-popup-expires-list").html("Purchased: " + new Date(date).toDateString())
            if (snapshot.hasChild("quantity")) {
                $("#item-popup-quantity-list").val(quantity);
                $("#quantity-options-item-list").val(units).selectmenu("refresh")

            }
            if (snapshot.hasChild("price")) {
                $("#item-popup-price-list").val(price)
            }
            $("#storage").html("");
            $("#expired").html("");
            return firebase.database().ref('/info/' + name).once('value').then(function (snapshot) {
                if (snapshot.val() != null) {
                    fillExpiredInfoList(name);
                    fillStorageInfoList(name);
                }
            })

        })
    })
});


//fills the expired info tab fridge page
function fillExpiredInfo(name) {
    return firebase.database().ref('/info/' + name + '/expire/').orderByValue().once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            getExpiredInfo(snapshot.key)
        })
    })

}
//fills the storage info tab fridge page
function fillStorageInfo(name) {
    return firebase.database().ref('/info/' + name + '/storage/').orderByValue().once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            getStorageInfo(snapshot.key)
        })
    })

}
//fills the expired info tab list page
function fillExpiredInfoList(name) {
    return firebase.database().ref('/info/' + name + '/expire/').orderByValue().once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            getExpiredInfoList(snapshot.key)
        })
    })

}
//fills the storage info tab list page
function fillStorageInfoList(name) {
    return firebase.database().ref('/info/' + name + '/storage/').orderByValue().once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            getStorageInfoList(snapshot.key)
        })
    })

}

//gets the info for the expired info tab fridge page
function getExpiredInfo(expireKey) {
    return firebase.database().ref('/expireInfo/' + expireKey).orderByValue().once('value').then(function (snapshot) {
        $("#expired").html($("#expired").html() + "<p>" + snapshot.val() + "</p>")
    })
}
//gets the info for the storage tab fridge page
function getStorageInfo(storageKey) {
    return firebase.database().ref('/storageInfo/' + storageKey).orderByValue().once('value').then(function (snapshot) {
        $("#storage").html($("#storage").html() + "<p>" + snapshot.val() + "</p>")
    })
}
//gets the info for the expired info tab list page
function getExpiredInfoList(expireKey) {
    return firebase.database().ref('/expireInfo/' + expireKey).orderByValue().once('value').then(function (snapshot) {
        $("#expired2").html($("#expired2").html() + "<p>" + snapshot.val() + "</p>")
    })
}
//gets the info for the storage tab list page
function getStorageInfoList(storageKey) {
    return firebase.database().ref('/storageInfo/' + storageKey).orderByValue().once('value').then(function (snapshot) {
        $("#storage2").html($("#storage2").html() + "<p>" + snapshot.val() + "</p>")
    })
}

//resets the fridge fields when the popup closes
$("#item-popup").on("popupafterclose", function (event, ui) {
    $("#item-popup-form").trigger("reset")
});
//resets the list fields when the popup closes
$("#item-popup2").on("popupafterclose", function (event, ui) {
    $("#item-popup2-form").trigger("reset")
});