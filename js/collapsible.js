/*
contains event listeners for the collapsible sets on the item page
 */

//makes the produce item text open and close the collapsible
$("#produce-number").click(function () {
    if ($("#p").hasClass("ui-collapsible-collapsed")) {
        $("#p").collapsible("expand");
    } else {
        $("#p").collapsible("collapse");
    }
});
//makes the meat item text open and close the collapsible
$("#meat-number").click(function () {
    if ($("#m").hasClass("ui-collapsible-collapsed")) {
        $("#m").collapsible("expand");
    } else {
        $("#m").collapsible("collapse");
    }
});
//makes the dairy item text open and close the collapsible
$("#dairy-number").click(function () {
    if ($("#d").hasClass("ui-collapsible-collapsed")) {
        $("#d").collapsible("expand");
    } else {
        $("#d").collapsible("collapse");
    }
});
//makes the grain item text open and close the collapsible
$("#grain-number").click(function () {
    if ($("#g").hasClass("ui-collapsible-collapsed")) {
        $("#g").collapsible("expand");
    } else {
        $("#g").collapsible("collapse");
    }
});
//makes the other item text open and close the collapsible
$("#other-number").click(function () {
    if ($("#o").hasClass("ui-collapsible-collapsed")) {
        $("#o").collapsible("expand");
    } else {
        $("#o").collapsible("collapse");
    }
});