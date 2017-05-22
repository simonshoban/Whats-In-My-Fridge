/*
contains functions for validating add item fields
 */

//validates fridge add item fields
function addItemValidate() {
    var check = true;
    if ($("#expiry-date").datepicker("getDate") != null) {
        $("#food-expiry-date-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#food-expiry-date-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#food-group").val() !== "----------") {
        $("#food-group-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#food-group-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#food-name").val() !== "") {
        $("#food-name-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#food-name-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#item-price").val() == "" || !isNaN(parseInt($("#item-price").val()))) {
        $("#item-price-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#item-price-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#item-quantity").val() == "" || !isNaN(parseFloat($("#item-quantity").val()))) {
        $("#item-quantity-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#item-quantity-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if (check) {
        $("#custom-item-popup").popup("close");

    }

    return check;
}
//validates list add item fields
function addListValidate() {
    var check = true;
    if ($("#food-group-list").val() !== "----------") {
        $("#food-group-label-list .invalid-input-star").css("display", "none");
    }
    else {
        $("#food-group-label-list .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#food-name-list").val() !== "") {
        $("#food-name-label-list .invalid-input-star").css("display", "none");
    }
    else {
        $("#food-name-label-list .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#item-price-list").val() == "" || !isNaN(parseInt($("#item-price-list").val()))) {
        $("#item-price-label-list .invalid-input-star").css("display", "none");
    }
    else {
        $("#item-price-label-list .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#item-quantity-list").val() == "" || !isNaN(parseFloat($("#item-quantity-list").val()))) {
        $("#item-quantity-label-list .invalid-input-star").css("display", "none");
    }
    else {
        $("#item-quantity-label-list .invalid-input-star").css("display", "inline");
        check = false;
    }
    if (check) {
        $("#custom-item-popup2").popup("close");

    }

    return check;
}

//validate custom item fields
function addCustomItemValidate() {
    var check = true;
    if ($("#custom-expiry-date").val() !== "" && !isNaN(parseInt($("#custom-expiry-date").val()))) {
        $("#custom-food-expiry-date-label .invalid-input-star").css("display", "none")
    }
    else {
        $("#custom-food-expiry-date-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#custom-food-group").val() !== "----------") {
        $("#custom-food-group-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#custom-food-group-label .invalid-input-star").css("display", "inline");
        check = false;
    }
    if ($("#custom-food-name").val() !== "") {
        $("#custom-food-name-label .invalid-input-star").css("display", "none");
    }
    else {
        $("#custom-food-name-label .invalid-input-star").css("display", "inline");
        check = false;
    }

    return check;
}
