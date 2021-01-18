const global = require('./global.js');
const api = require('./covida-api.js');
const statusCode = require('./covida-status.js');

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

        return api.searchGamesByName(game)
        .then(gameResult => {
            console.log(gameResult)
            if(!gameResult.error) {
                itemsContainer.innerHTML = modListContentsTemplate({
                    games: gameResult
                })
            } else {
                return Promise.reject(gameResult.error);
            }
        })
        .catch((error) => {
            if(error.status == statusCode.NOT_FOUND) {
                return itemsContainer.innerHTML = global.noResultsTemplate();
            } else return itemsContainer.innerHTML = global.errorTemplate(error.body);
        })
    }
}