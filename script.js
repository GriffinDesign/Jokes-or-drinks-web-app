$(document).ready(function () {
  let funFact = document.getElementById("fun-fact-text")
  let startBtn = document.getElementsByClassName("start-button")
  let welcomeText = document.getElementsByClassName(".welcome-text")
  let dadJokeBtn = "<button class=\"dad-joke-button\">I need a dad joke</button>"
  function factFetch() {
      const funFactAPI = "https://asli-fun-fact-api.herokuapp.com/"
      fetch(funFactAPI)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              console.log(data.data.fact);
              $(funFact).text(data.data.fact);

          })
  }

})
/*var funFactAPI = "https://asli-fun-fact-api.herokuapp.com/";
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
  */