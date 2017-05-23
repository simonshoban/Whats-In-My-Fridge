/*
contains funcstions and event listeners for retrieving data from the database
 */

//store the number of milliseconds in a day
var msPerDay = 86400000;

//gets fridge items from the database and displays them by expiry date ascending
function getFridgeListByDateAsc() {
    return firebase.database().ref('/users/' + uid + "/fridge/").once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            var fridgeId = snapshot.key;
            return firebase.database().ref('/fridge/' + fridgeId).orderByChild("expire").once('value').then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    var key = snapshot.key;
                    var name = snapshot.val().name;
                    var category = snapshot.val().category;
                    var expire = Math.floor(((snapshot.val().expire - Date.now()) ) / msPerDay);
                    var quantity = snapshot.val().quantity;
                    var price = snapshot.val().price;
                    var expireText;
                    var circle;


                    if (expire > 1) {
                        expireText = "Expires in " + expire + " days";
                    } else if (expire < -1) {
                        expireText = "Expired " + Math.abs(expire) + " days ago"
                    } else if (expire === 0) {
                        expireText = "Expires today"
                    } else if (expire === 1) {
                        expireText = "Expires in " + expire + " day";
                    } else if (expire === -1) {
                        expireText = "Expired " + Math.abs(expire) + " day ago"
                    }

                    if (expire <= 0) {
                        $(".list-item.fridge-item").css("background-color", "rgba(255, 0, 0, 0.1)");
                    }

                    if (expire <= 3) {
                        circle = "red-circle"
                    } else if (expire <= 5) {
                        circle = "orange-circle"
                    } else {
                        circle = "green-circle"
                    }


                    var element = "<div class='list-item-container'> <a data-key='" + key + "' href='#'  data-rel='popup' class='list-item ui-btn fridge-item'> <img height='50' width='50' src='icons/" + category + ".svg'> <p class='item-name'>" + name + "</p> <p class='item-expires'>" + expireText + "</p> <div class='" + circle + " small-circle'></div> </a> " +
                        "<div class='list-item-back'> <div class='back-container'> <a href='#' class='ate-button ui-btn ui-shadow ui-btn-inline'>I ate it</a><a href='#' class='expired-button ui-btn ui-shadow ui-btn-inline'>I threw it out</a> </div> </div> </div> </div>";
                    if (!$("#category-flip").prop("checked")) {
                        $("#fridge .item-list").append(element)
                    }
                    else {
                        $("#fridge #" + category + "> div").append(element)

                    }

                });
                setCollapsibleNumbers()
                drawing = false;
            });
        });
    })
}

//gets fridge items from the database and displays them by expiry date descending
function getFridgeListByDateDesc() {
    return firebase.database().ref('/users/' + uid + "/fridge/").once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            var fridgeId = snapshot.key;
            return firebase.database().ref('/fridge/' + fridgeId).orderByChild("expire").once('value').then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    var key = snapshot.key;
                    var name = snapshot.val().name;
                    var category = snapshot.val().category;
                    var expire = Math.floor(((snapshot.val().expire - Date.now()) ) / msPerDay);
                    var quantity = snapshot.val().quantity;
                    var price = snapshot.val().price;
                    var expireText;
                    var circle;


                    if (expire > 1) {
                        expireText = "Expires in " + expire + " days";
                    } else if (expire < -1) {
                        expireText = "Expired " + Math.abs(expire) + " days ago"
                    } else if (expire === 0) {
                        expireText = "Expires today"
                    } else if (expire === 1) {
                        expireText = "Expires in " + expire + " day";
                    } else if (expire === -1) {
                        expireText = "Expired " + Math.abs(expire) + " day ago"
                    }

                    if (expire <= 0) {
                        $(".list-item.fridge-item").css("background-color", "rgba(255, 0, 0, 0.1)");
                    }

                    if (expire <= 3) {
                        circle = "red-circle"
                    } else if (expire <= 5) {
                        circle = "orange-circle"
                    } else {
                        circle = "green-circle"
                    }


                    var element = "<div class='list-item-container'> <a data-key='" + key + "' href='#'  data-rel='popup' class='list-item ui-btn fridge-item'> <img height='50' width='50' src='icons/" + category + ".svg'> <p class='item-name'>" + name + "</p> <p class='item-expires'>" + expireText + "</p> <div class='" + circle + " small-circle'></div> </a> " +
                        "<div class='list-item-back'><div class='back-container'> <a href='#' class='ate-button ui-btn ui-shadow ui-btn-inline'>I ate it</a><a href='#' class='expired-button ui-btn ui-shadow ui-btn-inline'>I threw it out</a> </div> </div> </div> </div>";
                    if (!$("#category-flip").prop("checked")) {
                        $("#fridge .item-list").prepend(element)
                    }
                    else {
                        $("#fridge #" + category + "> div").prepend(element)

                    }
                });
                setCollapsibleNumbers()
                drawing = false;
            });
        });
    })
}

