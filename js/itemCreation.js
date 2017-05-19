/*
functions and event listeners for creating list item elements
 */

//clears all items from the fridge
function clearFridgeList() {
    $("#fridge .list-item-container").remove()
}
//cleasr all items from the list
function clearShoppingList() {
    $("#list .list-item-container").remove()
}

//fills the fridge page with items. how it does it depends on sorting settings
function redrawList() {
    clearFridgeList();
    if (!$("#category-flip").prop("checked")) {
        $(".collapsible-container").hide()
    }
    else {
        $(".collapsible-container").show()
    }

    if ($("#order-name").prop("checked")) {
        if ($("#order-asc").prop("checked")) {
            getFridgeListByNameAsc()
        }
        else {
            getFridgeListByNameDesc()
        }

    } else if ($("#order-date").prop("checked")) {
        if ($("#order-asc").prop("checked")) {
            getFridgeListByDateAsc()
        }
        else {
            getFridgeListByDateDesc()
        }
    }
    setCollapsibleNumbers();
}
//fills the shopping list page with items
function redrawShoppingList() {
    ($(".shopping-empty").hide());
    clearShoppingList();
    getShoppingList();
}

//sets the numbers for the collapsibles
function setCollapsibleNumbers() {
    var pNumber;
    var mNumber;
    var gNumber;
    var dNumber;
    var oNumber;
    pNumber = $("#p > div > div").length;
    mNumber = $("#m > div > div").length;
    gNumber = $("#g > div > div").length;
    dNumber = $("#d > div > div").length;
    oNumber = $("#o > div > div").length;
    $("#produce-number").html(pNumber + " items");
    $("#meat-number").html(mNumber + " items");
    $("#grain-number").html(gNumber + " items");
    $("#dairy-number").html(dNumber + " items");
    $("#other-number").html(oNumber + " items");
}

//redraws the list and changes icons when sorting settings are changed
$("input:radio").change(function () {

        if ($(this).prop("checked")) {
            if (!($("#order-asc").prop("checked"))) {
                $(".sort-icon-btn").css('background-image', 'url("icons/sorGrpDesc.svg")');
                redrawList();
            }
            if (!($("#order-desc").prop("checked"))) {
                $(".sort-icon-btn").css('background-image', 'url("icons/sorGrpAsc.svg")');
                redrawList();
            }

        }
    }
);
//redraws the list after category setting is changed
$("input:checkbox").change(function () {
        redrawList()
    }
);