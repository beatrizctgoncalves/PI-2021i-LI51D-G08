'use strict'

const serv  = require('./covida-services.js');

function webApiCreate(app) {
    const wa = {
        getMostPopularGames: function(req, res) {
            console.log("Most Popular Games")
            serv.getMostPopularGames(processGetPopularGames);

            function processGetPopularGames(err, popularGamesObj) {
            rsp.statusCode = 200;
            rsp.end(JSON.stringify(popularGamesObj))
            }
        },

        getGamesWithName: function(req, res) {
            console.log("Specific Game")
            serv.getGamesWithName(req.params.game_name, processGetGamesWithName);

            function processGetGamesWithName(err, gamesObj) {
                rsp.statusCode = 200;
                rsp.end(JSON.stringify(gamesObj))
            }
        }
    }

    app.get('/games', wa.getMostPopularGames);
    app.get('/games/:game_name', wa.getGamesWithName);
   
    return wa;
}

module.exports = webApiCreate