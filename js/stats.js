var historyArray = []
var produceArray = []
var meatArray = []
var dairyArray = []
var grainArray = []
var otherArray = []

var kgToG = 1000;
var lbToG = 453.592;
var ozToG = 28.3495;

var lToMl = 1000;
var flozToMl = 29.5735


var totalWeight;
var totalProduceWeight;
var totalMeatWeight;
var totalGrainWeight;
var totalDairyWeight;
var totalOtherWeight;

var totalVolume;
var totalProduceVolume;
var totalMeatVolume;
var totalGrainVolume;
var totalDairyVolume;
var totalOtherVolume;

var totalPrice;
var totalProducePrice;
var totalMeatPrice;
var totalGrainPrice;
var totalDairyPrice;
var totalOtherPrice;


$(document).on("pageshow", "#stats", function () {
    getHistoryArray()

})


function getHistoryArray() {
    historyArray = []
    return firebase.database().ref('/history/' + uid).once('value').then(function (snapshot) {


        snapshot.forEach(function (snapshot) {
            var quantity = snapshot.val().quantity
            var units = snapshot.val().units
            var percent = snapshot.val().percent
            var price = snapshot.val().price


            if (units === "kg") {
                quantity *= kgToG
                units = "g"
            } else if (units === "lb") {
                quantity *= lbToG
                units = "g"
            } else if (units === "oz") {
                quantity *= ozToG
                units = "g"
            } else if (units === "L") {
                quantity *= lToMl
                units = "ml"
            } else if (units === "fl oz") {
                quantity *= flozToMl
                units = "ml"
            }

            quantity = quantity * percent / 100
            price = price * percent / 100


            historyArray.push({
                name: snapshot.val().name,
                date: snapshot.val().date,
                category: snapshot.val().category,
                quantity: quantity,
                units: units,
                price: price


            })
        })
        produceArray = getOnlyCategory(historyArray, "p")
        meatArray = getOnlyCategory(historyArray, "m")
        dairyArray = getOnlyCategory(historyArray, "d")
        grainArray = getOnlyCategory(historyArray, "g")
        otherArray = getOnlyCategory(historyArray, "o")

        $(".stats-text").remove()
        getWeightTotals()
        getPriceTotals()
        getVolumeTotals()
        $("#stats-overall").after("<p class='stats-text'>Total Weight thrown away: " + totalWeight + " g</p>")
        $("#stats-overall").after("<p class='stats-text'>Total Volume thrown away: " + totalVolume + " ml</p>")
        $("#stats-overall").after("<p class='stats-text'>Total Weight thrown away: $" + totalPrice + "</p>")

        $("#stats-produce").after("<p class='stats-text'>Produce Weight thrown away: " + totalProduceWeight + " g</p>")
        $("#stats-produce").after("<p class='stats-text'>Produce Volume thrown away: " + totalProduceVolume + " ml</p>")
        $("#stats-produce").after("<p class='stats-text'>Produce Weight thrown away: $" + totalProducePrice + "</p>")

        $("#stats-meat").after("<p class='stats-text'>Produce Weight thrown away: " + totalMeatWeight + " g</p>")
        $("#stats-meat").after("<p class='stats-text'>Produce Volume thrown away: " + totalMeatVolume + " ml</p>")
        $("#stats-meat").after("<p class='stats-text'>Produce Weight thrown away: $" + totalMeatPrice + "</p>")

        $("#stats-dairy").after("<p class='stats-text'>Dairy Weight thrown away: " + totalDairyWeight + " g</p>")
        $("#stats-dairy").after("<p class='stats-text'>Dairy Volume thrown away: " + totalDairyVolume + " ml</p>")
        $("#stats-dairy").after("<p class='stats-text'>Dairy Weight thrown away: $" + totalDairyPrice + "</p>")

        $("#stats-grain").after("<p class='stats-text'>Grain Weight thrown away: " + totalGrainWeight + " g</p>")
        $("#stats-grain").after("<p class='stats-text'>Grain Volume thrown away: " + totalGrainVolume + " ml</p>")
        $("#stats-grain").after("<p class='stats-text'>Grain Weight thrown away: $" + totalGrainPrice + "</p>")

        $("#stats-other").after("<p class='stats-text'>Grain Weight thrown away: " + totalOtherWeight + " g</p>")
        $("#stats-other").after("<p class='stats-text'>Grain Volume thrown away: " + totalOtherVolume + " ml</p>")
        $("#stats-other").after("<p class='stats-text'>Grain Weight thrown away: $" + totalOtherPrice + "</p>")

        console.log(totalWeight)
        console.log(totalPrice)
        console.log(totalVolume)

    })
}


