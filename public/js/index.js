

///////////////////////////////////////////////
/////   Lower case are regular comments   /////
///////////////////////////////////////////////
/////      UPPER CASE ARE TO DO ITEMS     /////
///////////////////////////////////////////////


// NOT WORKING (FIRING ON MODAL STAR CLICK)
// rating variable, changes on click with function
var searchRating = 0;
//search star rating value changer
$(document).on("click", ".search-rating", getSearchRatingValue);
function getSearchRatingValue() {
    searchRating = $(this).attr("value");
    console.log(searchRating);
}
// $(document).on("click", ".bin-btn", closeModalOnDelete);
// function closeModalOnDelete() {
//     //REFRESH PAGE
//     var elems = document.querySelectorAll('.modal');
//     var instance = M.Modal.getInstance(elems);

//     instance.close();
// }




//Materialise Functions
$(document).ready(function () {
    //Materialise custom options
    // Closes comment box at event
    var closeModalFunction = function () {
        //closes comment box
        var elem = document.querySelector('.collapsible');
        var instance = M.Collapsible.getInstance(elem);
        instance.close(0);

        //removes rating id from buttons
        $('.modal *').removeAttr("rating_id");
    };

    // Materialise create instances and link options
    $('.sidenav').sidenav();
    $('.modal').modal({
        onCloseEnd: closeModalFunction,
        opacity: 0.5
    })
    $('select').formSelect();
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy({
        throttle: 50
    });
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible();
});

$(".name-not-valid").hide();
$(".form-not-filled").hide();
$(".added_recipe").hide();

//Show results container
$(document).on("click", ".search_name", isValidName);
// check if user recipe name is valid
function isValidName(name) {
    event.preventDefault();
    var name = $('.search_by_name').val();
    if (name == "" || name == null) {
        $(".name-not-valid").show();
        return false;
    } else {
        $(".name-not-valid").hide();
    }
}


$(document).on("click", ".search_other", isRatingSelected);
// checks if rating is selected
function isRatingSelected() {
    event.preventDefault();
    console.log("hit")
    var radios = document.getElementsByName("rating");
    var ratingSelected = false;
    var typeSelected = false;
    var type = "";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            ratingSelected = true;
        } else {
            isTypeSelected();
        }
        // if no rating, checks if type is selected
        function isTypeSelected() {
            console.log("hit2")
            var select = document.getElementById("select");
            console.log(select.value);
            if (!select.value == "") {
                console.log("yup");
                typeSelected = true;
                type = $('.type').val();
            } else {
                // if neither rating or type is selected, error shows
                $(".form-not-filled").show();
                console.log("nope")
            }
        }
    }
    console.log('ratingSelected: ' + ratingSelected)
    console.log('typeSelected: ' + typeSelected)

    if (ratingSelected && typeSelected) {
        // $.ajax("/api/join/recipe/recipes/ratings/recipe_id/recipe_id/?table=ratings&column=rating&value=" + searchRating + "&tableTwo=recipes&columnTwo=type&valueTwo=" + select.value, {
        //     type: "GET"
        // }).then(function (data) {
        //     console.log(data)
        //     console.log("Joined");
        // });
        $.ajax("/api/join/recipe/recipes/ratings/recipe_id/recipe_id/?table=ratings&column=rating&value=" + searchRating, {
            type: "GET"
        }).then(function (data) {
            let result = data.filter(obj => {
                return obj.type == select.value
              })
            console.log(result)
            console.log("Joined");
            searchResults(result)
        });

    }
    else if (ratingSelected) {
        // ajax for rating
        var insertQuery = {
            tableOne: 'recipes',
            tableTwo: 'ratings',
            on: ['ratings.rating_id = recipes.recipe_id']
        }
       

        $.ajax("/api/join/recipe/recipes/ratings/recipe_id/recipe_id/?table=ratings&column=rating&value=" + searchRating, {
            type: "GET"
        }).then(function (data) {
            console.log(data)
            console.log("Joined");
        });

    }
    else if (typeSelected) {
        $.get("/api/search/recipe/type&" + select.value, function (data) {
            console.log(select.value);
            console.log(data);
            console.log("Searching for recipe");
            searchResults(data);
        });
       
    }

}


        // //adding recipe
        // $(document).on("click", ".add_recipe", addRecipe);
        // function addRecipe() {
        //     event.preventDefault();
        //     var name = $('.recipe_name').val();
        //     console.log(name);

        //     var type = $('.type').val();
        //     console.log(type);

        //     var link = $('.recipe_link').val();
        //     console.log(link);

        //     let post = {
        //         name: name,
        //         status: 0,
        //         link: link,
        //         type: type
        //     }
        //     $.ajax("/api/recipe", {
        //         type: "POST",
        //         data: JSON.stringify(post),
        //         dataType: "json",
        //         contentType: 'application/json; charset=utf-8'
        //     }).then(function (data) {
        //         // populateModal();
        //         // console.log(data)
        //     });
        // }

        //TESTING FUNCTIONS [[[[[[[[DELETE LATER]]]]]]]]

        // //adding recipe
        // $(document).on("click", ".add_recipe", getValues);
        // function getValues() {
        //     event.preventDefault();
        //     var name = $('.recipe_name').val();
        //     console.log(name);

        //     var type = $('.type').val();
        //     console.log(type);

        //     var link = $('.recipe_link').val();
        //     console.log(link);
        // }

//         //search recipe name
//         $(document).on("click", ".search_name", getNameValues);
//         function getNameValues() {
//             event.preventDefault();
//             var name = $('.search_by_name').val();
//             console.log(name);
//         }

//         //search recipe by other
//         $(document).on("click", ".search_other", getOtherValues);
//         function getOtherValues() {
//             event.preventDefault();

//             var type = $('.search_by_type').val();
//             console.log(type);

//             console.log('Rating Func: ' + rating)
//         }
//     }
// }