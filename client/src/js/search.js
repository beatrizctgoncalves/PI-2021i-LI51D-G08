const global = require('./global.js');
const api = require('./covida-api.js');

const handlebars = global.handlebars;
const modListContentsTemplate =
    handlebars.compile(global.gamesTemplate());

module.exports = {
    getView: () => 
        `<h1>Search Results</h1>
		<div id='results'></div>`,
    
    authenticationRequired: false,

    run: (request) => {
        const itemsContainer = document.querySelector('#results');
        const game = request.args[0];

        api.searchGamesByName(game)
        .then(gameResult => {
            console.log("LLLLLLLLLLLLLL")
            itemsContainer.innerHTML = modListContentsTemplate({
                games: gameResult
            })
        })
        .catch((error) => { //when there's an error it doesn't catch it
            console.log("KKKKKKKKKKKKKKKKKKKKKKKKKK")
            console.log(error.error)
            if(error.error == "Could not find game!") return itemsContainer.innerHTML = global.noResultsTemplate();
            else return itemsContainer.innerHTML = global.errorTemplate(error.body)
        })
    }
}