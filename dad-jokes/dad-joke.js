$(document).ready(function () {
    var dadJokeAPI = "https://icanhazdadjoke.com";
    var dadJoke = document.getElementById("dad-joke-text");
    var newDadJoke = document.getElementsByClassName("dad-joke-button")
    var toCocktails = "<button class=\"cocktail-button\">Jokes aren't cutting it</button>"

    $(newDadJoke).on("click", function () {
        location.reload();
    })

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
            $(dadJoke).text(data.joke)
            $(".container-for-cocktails-button").append(toCocktails)

        })

})

