
/***********Don't change**********/

/**************Fridge*************/

//Sets overview tab as default tab and highlights tab

$(document).on("click", ".fridge-item", function () {
    $("#overview").show();
    $("#overviewTab").click();
});

//Displays overview when clicked
$("#overviewTab").click(function () {
    $("#overview").show();
    $("#storage").hide();
    $("#expired").hide();
});

//Hides overview when storage tab is clicked
$("#storageTab").click(function () {
    $("#overview").hide();
    $("#storage").show();
    $("#expired").hide();
});

//Hides overview when expired tab is clicked
$("#expiredTab").click(function () {
    $("#overview").hide();
    $("#storage").hide();
    $("#expired").show();
});

/**********Shopping List**********/

//Sets overview tab as default tab and highlights tab
$(document).on("click", ".shopping-item", function () {
    $("#overview2").show();
    $("#overviewTab2").click();
});

//Shows overview when overview tab is clicked and hides other sections
$("#overviewTab2").click(function () {
    $("#overview2").show();
    $("#storage2").hide();
    $("#expired2").hide();
});

//Shows storage when storage tab is clicked and hides other sections
$("#storageTab2").click(function () {
    $("#overview2").hide();
    $("#storage2").show();
    $("#expired2").hide();
});

//Shows expired? when expired tab is clicked and hides other sections
$("#expiredTab2").click(function () {
    $("#overview2").hide();
    $("#storage2").hide();
    $("#expired2").show();
});