//gets fridge items from the database and displays them by name ascending
function getFridgeListByNameAsc() {
    return firebase.database().ref('/users/' + uid + "/fridge/").once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            var fridgeId = snapshot.key;
            return firebase.database().ref('/fridge/' + fridgeId).orderByChild("name").once('value').then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    var key = snapshot.key;
                    var name = snapshot.val().name;
                    var category = snapshot.val().category;
                    var expire = Math.floor(((snapshot.val().expire - Date.now()) ) / msPerDay);
                    var quantity = snapshot.val().quantity;
                    var price = snapshot.val().price;
                    var expireText;
                    var circle;


                    if (expire > 1) {
                        expireText = "Expires in " + expire + " days";
                    } else if (expire < -1) {
                        expireText = "Expired " + Math.abs(expire) + " days ago"
                    } else if (expire === 0) {
                        expireText = "Expires today"
                    } else if (expire === 1) {
                        expireText = "Expires in " + expire + " day";
                    } else if (expire === -1) {
                        expireText = "Expired " + Math.abs(expire) + " day ago"
                    }


                    if (expire <= 3) {
                        circle = "red-circle"
                    } else if (expire <= 5) {
                        circle = "orange-circle"
                    } else {
                        circle = "green-circle"
                    }

                    var element = "<div class='list-item-container'> <a data-key='" + key + "' href='#' data-rel='popup' class='list-item ui-btn fridge-item'> <img height='50' width='50' src='icons/" + category + ".svg'> <p class='item-name'>" + name + "</p> <p class='item-expires'>" + expireText + "</p> <div class='" + circle + " small-circle'></div> </a> " +
                        "<div class='list-item-back'> <div class='back-container'> <a href='#' class='ate-button ui-btn ui-shadow ui-btn-inline'>I ate it</a><a href='#' class='expired-button ui-btn ui-shadow ui-btn-inline'>I threw it out</a> </div> </div> </div> </div>";
                    if (!$("#category-flip").prop("checked")) {
                        $("#fridge .item-list").append(element)
                    }
                    else {
                        $("#fridge #" + category + "> div").append(element)

                    }
                });
                setCollapsibleNumbers()
                drawing = false;
            });
        });
    })
}

//gets fridge items from the database and displays them by name descending
function getFridgeListByNameDesc() {
    return firebase.database().ref('/users/' + uid + "/fridge/").once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            var fridgeId = snapshot.key;
            return firebase.database().ref('/fridge/' + fridgeId).orderByChild("name").once('value').then(function (snapshot) {
                snapshot.forEach(function (snapshot) {
                    var key = snapshot.key;
                    var name = snapshot.val().name;
                    var category = snapshot.val().category;
                    var expire = Math.floor(((snapshot.val().expire - Date.now()) ) / msPerDay);
                    var quantity = snapshot.val().quantity;
                    var price = snapshot.val().price;
                    var expireText;
                    var circle;

                    if (expire > 1) {
                        expireText = "Expires in " + expire + " days";
                    } else if (expire < -1) {
                        expireText = "Expired " + Math.abs(expire) + " days ago"
                    } else if (expire === 0) {
                        expireText = "Expires today"
                    } else if (expire === 1) {
                        expireText = "Expires in " + expire + " day";
                    } else if (expire === -1) {
                        expireText = "Expired " + Math.abs(expire) + " day ago"
                    }

                    if (expire <= 3) {
                        circle = "red-circle"
                    } else if (expire <= 5) {
                        circle = "orange-circle"
                    } else {
                        circle = "green-circle"
                    }

                    var element = "<div class='list-item-container'> <a data-key='" + key + "' href='#'  data-rel='popup' class='list-item ui-btn fridge-item'> <img height='50' width='50' src='icons/" + category + ".svg'> <p class='item-name'>" + name + "</p> <p class='item-expires'>" + expireText + "</p> <div class='" + circle + " small-circle'></div> </a> " +
                        "<div class='list-item-back'>  <div class='back-container'> <a href='#' class='ate-button ui-btn ui-shadow ui-btn-inline'>I ate it</a><a href='#' class='expired-button ui-btn ui-shadow ui-btn-inline'>I threw it out</a> </div> </div> </div>"
                    if (!$("#category-flip").prop("checked")) {
                        $("#fridge .item-list").prepend(element)
                    }
                    else {
                        $("#fridge #" + category + "> div").prepend(element)

                    }
                });
                setCollapsibleNumbers()
                drawing = false;
            });
        });
    })
}

//gets list items from the database and displays
function getShoppingList() {
    return firebase.database().ref('/users/' + uid + "/list/").once('value').then(function (snapshot) {
        snapshot.forEach(function (snapshot) {
            var listId = snapshot.key;
            return firebase.database().ref('/list/' + listId).orderByChild("expire").once('value').then(function (snapshot) {
                if (snapshot.numChildren() === 0) {
                    ($(".shopping-empty").show())
                }
                snapshot.forEach(function (snapshot) {
                    var key = snapshot.key;
                    var name = snapshot.val().name;
                    var category = snapshot.val().category;
                    var quantity = snapshot.val().quantity;
                    var units = snapshot.val().units;
                    var price = snapshot.val().price;
                    var quantityText = "";
                    if (units === "--") {
                        units = ""
                    }
                    if (quantity != null && quantity !=undefined && quantity != "") {
                        quantityText = "Quantity: " + quantity + " " + units
                    }
                    var element = '<div class="list-item-container"> <a data-key="' + key + '" href="#" data-rel="popup" class="list-item ui-btn shopping-item"><img height="50" width="50" src="icons/' + category + '.svg"> <p class="item-name">' + name + '</p> <p class="item-quantity">' + quantityText + '</p> <label class="checkbox-label "> <input type="checkbox" class="checkbox"> </label> </a> ' + "<div class='list-item-back'> <div class='back-container'> <a href='#' class='expired-button ui-btn ui-shadow ui-btn-inline'>Delete Item</a> </div> </div> </div> </div>";
                    $("#list .item-list").append(element).enhanceWithin()

                });
                drawing = false;
            });
        });
    })
}