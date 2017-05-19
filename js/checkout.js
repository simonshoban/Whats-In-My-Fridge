/*
 contains functions and event listeners for shopping list checkout
 */
 
/* Sets overview tab as default tab and highlights tab, opens popup if list item
is clicked, but not if the checkbox is clicked */
$(document).on("click", ".shopping-item", function () {
	setTimeout(function () {
		if (!($(".checkbox").is(':checked'))) {
			$("#item-popup2").popup("open");
			$("#overview2").show();
			$("#overviewTab2").click();
		}
	}, 10)
});

//event listener for clicking checkout button
$(document).on("click", "#checkout-button", function () {
    //get all checked items and make them into an array
    var elements = $(".shopping-item input:checked");
    var array = jQuery.makeArray(elements);
    $("#checkout-container").html("");

    //if there are items checked make checkout elements and open popup. if not disable move to fridge button and display message
    if (array.length > 0) {
        $("#to-fridge").prop("disabled", false);

        array.forEach(function (item) {

            var key = $(item).parent().parent().attr("data-key");
            buildCheckoutElement(key)
        })
    } else {
        $("#checkout-container").html("<h4>Items you have checked off will appear here.</h4>");
        $("#to-fridge").prop("disabled", true);
    }
    $("#checkout-popup").popup("open")

})

//build a checkout element from the given key
function buildCheckoutElement(key) {
    return firebase.database().ref('/users/' + uid + "/list/").once('child_added').then(function (snapshot) {
        var listId = snapshot.key;
        return firebase.database().ref('/list/' + listId + "/" + key).once('value').then(function (snapshot) {
            var name = snapshot.val().name;
            var quantity = snapshot.val().quantity;
            var units = snapshot.val().units;
            var category = snapshot.val().category;
            var quantityText = "";
            if (quantity === undefined) {
                quantity = ""
            } else {
                quantityText = "Quantity:"
            }
            if (units === "--") {
                units = ""
            }
            var quantityString = quantityText + " " + quantity + ' ' + units;
            var element = '<div class="checkout-item"> <img height="50" width="50" src="icons/' + category + '.svg"> <p class="checkout-name">' + name + '</p> <p class="checkout-quantity">' + quantityString +
                '</p> <div> <p class="date-label">Expiry Date:<span class="invalid-input-star">*</span></p><input data-key="' + key + '" class="checkout-date" name="expiry-date"  type="text"/> </div> </div>'
            $(element).appendTo("#checkout-container").enhanceWithin();
            $(".checkout-date").datepicker({
                firstDay: 1,
                minDate: 0,
                dateFormat: "yy-mm-dd"
            });
            fillCheckoutExpire(name, key)
        })
    })
}

//autofill the checkout expire field if food is in database
function fillCheckoutExpire(name, key) {
    return firebase.database().ref('/autofill/' + name.toLowerCase()).once('value').then(function (snapshot) {
        if (snapshot.hasChild("foodGroup")) {

            var expireDay = snapshot.val().expire + Date.now();
            $("#checkout-container [data-key='" + key + "']").val(new Date(expireDay).toISOString().substr(0, 10))

        }
    })
}

//event listener for add to fridge button
$(document).on("click", "#to-fridge", function () {
    //get all heckout date elements, make them an array, then filter the array for elements will null date fields
    var elements = $(".checkout-date");
    var array = jQuery.makeArray(elements);
    var filteredArray = jQuery.grep(array, function (n, i) {
        return $(n).datepicker("getDate") === null;
    });
    //make all invalid input stars invislible
    $(elements).parent().parent().find(".invalid-input-star").css("display", "none");

    // make invalid input star visible for all fields with null dates
    for (i = 0; i < filteredArray.length; i++) {
        $(filteredArray[i]).parent().parent().find(".invalid-input-star").css("display", "inline")
    }
    //if no dates are null transfer the items to the fridge and redraw the shopping and fridge item lists
    if (filteredArray.length === 0) {
        transferToFridge();
        setTimeout(function () {
            $("#checkout-popup").popup("close");

            redrawList();
            redrawShoppingList()

        }, 500)
    }
});

//event listener for the cancel button to close the checkout popup
$(document).on("click", "#not-to-fridge", function () {
    $("#checkout-popup").popup("close")
});

//transfers all items on the checkout list from the shopping list to the fridge list
function transferToFridge() {
    var elements = $("#checkout-container .checkout-date");
    var array = jQuery.makeArray(elements);
    array.forEach(function (item) {
        var key = $(item).attr("data-key");
        var expire = $(item).datepicker("getDate").getTime();
        return firebase.database().ref('/users/' + uid + "/list/").once('child_added').then(function (snapshot) {
            var listId = snapshot.key;
            return firebase.database().ref('/users/' + uid + "/fridge/").once('child_added').then(function (snapshot) {
                var fridgeId = snapshot.key;
                var oldRef = firebase.database().ref('/list/' + listId + "/" + key);
                return oldRef.once('value').then(function (snapshot) {
                    var name = snapshot.val().name;
                    var date = Date.now();
                    var quantity = snapshot.val().quantity;
                    if (quantity === undefined) {
                        quantity = null
                    }
                    var units = snapshot.val().quantity;
                    if (units === undefined) {
                        units = null
                    }
                    var price = snapshot.val().quantity;
                    if (price === undefined) {
                        price = null
                    }
                    var category = snapshot.val().category;
                    var newRef = firebase.database().ref('/fridge/' + fridgeId + "/" + key);
                    newRef.set({
                        name: name,
                        date: date,
                        units: units,
                        quantity: quantity,
                        price: price,
                        category: category,
                        expire: expire
                    }).then(function () {
                        oldRef.remove()

                    })

                })
            })
        })

    })

}