/*
contains functions to initiazlize the database for new users
 */

//checks if a fridge exists for the current user. if not calls createFridge to create one
function checkFridge() {
    return firebase.database().ref('/users/' + uid + "/fridge/").once('value').then(function (snapshot) {
        if (snapshot.numChildren() === 0) {
            createFridge(uid);
        }
    })
}
//checks if a list exists for the current user. if not calls create list to create one
function checkList() {
    return firebase.database().ref('/users/' + uid + "/list/").once('value').then(function (snapshot) {
        if (snapshot.numChildren() === 0) {
            createList(uid);
        }
    })
}
//creates a fridge for the current user
function createFridge(uid) {
    var newFridgeKey = firebase.database().ref().child('fridge').push().key;

    var updates = {};
    updates['/users/' + uid + '/fridge/' + newFridgeKey] = "true";

    return firebase.database().ref().update(updates);
}
//creates a list for the current user
function createList(uid) {
    var newListKey = firebase.database().ref().child('list').push().key;

    var updates = {};
    updates['/users/' + uid + '/list/' + newListKey] = "true";

    return firebase.database().ref().update(updates);
}