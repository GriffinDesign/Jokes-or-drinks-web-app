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

  $(startBtn).on("click", function () {
      factFetch();
      $(welcomeText).remove();
      $(startBtn).text("Show another fact!");
      $("#fun-fact-container").append(dadJokeBtn);


  })
  $(dadJokeBtn).live("click", function(){
    console.log("dad joke me")
   // window.location.href=("\dad-jokes\dad-joke.html")
 })

})