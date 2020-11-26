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
        },

        createGroup: function(req, res) {
            console.log("Create Group")
            serv.createGroup(req.body.name, req.body.desc, processCreateGroup);

            function processCreateGroup(err, createdMessageObj) {
                if(createdMessageObj.error) res.statusCode = 403; //Forbidden
                    else res.statusCode = 201;
                res.end(JSON.stringify(createdMessageObj))
            }
        }
    }

    app.get('/games/:game_name', wa.getGamesWithName);
    app.post('/groups', wa.createGroup);
   
    return wa;
}

module.exports = webApiCreate