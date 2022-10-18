$(document).ready(function () {
  let startBtn = $(".start-button")
  let welcomeText = $(".welcome-text")
  let funFact = $(".fun-fact-text");
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