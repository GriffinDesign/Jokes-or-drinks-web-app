let startBtn = $(".start-button");
let welcomeText = $(".welcome-text");
let funFact = $(".fun-fact-text");
let dadJokeBtn = $(".needs-dad-joke");
let dadJokeText = $(".dad-joke-text")
let noBtn = $(".no-button")



//--------------//
// Drink Recipe
//--------------//

let recipesDiv = $("#recipes")
let drinkName = $(".cocktailPic")
let localStorageObj = []
let favoriteList = $(".favoriteList")


//query select html elements
let getApi = function () {
  let cocktailAPI = "https://thecocktaildb.com/api/json/v1/1/random.php";

  fetch(cocktailAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      getDrink(data)
      getImage(data)
      let ingredientArray = fetchIngredientArray(data)
      let ingredientList = $("<ul>").appendTo(recipesDiv)
      for (var i = 0; i < ingredientArray.length; i++) {

        $("<li>").text(ingredientArray[i]).appendTo(ingredientList)
        // console.log(data)
      }

    })
}

// drink name

let getDrink = function (data) {
  let cocktailName = (data.drinks[0].strDrink)
  localStorageObj.push(cocktailName)
  $("<h2>").text(cocktailName).attr('class', 'drinkName').appendTo(recipesDiv)
}

// drink image

let getImage = function (data) {
  let cocktailImage = (data.drinks[0].strDrinkThumb)

  localStorageObj.push(cocktailImage)
  $("#cocktailPic").attr('src', cocktailImage)
}

//drink recipe

let fetchIngredientArray = function (data) {
  let ingredientArray = []

  for (var i = 1; i <= 15; i++) {
    let cocktailRecipe = (data.drinks[0][`strIngredient${i}`])
    if (cocktailRecipe) {
      ingredientArray.push(cocktailRecipe)
      localStorageObj.push(cocktailRecipe)
    }
  }

  return ingredientArray
}

// display cocktail recipe

let displayCocktail = $('.display-cocktial')

displayCocktail.on('click', function(){
  getApi();
  $(displayCocktail).text('Show me another recipe')


})

// save favorite

let favoriteBtn = $(".btn")
favoriteBtn.on('click', function () {

  let localStorageFavorite = JSON.parse(localStorage.getItem('favorite')) || []

  localStorageFavorite.push(localStorageObj)
  // console.log(localStorageFavorite[0])

  localStorage.setItem('favorite', JSON.stringify(localStorageFavorite))
  // localStorage.setItem('myObj',myObjString)
  console.log(JSON.parse(localStorage.favorite)[0])

})


let showFavoriteDrink = $('.showFavorite')

showFavoriteDrink.on('click', function () {

  let getFavorite = JSON.parse(localStorage.getItem('favorite'))
  let favUl = $("<ul>").appendTo(favoriteList)
  $("<li>").text(getFavorite).appendTo(favUl)

})

 //------------------------//


$(document).ready(function () {

  function factFetch() {
    const funFactAPI = "https://asli-fun-fact-api.herokuapp.com/"
    fetch(funFactAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.data.fact);
        $(funFact).prepend()
        $(funFact).text(data.data.fact);


      })
    }

    $(startBtn).on("click", function () {
      factFetch();
      $(welcomeText).remove();
      $(noBtn).remove();
      $(startBtn).text("Show another fact!");
    })

    $(dadJokeBtn).on("click", function () {
      dadJokeFetch();
      $(dadJokeBtn).text("Show another dad joke!");

    })

    function dadJokeFetch() {
      const dadJokeAPI = "https://icanhazdadjoke.com";
      fetch(dadJokeAPI, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          $(dadJokeText).text(data.joke)

        })
    }
  })