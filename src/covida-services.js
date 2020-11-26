'use strict'

 const data = require('./igdb-data');
 const db = require('./covida-db');

function getMostPopularGames(processGetPopularGames) {
    data.getMostPopularGames(processGetPopularGames)
}

function getGamesWithName(game_name, processGetGamesWithName) {
    data.getGamesWithName(game_name, processGetGamesWithName)
}

module.exports = {
    getMostPopularGames : getMostPopularGames,
    getGamesWithName : getGamesWithName
}
