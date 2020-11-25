'use strict'

function webApiCreate(app, services) {
    const wa = {
        getMostPopularGames: function(req, res) {
            console.log("Most Popular Games")
            services.getMostPopularGames(processGetPopularGames);

            function processGetPopularGames(err, popularGamesObj) {
            rsp.statusCode = 200;
            rsp.end(JSON.stringify(popularGamesObj))
            }
        }
    }

    app.get('/games', wa.getMostPopularGames);
   
    return wa;
}


module.exports = webApiCreate