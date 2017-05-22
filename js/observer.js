//observer that fires when login state changes or page is loaded
firebase.auth().onAuthStateChanged(
    function (user) {
        if (user) {
            // User is signed in.

            // set user data to variables
            displayName = user.displayName;
            email = user.email;
            emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            isAnonymous = user.isAnonymous;
            uid = user.uid;
            providerData = user.providerData;

            //check if use has a fridge and list and make them if not
            $(checkFridge);
            $(checkList);

            //functions to load various page elements
            $(checkRonic);
            $(setSorting);
           // $(redrawList);
            $(redrawShoppingList);
            $(fillFrequentlyPurchasedItemsFridge);
            $(fillFrequentlyPurchasedItemsList);
            $(getAvailiableTags());

            // hide and show buttons based on login state
            $(".login-btn").hide();
            $(".signup-btn").hide();
            $(".logout-btn").show();
            $(".fridge-btn").show();
            $(".settings-btn").show();
            $(".shopping-list-btn").show();
            getAvailiableTags();

            // go to the fridge page
            $.mobile.navigate("#fridge");




        } else {
            // User is signed out.

            // hide and show buttons based on login state
            $(".signup-btn").show();
            $(".logout-btn").hide();
            $(".login-btn").show();
            $(".fridge-btn").hide();
            $(".settings-btn").hide();
            $(".shopping-list-btn").hide();

            // go to login page
            $.mobile.navigate("#login");


            // remove the loading class from html to show page
            $("html").removeClass("loading")


        }
    }
);