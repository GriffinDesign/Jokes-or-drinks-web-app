var funFactAPI = "https://asli-fun-fact-api.herokuapp.com/";
var dadJokeAPI = "https://icanhazdadjoke.com";
var cocktailAPI = "https://thecocktaildb.com/api/json/v1/1/random.php";

fetch(funFactAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch(dadJokeAPI, {
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }
})
  .then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
})



fetch(cocktailAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//--------------//
// Drink Recipe
//--------------//

let recipesDiv = $("#recipes")
let drinkName = $(".cocktailPic")
let localStorageObj = []
let favoriteList = $(".favoriteList")

//query select html elements
let getApi = function(){
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
                for (var i = 0; i < ingredientArray.length; i++){
                    
                    $("<li>").text(ingredientArray[i]).appendTo(ingredientList)
                     console.log(data)
                }

            })
        }
    
// drink name

let getDrink = function(data){
    let cocktailName = (data.drinks[0].strDrink)
    localStorageObj.push(cocktailName)
    $("<h2>").text(cocktailName).attr('class','drinkName').appendTo(recipesDiv)
}

// drink image

let getImage = function(data){
    let cocktailImage =(data.drinks[0].strDrinkThumb)
    
    localStorageObj.push(cocktailImage)
    $("#cocktailPic").attr('src',cocktailImage)
}

//drink recipe

let fetchIngredientArray = function(data){
    let ingredientArray = []

    for (var i = 1; i <= 15; i++){
    let cocktailRecipe = (data.drinks[0][`strIngredient${i}`])
    if (cocktailRecipe){
        ingredientArray.push(cocktailRecipe)
        localStorageObj.push(cocktailRecipe)
    }}

    return ingredientArray
}

getApi()

// save favorite

let favoriteBtn = $(".btn")
favoriteBtn.on('click', function(){

    let localStorageFavorite = JSON.parse(localStorage.getItem('favorite')) || []
    
    localStorageFavorite.push(localStorageObj)
    // console.log(localStorageFavorite[0])
    
    localStorage.setItem('favorite', JSON.stringify(localStorageFavorite))
    // localStorage.setItem('myObj',myObjString)
    console.log(localStorage)
   
})


let showFavoriteDrink = $('.showFavorite')

showFavoriteDrink.on('click', function(){
    
    $(".cocktailDiv").addClass("hide")
  
    let savedFavorite = JSON.parse(localStorage.getItem('ingredientArray'))

    $("<h2>").text(savedFavorite).attr('id','favoriteList').appendTo(favoriteList)
})

