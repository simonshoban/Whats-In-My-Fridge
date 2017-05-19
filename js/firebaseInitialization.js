// Initialize Firebase
var config = {
    apiKey: "AIzaSyCem7c3julHajYjuPi5dpwBF7FisO5mVBA",
    authDomain: "whatsinmyfridge-b1f71.firebaseapp.com",
    databaseURL: "https://whatsinmyfridge-b1f71.firebaseio.com",
    projectId: "whatsinmyfridge-b1f71",
    storageBucket: "whatsinmyfridge-b1f71.appspot.com",
    messagingSenderId: "981344901205"
};
firebase.initializeApp(config);


// store google login provider
var provider = new firebase.auth.GoogleAuthProvider();

//gets redirect from google sign in
firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
    }
    // The signed-in user info.
    var user = result.user;
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
});