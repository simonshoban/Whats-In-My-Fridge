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

        $("#stats-overall").after("<p class='stats-text'>Total weight thrown away: " + (totalWeight /kgToG).toFixed(2) + " kg</p>")
        $("#stats-overall").after("<p class='stats-text'>Total volume thrown away: " + (totalVolume / lToMl).toFixed(2) + " L</p>")
        $("#stats-overall").after("<p class='stats-text'>Total dollars wasted: $" + totalPrice.toFixed(2) + "</p>")



        $("#stats-produce").after("<p class='stats-text'>Total weight thrown away: " +(totalProduceWeight /kgToG).toFixed(2) + " kg</p>")
        if(totalProduceVolume !== 0){
            $("#stats-produce").after("<p class='stats-text'>Total volume thrown away: " + (totalProduceVolume / lToMl).toFixed(2) + " L</p>")
        }
        $("#stats-produce").after("<p class='stats-text'>Total dollars wasted: $" + totalProducePrice.toFixed(2) + "</p>")


        $("#stats-meat").after("<p class='stats-text'>Total weight thrown away: " +(totalMeatWeight /kgToG).toFixed(2) + " kg</p>")
        if(totalMeatVolume !== 0){
            $("#stats-meat").after("<p class='stats-text'>Total volume thrown away: " + (totalMeatVolume / lToMl).toFixed(2) + " L</p>")
        }
        $("#stats-meat").after("<p class='stats-text'>Total dollars wasted: $" + totalMeatPrice.toFixed(2) + "</p>")



        $("#stats-dairy").after("<p class='stats-text'>Total weight thrown away: " + (totalDairyWeight /kgToG).toFixed(2) + " kg</p>")
        $("#stats-dairy").after("<p class='stats-text'>Total volume thrown away: " + (totalDairyVolume / lToMl).toFixed(2) + " L</p>")
        $("#stats-dairy").after("<p class='stats-text'>Total dollars wasted: $" + totalDairyPrice.toFixed(2) + "</p>")


        $("#stats-grain").after("<p class='stats-text'>Total weight thrown away: " +(totalGrainWeight /kgToG).toFixed(2) + " kg</p>")
        if(totalGrainVolume !== 0){
            $("#stats-grain").after("<p class='stats-text'>Total volume thrown away: " + (totalGrainVolume / lToMl).toFixed(2) + " L</p>")
        }
        $("#stats-grain").after("<p class='stats-text'>Total dollars wasted: $" + totalGrainPrice.toFixed(2) + "</p>")


        $("#stats-other").after("<p class='stats-text'>Total weight thrown away: " + (totalOtherWeight /kgToG).toFixed(2) + " kg</p>")
        $("#stats-other").after("<p class='stats-text'>Total volume thrown away: " + (totalOtherVolume / lToMl).toFixed(2) + " L</p>")
        $("#stats-other").after("<p class='stats-text'>Total dollars wasted: $" + totalOtherPrice.toFixed(2) + "</p>")

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
        totalProducePrice += (item.price)
    })
    getOnlyPrice(meatArray).forEach(function (item) {
        totalMeatPrice +=(item.price)
    })
    getOnlyPrice(dairyArray).forEach(function (item) {
        totalDairyPrice += (item.price)
    })
    getOnlyPrice(grainArray).forEach(function (item) {
        totalGrainPrice += (item.price)
    })
    getOnlyPrice(otherArray).forEach(function (item) {
        totalOtherPrice += (item.price)
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


