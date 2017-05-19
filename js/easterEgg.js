/* If hidden text box submits "RONIC", text box disappears
 and Ronic image swap slider appears in settings page */
function easterEgg() {
	var input = $("#easter-egg").val().toUpperCase();
	if (input == "RONIC") {
		var uid = firebase.auth().currentUser.uid;
		setRonic(uid);
	}
}

var clickCounter = 0;

/* Replaces all static images with images from the best-selling adventure
 platformer Ronic The PineconeTM and plays music from it and disables easter
 egg flipswitch */
function ronicImageSwap() {
	var ronicMusic = new Audio('sounds/RonicOP.wav');
	ronicMusic.play();
	
	var ronicImageArray = [
		"icons/3A9CEA45.png",
		"icons/54BFCAC8.png",
		"icons/96D5E809.png",
		"icons/7332E7F6.png",
		"icons/85558730.png",
		"icons/A99C66B4.png",
		"icons/B40CCF7C.png",
		"icons/CD07E8E3.png",
		"icons/E6F30EF6.png",
		"icons/EA407848.png"
	];

	//Goes through every image tag and changes it's source to a random Ronic image
	$(document).ready(function () {
		for (var index = 0; index < $("img").length; index++) {
			var random = Math.floor(Math.random() * (9 - 0));
			document.getElementsByTagName("img")[index].src = ronicImageArray[random];
		}
	});

	$("#ronic-slider").flipswitch("disable");
}

//Gives the user helpful messages after attempting to deactivate the disabled flipswitch
$("#ronic-slider-td").click(function () {
	clickCounter++;
	if (clickCounter > 7) {
		alert("Try refreshing");
	} else if (clickCounter === 2) {
		$("#settings-form-table").after("<p>AAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
			"</p>");
	}
});


//Sets ronic variable in database to true, creates ronic variable and Easter Egg node if doesn't already exist
function setRonic(uid) {
    firebase.database().ref('users/' + uid + '/Easter Egg/').set({
        ronic: true
    });

    checkRonic();
}


//Checks database to see if ronic variable is set to true, displays easter egg slider if it is true
function checkRonic() {
    return firebase.database().ref('/users/' + uid + '/Easter Egg/').once('value').then(function (snapshot) {
        if (snapshot.val() != null) {
            if (snapshot.val().ronic) {
                $("#easter-egg").hide();
                $("#ronic-slider-container").show();
            }
        }
    });
}
