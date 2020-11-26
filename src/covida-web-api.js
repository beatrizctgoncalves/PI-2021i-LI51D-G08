'use strict'

const serv  = require('./covida-services.js');

function webApiCreate(app) {
    const wa = {
        getGamesWithName: function(req, res) {
            console.log("Specific Game")
            serv.getGamesWithName(req.params.game_name, processGetGamesWithName);

            function processGetGamesWithName(err, gamesObj) {
                res.statusCode = 200;
                res.end(gamesObj)                
            }
        }
    }

    app.get('/games/:game_name', wa.getGamesWithName);
   
    return wa;
}

module.exports = webApiCreate