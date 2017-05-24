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

var options = {
    contenturl: 'https://whatsinmyfridge.ca',
    clientid: '981344901205-o9q6bjjcc533o61ehgmr0o451nsnsdbo.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    prefilltext: '!!!!',
    calltoactionlabel: 'SIGN_UP',
    calltoactionurl: 'http://whatsinmyfridge.ca',
    scope:"https://www.googleapis.com/auth/plus.login"
};

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
                setTimeout(function () {
                    currentExpireInfoTwitter = "How to tell if " + currentProperName + " have expired:"
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
                setTimeout(function () {
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
        if (snapshot.exists()) {
            $("#expired").html("")
            snapshot.forEach(function (snapshot) {
                getExpiredInfo(snapshot.key)
            })
            setTimeout(function () {
                $("#expired").append(currentExpireInfo)
                options.prefilltext = currentExpireInfoTwitter
                $("#expired").append('<span id="expire-gplus" class="gplus g-interactivepost" data-contenturl="https://whatsinmyfridge.ca" data-clientid="981344901205-o9q6bjjcc533o61ehgmr0o451nsnsdbo.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-prefilltext="Engage your users today, create a Google+ page for your business." data-calltoactionlabel="SIGN_UP" data-calltoactionurl="https://whatsinmyfridge.ca">  <span class="icon">&nbsp;</span>  <span class="label">Share on Google+</span>  </span>')
                gapi.interactivepost.render("expire-gplus", options)

            }, 500)
        } else {
            $("#expired").html(noInfo)
        }
    })
}
//fills the storage info tab fridge page
function fillStorageInfo(name) {
    currentStorageInfo = ""
    setTimeout(function () {
        currentStorageInfoTwitter = "Storage tips for " + currentProperName + ":"
    }, 100)
    return firebase.database().ref('/info/' + name + '/storage/').orderByValue().once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            $("#storage").html("")
            snapshot.forEach(function (snapshot) {
                getStorageInfo(snapshot.key)
            })
            setTimeout(function () {
                $("#storage").append(currentStorageInfo)
                options.prefilltext = currentStorageInfoTwitter
                $("#storage").append('<span id="storage-gplus" class="gplus g-interactivepost" data-contenturl="https://whatsinmyfridge.ca" data-clientid="981344901205-o9q6bjjcc533o61ehgmr0o451nsnsdbo.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-prefilltext="Engage your users today, create a Google+ page for your business." data-calltoactionlabel="SIGN_UP" data-calltoactionurl="https://whatsinmyfridge.ca">  <span class="icon">&nbsp;</span>  <span class="label">Share on Google+</span>  </span>')
                gapi.interactivepost.render("storage-gplus", options)
            }, 500)
        } else {
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
        if (snapshot.exists()) {
            $("#expired2").html("")
            snapshot.forEach(function (snapshot) {
                getExpiredInfoList(snapshot.key)
            })
            setTimeout(function () {
                $("#expired2").append(currentExpireInfo)
                options.prefilltext = currentExpireInfoTwitter
                $("#expired2").append('<span id="expire2-gplus" class="gplus g-interactivepost" data-contenturl="https://whatsinmyfridge.ca" data-clientid="981344901205-o9q6bjjcc533o61ehgmr0o451nsnsdbo.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-prefilltext="Engage your users today, create a Google+ page for your business." data-calltoactionlabel="SIGN_UP" data-calltoactionurl="https://whatsinmyfridge.ca">  <span class="icon">&nbsp;</span>  <span class="label">Share on Google+</span>  </span>')
                gapi.interactivepost.render("expire2-gplus", options)
            }, 500)
        } else {
            $("#expired2").html(noInfo)
        }
    })
}
//fills the storage info tab list page
function fillStorageInfoList(name) {
    currentStorageInfo = ""
    setTimeout(function () {
        currentStorageInfoTwitter = "Storage tips for " + currentProperName + ":"
    }, 100)
    return firebase.database().ref('/info/' + name + '/storage/').orderByValue().once('value').then(function (snapshot) {
        if (snapshot.exists()) {
            $("#storage2").html("")
            snapshot.forEach(function (snapshot) {
                getStorageInfoList(snapshot.key)
            })
            setTimeout(function () {
                $("#storage2").append(currentStorageInfo)
                options.prefilltext = currentStorageInfoTwitter
                $("#storage2").append('<span id="storage2-gplus" class="gplus g-interactivepost" data-contenturl="https://whatsinmyfridge.ca" data-clientid="981344901205-o9q6bjjcc533o61ehgmr0o451nsnsdbo.apps.googleusercontent.com" data-cookiepolicy="single_host_origin" data-prefilltext="Engage your users today, create a Google+ page for your business." data-calltoactionlabel="SIGN_UP" data-calltoactionurl="https://whatsinmyfridge.ca">  <span class="icon">&nbsp;</span>  <span class="label">Share on Google+</span>  </span>')
                gapi.interactivepost.render("storage2-gplus", options)
            }, 500)
        } else {
            $("#storage2").html(noInfo)
        }
    })
}
//gets the info for the expired info tab fridge page
function getExpiredInfo(expireKey) {
    return firebase.database().ref('/expireInfo/' + expireKey).orderByValue().once('value').then(function (snapshot) {
        currentExpireInfo += "<p>" + snapshot.val() + "</p>"
        currentExpireInfoTwitter += "\n" + snapshot.val()


    })
}
//gets the info for the storage tab fridge page
function getStorageInfo(storageKey) {
    return firebase.database().ref('/storageInfo/' + storageKey).orderByValue().once('value').then(function (snapshot) {
        currentStorageInfo += "<p>" + snapshot.val() + "</p>"
        currentStorageInfoTwitter += "\n" + snapshot.val()


    })
}
//gets the info for the expired info tab list page
function getExpiredInfoList(expireKey) {
    return firebase.database().ref('/expireInfo/' + expireKey).orderByValue().once('value').then(function (snapshot) {
        currentExpireInfo += "<p>" + snapshot.val() + "</p>"
        currentExpireInfoTwitter += "\n" + snapshot.val()


    })
}
//gets the info for the storage tab list page
function getStorageInfoList(storageKey) {
    return firebase.database().ref('/storageInfo/' + storageKey).orderByValue().once('value').then(function (snapshot) {
        currentStorageInfo += "<p>" + snapshot.val() + "</p>"
        currentStorageInfoTwitter += "\n" + snapshot.val()


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