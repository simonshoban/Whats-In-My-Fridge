/*
 contains functions and event listeners for the item popups
 */

//variable to store the item currently open in the item panel
var currentPopupItemContainer;
var currentStorageInfo;
var currentExpireInfo;
var currentStorageInfoTwitter;
var currentExpireInfoTwitter;
var currentProperName;
var noInfo = "We don't have any info for this item. Sorry.\nHave tips you would like to see here? <a href='http://apple.ca'>Contact us.</a>"

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
                getProperName(name)
                setTimeout(function(){
                    currentExpireInfoTwitter = "How to tell if " + currentProperName + " has expired:"
                    fillExpiredInfo(name);
                    fillStorageInfo(name);
                    $("#item-popup").popup("open")
                }, 100)


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
                getProperName(name)
                setTimeout(function() {
                    currentExpireInfoTwitter = "How to tell if " + currentProperName + " have expired:"
                    fillExpiredInfoList(name);
                    fillStorageInfoList(name);
                }, 100)

            })

        })
    })
});


//fills the expired info tab fridge page
function fillExpiredInfo(name) {
    currentExpireInfo = ""
    return firebase.database().ref('/info/' + name + '/expire/').orderByValue().once('value').then(function (snapshot) {
        if(snapshot.exists()){
            $("#expired").html("")
            snapshot.forEach(function (snapshot) {
                getExpiredInfo(snapshot.key)
            })
            setTimeout(function () {
                $("#expired").append(currentExpireInfo)

                $("#expired").append('<span class="twitter-container">Share these tips on twitter! <a href=https://twitter.com/intent/tweet?text='+encodeURIComponent(currentExpireInfoTwitter +  "\nwhatsinmyfridge.ca")+' data-url=" " data-size="large" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></span>')

            }, 500)
        } else{
            $("#expired").html(noInfo)
        }
    })
}
//fills the storage info tab fridge page
function fillStorageInfo(name) {
    currentStorageInfo = ""
    setTimeout(function(){
        currentStorageInfoTwitter = "Storage tips for " + currentProperName +":"
    }, 100)
    return firebase.database().ref('/info/' + name + '/storage/').orderByValue().once('value').then(function (snapshot) {
        if(snapshot.exists()){
                $("#storage").html("")
            snapshot.forEach(function (snapshot) {
                getStorageInfo(snapshot.key)
            })
            setTimeout(function () {
                $("#storage").append(currentStorageInfo)

                $("#storage").append('<span class="twitter-container">Share these tips on twitter! <a href=https://twitter.com/intent/tweet?text='+encodeURIComponent(currentStorageInfoTwitter + "\nwhatsinmyfridge.ca")+' data-url=" " data-size="large" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></span>')

            }, 500)
        } else{
            $("#storage").html(noInfo)
        }
    })
}
function getProperName(name) {
    return firebase.database().ref('/info/' + name + '/properName/').once('value').then(function (snapshot) {
        currentProperName = snapshot.val()

    })
}
//fills the expired info tab list page

function fillExpiredInfoList(name) {
    currentExpireInfo = ""
    return firebase.database().ref('/info/' + name + '/expire/').orderByValue().once('value').then(function (snapshot) {
        if(snapshot.exists()){
            $("#expired2").html("")
            snapshot.forEach(function (snapshot) {
                getExpiredInfoList(snapshot.key)
            })
            setTimeout(function () {
                $("#expired2").append(currentExpireInfo)

                $("#expired2").append('<span class="twitter-container">Share these tips on twitter! <a href=https://twitter.com/intent/tweet?text='+encodeURIComponent(currentExpireInfoTwitter + "\nwhatsinmyfridge.ca")+' data-url=" " data-size="large" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></span>')

            }, 500)
        } else{
            $("#expired2").html(noInfo)
        }
    })
}
//fills the storage info tab list page
function fillStorageInfoList(name) {
    currentStorageInfo = ""
    setTimeout(function(){
        currentStorageInfoTwitter = "Storage tips for " + currentProperName +":"
    }, 100)
    return firebase.database().ref('/info/' + name + '/storage/').orderByValue().once('value').then(function (snapshot) {
        if(snapshot.exists()){
            $("#storage2").html("")
            snapshot.forEach(function (snapshot) {
                getStorageInfoList(snapshot.key)
            })
            setTimeout(function () {
                $("#storage2").append(currentStorageInfo)

                $("#storage2").append('<span class="twitter-container">Share these tips on twitter! <a href=https://twitter.com/intent/tweet?text='+encodeURIComponent(currentStorageInfoTwitter + "\nwhatsinmyfridge.ca")+' data-url=" " data-size="large" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></span>')

            }, 500)
        } else{
            $("#storage2").html(noInfo)
        }
    })
}
//gets the info for the expired info tab fridge page
function getExpiredInfo(expireKey) {
    return firebase.database().ref('/expireInfo/' + expireKey).orderByValue().once('value').then(function (snapshot) {
        currentExpireInfo += "<p>" + snapshot.val() + "</p>"
        if(currentExpireInfoTwitter.length + snapshot.val().length + 1 < 113){
            currentExpireInfoTwitter += "\n" + snapshot.val()
        }

    })
}
//gets the info for the storage tab fridge page
function getStorageInfo(storageKey) {
    return firebase.database().ref('/storageInfo/' + storageKey).orderByValue().once('value').then(function (snapshot) {
        currentStorageInfo += "<p>" + snapshot.val() + "</p>"
        if(currentStorageInfoTwitter.length + snapshot.val().length + 1 < 113){
            currentStorageInfoTwitter += "\n"+ snapshot.val()
        }

    })
}
//gets the info for the expired info tab list page
function getExpiredInfoList(expireKey) {
    return firebase.database().ref('/expireInfo/' + expireKey).orderByValue().once('value').then(function (snapshot) {
        currentExpireInfo += "<p>" + snapshot.val() + "</p>"
        if(currentExpireInfoTwitter.length + snapshot.val().length + 1 < 113){
            currentExpireInfoTwitter +="\n"+ snapshot.val()
        }

    })
}
//gets the info for the storage tab list page
function getStorageInfoList(storageKey) {
    return firebase.database().ref('/storageInfo/' + storageKey).orderByValue().once('value').then(function (snapshot) {
        currentStorageInfo += "<p>" + snapshot.val() + "</p>"
        if(currentStorageInfoTwitter.length + snapshot.val().length + 1 < 113){
            currentStorageInfoTwitter += "\n" + snapshot.val()
        }

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