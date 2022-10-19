let startBtn = $(".start-button");
let welcomeText = $(".welcome-text");
let funFact = $(".fun-fact-text");
let dadJokeBtn = $(".needs-dad-joke");
let dadJokeText = $(".dad-joke-text")
let noBtn = $(".no-button")
let congrats = $(".congrats")


$(congrats).on("click", function () {
  $(congrats).text("Well, congrats! 🎉");

})


//--------------//
// Drink Recipe
//--------------//

let recipesDiv = $(".recipes")
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
      console.log(data)
      let id = getDrink(data)
      let img = getImage(data)
      let link = getLink(data)
      let ingredientArray = fetchIngredientArray(data)
      let ingredientList = $("<ul>").appendTo(recipesDiv)

      let drinkInfo = [id, img, link, ingredientArray]
      localStorageObj.push(drinkInfo)
      for (var i = 0; i < ingredientArray.length; i++) {

        $("<li>").text(ingredientArray[i]).appendTo(ingredientList)
        
      }

    })
}
// 
function getLink(data) {

  let drinkId = (data.drinks[0].idDrink)
  
  console.log(localStorageObj)
  return drinkId
}

// drink name

let getDrink = function (data) {
  let cocktailName = (data.drinks[0].strDrink)
  
  $("<h2>").text(cocktailName).attr('class', 'drinkName').appendTo(recipesDiv)
  return cocktailName
}

// drink image

let getImage = function (data) {
  let cocktailImage = (data.drinks[0].strDrinkThumb)
  $(".cocktailPic").attr('src', cocktailImage)
  $('.cocktailPic').attr('alt',`A picture of ${data.drinks[0].strDrink}`)
  return cocktailImage
}

//drink recipe

let fetchIngredientArray = function (data) {
  let ingredientArray = []

  for (var i = 1; i <= 15; i++) {
    let cocktailRecipe = (data.drinks[0][`strIngredient${i}`])
    if (cocktailRecipe) {
      ingredientArray.push(cocktailRecipe)
      
    }
  }
  return ingredientArray
}

// display cocktail recipe

let displayCocktail = $('.display-cocktial')

displayCocktail.on('click', function () {

  getApi();
  $(displayCocktail).text('Show me another recipe')

  
})

// save favorite

let favoriteBtn = $(".favBtn")
favoriteBtn.on('click', function () {

  let localStorageFavorite = JSON.parse(localStorage.getItem('favorite')) || []

  localStorageFavorite.push(localStorageObj)
  // console.log(localStorageFavorite[0])

  localStorage.setItem('favorite', JSON.stringify(localStorageFavorite))

  /*
    something about adding information to localstorage is not working correctly
    at the moment, the information about all the drinks are added to one another
    it should look like this:
    localStorage = [
      ["long island ice tea", '12345', [ingredient 1, inggedient 2]],
      ['negroni', '54313', ['ingredient 1', 'ingredient 2]]
    ]

  */

})

let showFavoriteDrink = $('.showFavorite')

showFavoriteDrink.on('click', function () {

  let getFavorite = JSON.parse(localStorage.getItem('favorite'))

  // set get favoriet to the last item to local storage

  getFavorite = getFavorite.pop()
  console.log(getFavorite, "getFav")

  for (var i = 0; getFavorite.length - 1; i++) {

    let savedCocktail = getFavorite[i][0]

    let favUl = $(".list-drink")

    let newName = savedCocktail.replace(/\s+/g, '-')


    favUl.append(`<li><a href ="https://thecocktaildb.com/drink/${getFavorite[i][2]}-${newName}">` + savedCocktail + '</a></li>')

  }

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