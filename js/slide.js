/*
 functions and event listeners to make list items slide
 */
//store width of screen
var width;
//function to return the list-item to its original position
function resetSlidePositions() {
    //checks if somethign is currently animating.if it is do nothing
    if (!$(":animated").length) {
        //movees the list item offscreen to the right
        $($(".moved")).find(".list-item").offset({left: width});
        //animates the list item moving back into position
        $($(".moved")).find(".list-item").animate({
            left: "-=" + width
        });
        //animates the backpnel off screen
        $($(".moved")).find(".list-item-back").animate({
            left: "-=" + width
        });
        $(".moved").removeClass("moved")
    }
    ;
}


//resets the position if a link is clicked
$("a").click(function () {
    resetSlidePositions();
});
//if a collapsible is opened while somthing is slid calls reset position. If it was something in this collapsible set it back with no animation
$('.collapsible').bind('collapsibleexpand', function () {
    var offset = $(this).offset();
    $(this).find(".moved-in-collapsible").find(".list-item").offset({left: offset.left});
    $(this).find(".moved-in-collapsible").removeClass("moved");
    resetSlidePositions()
    //when a collapsible is closed call reset position unless the thing moved is a child of this collapsible then it gives it a marker
}).bind('collapsiblecollapse', function () {
    if ($(this).find(".moved").hasClass("moved")) {
        $(this).find(".moved").addClass("moved-in-collapsible");
        $(this).find(".moved").removeClass("moved")
    }
    else {
        resetSlidePositions()
    }

});


// event that fires when a list-item-container is swiped left
$(".item-list").on("swipeleft", ".list-item-container", function () {
    //checks if anything is being animated
    if (!$(":animated").length) {
        //sets window width
        width = $(window).width();
        //sliding is only allowed on mobile
        if (width > 700) {
            return false;
        }
        //if it has not moved move it
        if (!$(this).hasClass("moved")) {
            resetSlidePositions();
            $(this).find(".list-item-back").offset({left: width});
            $(this).addClass(".list-item-back").animate({
                left: "-=" + width
            });

            $(this).toggleClass("moved");
            $(this).find(".list-item").animate({
                    left: "-=" + width
                },
                //after it finishes animating move it very far away
                function () {
                    $(".moved").find(".list-item").offset({left: 10000})
                });
            return false;
        }   //if it has already moved move it back
        if ($(this).hasClass("moved")) {
            $(this).find(".list-item").offset({left: width});

            $(this).find(".list-item").animate({
                left: "-=" + width
            });
            $(this).removeClass("moved");
            $(this).find(".list-item-back").animate({
                    left: "-=" + width
                },
                //after it finishes animating move it very far away
                function () {
                    $(".moved").find(".list-item-back").offset({left: 10000})
                });
            return false;
        }
    }
});
// event that fires when a list-item-container is swiped right
$(".item-list").on("swiperight", ".list-item-container", function () {
    //checks if anything is being animated
    if (!$(":animated").length) {
        //sets window width
        width = $(window).width();
        //sliding is only allowed on mobile
        if (width > 700) {
            return false;
        }
        //if it has not moved move it
        if (!$(this).hasClass("moved")) {
            resetSlidePositions();
            $(this).find(".list-item-back").offset({left: -width});
            $(this).find(".list-item-back").animate({
                left: "+=" + width
            });

            $(this).addClass("moved");
            $(this).find(".list-item").animate({
                    left: "+=" + width
                },
                //after it finishes animating move it very far away
                function () {
                    $(".moved").find(".list-item").offset({left: 10000})
                });
            return false;
        }
        //if it has already moved move it back
        if ($(this).hasClass("moved")) {
            $(this).find(".list-item").offset({left: -width});

            $(this).find(".list-item").animate({
                left: "+=" + width
            });

            $(this).removeClass("moved");
            $(this).find(".list-item-back").animate({
                    left: "+=" + width
                },
                //after it finishes animating move it very far away
                function () {
                    $(".moved").find(".list-item-back").offset({left: 10000})
                });
            return false;
        }
    }
})
