'use strict'

const { listGroups } = require('./covida-db.js');
const serv  = require('./covida-services.js');

function webApiCreate(app) {
    const wa = {
        getGamesWithName: function(req, res) {
            console.log("Specific Game")
            serv.getGamesWithName(req.params.game_name, processGetGamesWithName);

            function processGetGamesWithName(err, gamesObj) {
                if(gamesObj.error) {
                    res.statusCode = 400;
                } else {
                    res.statusCode = 200;
                }
                res.end(gamesObj)
            }
        },

        createGroup: function(req, res) {
            console.log("Create Group")
            serv.createGroup(req.body.name, req.body.desc, processCreateGroup);

            function processCreateGroup(err, createdMessageObj) {
                if(createdMessageObj.error) {
                    res.statusCode = 403; //Forbidden
                } else {
                    res.statusCode = 201;
                }
                res.end(JSON.stringify(createdMessageObj))
            } 
        },

        listGroups: function(req,res) {
            console.log("List Groups")
            serv.listGroups(processListGroups);

            function processListGroups(err, groupListObj) {
                if(err == null) {
                    res.statusCode = 200 //OK
                } //TODO treat errors
                res.end(JSON.stringify(groupListObj))
            }
        },

        getGroupWithName: function(req, res) {
            console.log("Specific Group")
            serv.getGroupWithName(req.params.group_name, processGetGroupWithName);

            function processGetGroupWithName(err, groupObj) {
                res.statusCode = 200;
                res.end(JSON.stringify(groupObj))                
            } //TODO treat errors
        },

        addGameToGroup : function(req,res) {
            console.log("Add Game to Group")
            serv.addGameToGroup(req.params.game_name, req.params.group_name, processAddGameToGroup)

            function processAddGameToGroup(err, groupObj){
                res.statusCode = 200;
                res.end(JSON.stringify(groupObj))
            }
        }
    }

    app.get('/games/:game_name', wa.getGamesWithName);
    app.post('/groups', wa.createGroup);
    app.get('/groups', wa.listGroups);
    app.get('/groups/:group_name', wa.getGroupWithName);
    app.put(`/groups/:group_name/games/:game_name`, wa.addGameToGroup)

    return wa;
}

module.exports = webApiCreate