'use strict'

const { listGroups } = require('./covida-db.js');
const serv  = require('./covida-services.js');

function webApiCreate(app) {
    const wa = {
        /*getGamesWithName: function(req, res) {
            console.log("Specific Game")
            serv.getGamesWithName(req.params.game_name, processGetGamesWithName);

            function processGetGamesWithName(err, gamesObj) {
                res.statusCode = 200;
                res.end(gamesObj)                
            } //TODO treat errors
        },*/
        getGamesWithName : function(req,res) {
            console.log("Specific Game")
            serv.getGamesWithName(req.params.game_name, (err,resp) => process(err,resp,res))
        },

        createGroup: function(req, res) {
            console.log("Create Group")
            serv.createGroup(req.body.name, req.body.desc, processCreateGroup);

            function processCreateGroup(err, createdMessageObj) {
                if(createdMessageObj.error) res.statusCode = 403; //Forbidden
                    else res.statusCode = 201;
                res.end(JSON.stringify(createdMessageObj))
            } //TODO treat errors
        },

        listGroups: function(req,res) {
            console.log("List Groups")
            serv.listGroups((err,resp) => process(err,resp,res));
          
          /*  serv.listGroups(processListGroups);
            function processListGroups(err, groupListObj) {
                if(err == null) {
                    res.statusCode = 200 //OK
                } //TODO treat errors
                res.end(JSON.stringify(groupListObj))
            }*/
        },

        getGroupWithName: function(req, res) {
            console.log("Specific Group")
            serv.getGroupWithName(req.params.group_name,(err,resp) => process(err,resp,res));
          
          /*  serv.getGroupWithName(req.params.group_name, processGetGroupWithName);
            function processGetGroupWithName(err, groupObj) {
                res.statusCode = 200;
                res.end(JSON.stringify(groupObj))                
            } //TODO treat errors*/
        },

        addGameToGroup : function(req,res) {
            console.log("Add Game to Group")
            serv.addGameToGroup(req.params.group_name,req.params.game_name,(err,resp) => process(err,resp,res))

            /*serv.addGameToGroup(req.params.group_name,req.params.game_name, processPutGameToGroup)
            function processPutGameToGroup(err, x){
                res.statusCode = 200;
                res.end(JSON.stringify(x))
            }*/
        }
    }


    app.get('/games/:game_name', wa.getGamesWithName)
    app.post('/groups', wa.createGroup)
    app.get('/groups',wa.listGroups)
    app.get('/groups/:group_name',wa.getGroupWithName)
    app.put(`/groups/:group_name/games/:game_name`, wa.addGameToGroup)

    return wa;
}
function process(err,resp,res){
    if(err){
        responseHandler(err.statusCode, err.body, res)
    }
    else{
        responseHandler(resp.statusCode,resp,res)
    }   
  }

function responseHandler(statusCode,resp,res){
    res.statusCode = 200 //supostamente devia receber o statusCode mas quando vamos buscar à api não sei como retornar o statusCode porque só retornamos a data
    res.end(JSON.stringify(resp))
}  

module.exports = webApiCreate