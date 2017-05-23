/*
contains functions and event listeners for the navigation panel
 */

// manually enhances #defaultpanel
$(function () {
    $("[data-role=panel]").panel().enhanceWithin();
});


//makes it impossible to scroll when panel is open. fires on login page load
$(document).on("pageinit", "#login", function (event) {

    $("#defaultpanel").on("panelopen", function (event, ui) {
        //setting overflow : hidden and binding "touchmove" with event which returns false
        $('html').css("overflow", "hidden").on("touchmove", stopScroll);
    });

    $("#defaultpanel").on("panelclose", function (event, ui) {
        //remove the overflow: hidden property. Also, remove the "touchmove" event.
        $('html').css("overflow", "auto").off("touchmove");
    });

    function stopScroll() {
        return false;
    }
});
//also makes it impossible to scroll when panel is open. fires on fridge page load
$(document).on("pageinit", "#fridge", function (event) {

    $("#defaultpanel").on("panelopen", function (event, ui) {
        //setting overflow : hidden and binding "touchmove" with event which returns false
        $('html').css("overflow", "hidden").on("touchmove", stopScroll);
    });

    $("#defaultpanel").on("panelclose", function (event, ui) {
        //remove the overflow: hidden property. Also, remove the "touchmove" event.
        $('html').css("overflow", "auto").off("touchmove");
    });

    function stopScroll() {
        return false;
    }
});

// to make current tab on the side bar to highlight properly for desktop mode.
$(document).on("pageshow", function(e, data){
    var page = $.mobile.activePage.attr("id");
    var pagelink = "#" + page + "-link";
    $(pagelink).css({"background-color":"#55a3e0","color":"white"});
});
// to make current tab on the side bar to highlight properly for mobile mode.
$(document).on("pageshow", function(e, data){
    $("#fridge-mlink").css({"background-color":"white","color":"black"});
    $("#list-mlink").css({"background-color":"white","color":"black"});
    $("#settings-mlink").css({"background-color":"white","color":"black"});
    $("#about-mlink").css({"background-color":"white","color":"black"});
    $("#aff-apps-mlink").css({"background-color":"white","color":"black"});
    $("#stats-mlink").css({"background-color":"white","color":"black"});
    $("#login-mlink").css({"background-color":"white","color":"black"});
    var page = $.mobile.activePage.attr("id");
    var pagelink = "#" + page + "-mlink";
    $(pagelink).css({"background-color":"#55a3e0","color":"white"});
});