function getOnlyCategory(array, category) {
    var temp = jQuery.grep(array, function (n, i) {
        if (n.category === category) {
            return true
        }
        return false
    })
    return temp
}

function getOnlyWeight(array) {

    var temp = jQuery.grep(array, function (n) {
        return n.units === "g"
    })
    return temp
}

function getOnlyVolume(array) {

    var temp = jQuery.grep(array, function (n) {
        return n.units === "ml"
    })
    return temp
}

function getOnlyPrice(array) {

    var temp = jQuery.grep(array, function (n) {
        return !isNaN(n.price)
    })
    return temp
}


function getWeightTotals() {
    totalWeight = 0
    totalProduceWeight = 0
    totalDairyWeight = 0
    totalMeatWeight = 0
    totalGrainWeight = 0
    totalOtherWeight = 0

    getOnlyWeight(historyArray).forEach(function (item) {
        totalWeight += Math.round(item.quantity)
    })
    getOnlyWeight(produceArray).forEach(function (item) {
        totalProduceWeight += Math.round(item.quantity)
    })
    getOnlyWeight(meatArray).forEach(function (item) {
        totalMeatWeight += Math.round(item.quantity)
    })
    getOnlyWeight(dairyArray).forEach(function (item) {
        totalDairyWeight += Math.round(item.quantity)
    })
    getOnlyWeight(grainArray).forEach(function (item) {
        totalGrainWeight += Math.round(item.quantity)
    })
    getOnlyWeight(otherArray).forEach(function (item) {
        totalOtherWeight += Math.round(item.quantity)
    })
}

function getPriceTotals() {
    totalPrice = 0
    totalProducePrice = 0
    totalDairyPrice = 0
    totalMeatPrice = 0
    totalGrainPrice = 0
    totalOtherPrice = 0

    getOnlyPrice(historyArray).forEach(function (item) {
        totalPrice += Math.round(item.price)
    })
    getOnlyPrice(produceArray).forEach(function (item) {
        totalProducePrice += Math.round(item.price)
    })
    getOnlyPrice(meatArray).forEach(function (item) {
        totalMeatPrice += Math.round(item.price)
    })
    getOnlyPrice(dairyArray).forEach(function (item) {
        totalDairyPrice += Math.round(item.price)
    })
    getOnlyPrice(grainArray).forEach(function (item) {
        totalGrainPrice += Math.round(item.price)
    })
    getOnlyPrice(otherArray).forEach(function (item) {
        totalOtherPrice += Math.round(item.price)
    })
}
function getVolumeTotals() {
    totalVolume = 0
    totalProduceVolume = 0
    totalDairyVolume = 0
    totalMeatVolume = 0
    totalGrainVolume = 0
    totalOtherVolume = 0

    getOnlyVolume(historyArray).forEach(function (item) {
        totalVolume += Math.round(item.quantity)
    })
    getOnlyVolume(produceArray).forEach(function (item) {
        totalProduceVolume += Math.round(item.quantity)
    })
    getOnlyVolume(meatArray).forEach(function (item) {
        totalMeatVolume += Math.round(item.quantity)
    })
    getOnlyVolume(dairyArray).forEach(function (item) {
        totalDairyVolume += Math.round(item.quantity)
    })
    getOnlyVolume(grainArray).forEach(function (item) {
        totalGrainVolume += Math.round(item.quantity)
    })
    getOnlyVolume(otherArray).forEach(function (item) {
        totalOtherVolume += Math.round(item.quantity)
    })
}


