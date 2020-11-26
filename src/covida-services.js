'use strict'

 const data = require('./igdb-data');
 const db = require('./covida-db');

function getGamesWithName(game_name, processGetGamesWithName) {
    data.getGamesWithName(game_name, processGetGamesWithName)
}


module.exports = {
    getGamesWithName : getGamesWithName
}
