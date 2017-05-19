/*
contains functions and event listeners for logging in, logging out, and signing up
 */

//sign in with google when "sign in with google" button is clicked
$("#google-btn").click(function () {
    firebase.auth().signInWithRedirect(provider);
});


// calls the firebase sign in function when the login form is submitted, also does client side validation
$("#login-form").submit(
    function () {
        var emailRegex = /^[A-Z0-9_.+-]+@[A-Z0-9_.+-]+\.[A-Z]{2,}$/i;
        var email = $("#login-email").val();
        var password = $("#login-password").val().length;

        if (!emailRegex.test(email)) {
            alert("Email is invalid!");
            return false;
        }

        if (password < 6) {
            alert("Password is too short!");
            return false;
        }

        firebase.auth().signInWithEmailAndPassword($("#login-email").val(), $("#login-password").val()).catch(function (error) {
            // handle sign in errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Message: " + errorMessage + "\n\nError Code: " + errorCode);
        })
    })


// calls the firebase create account function when sign up form is submitted, also does client side validation
$("#signup-form").submit(
    function () {
        var emailRegex = /^[A-Z0-9_.+-]+@[A-Z0-9_.+-]+\.[A-Z]{2,}$/i;
        var email = $("#signup-email").val();
        var password = $("#signup-password").val().length;

        if (!emailRegex.test(email)) {
            alert("Email is invalid!");
            return false;
        }

        if (password < 6) {
            alert("Password is too short!");
            return false;
        }

        firebase.auth().createUserWithEmailAndPassword($("#signup-email").val(), $("#signup-password").val()).catch(function (error) {
            // handle account creation errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Message: " + errorMessage + "\n\nError Code: " + errorCode);
        })
    })

//bind firebase logout function ot logout button
$(".logout-btn").click(function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
});
