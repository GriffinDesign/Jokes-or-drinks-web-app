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

