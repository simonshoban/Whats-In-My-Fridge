$(document).on("click", "#close-custom-view", function () {
    $("#custom-view").popup("close")
});

$(document).on("popupbeforeposition", "#custom-view", function () {
    fillCustomView()
});

function fillCustomView() {

    return firebase.database().ref('customAutoFill/' + uid).once('value').then(function (snapshot) {


        snapshot.forEach(function (snapshot) {

            var name = snapshot.key
            var key = snapshot.key
            var foodGroup = snapshot.val().foodGroup

            var category = foodGroup.substr(0, 1)
            var expire = snapshot.val().expire / msPerDay
            var element = '<div class="custom-item"> <img height="50" width="50" src="icons/' + category + '.svg"> <p class="custom-name">' + name + '</p><p class="custom-foodGroup">Category: ' + foodGroup + '</p><p class="custom-expire">Days until expiry : ' + expire + '</p> <div><input data-key="' + key + '" class="delete-custom" name="expiry-date" value="Delete"  type="button"/> </div> </div>'
            $("#custom-items-container").append(element).enhanceWithin()
        })
    })

}

$(document).on("click", ".delete-custom", function () {
    var key = $(this).attr("data-key")
    deleteCustomItem(key)
    $("#custom-items-container").html("")
    fillCustomView()
});
