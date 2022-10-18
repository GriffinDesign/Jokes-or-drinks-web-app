$(document).ready(function () {
  let startBtn = document.getElementsByClassName("start-button")
  let welcomeText = document.getElementsByClassName(".welcome-text")
  let funFact = document.getElementsByClassName("fun-fact-text");
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
    $(startBtn).text("Show another fact!");
})
})