$(document).ready(function () {
  let startBtn = $(".start-button");
  let welcomeText = $(".welcome-text");
  let funFact = $(".fun-fact-text");
  let dadJokeBtn = $(".needs-dad-joke");
  let dadJokeText = $(".dad-joke-text")
  let noBtn = $(".no-button")
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
})