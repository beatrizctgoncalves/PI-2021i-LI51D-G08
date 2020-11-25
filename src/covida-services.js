'use strict'

 const data = require('./igdb-data');
 const db = require('./covida-db');

function getMostPopularGames(processGetPopularGames) {
    return data.getMostPopularGames(processGetPopularGames)
}


module.exports = {
    getMostPopularGames : getMostPopularGames
}
