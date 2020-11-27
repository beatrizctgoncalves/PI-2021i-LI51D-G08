'use strict'

 const data = require('./igdb-data.js');
 const db = require('./covida-db.js');

function getGamesWithName(game_name, processGetGamesWithName) {
    data.getGamesWithName(game_name, cb)

    function cb(err, gameObj) {
        if(gameObj === "[]") {
            var errorMessageObj = "Bad request: the game you inserted doesnt exist.";
            processGetGamesWithName(err, errorMessageObj)
        } else {
            processGetGamesWithName(err, gameObj);
        }
    }
}

function createGroup(group_name, group_desc, processCreateGroup) {
    db.getGroupWithName(group_name, processGetGroup);

    function processGetGroup(err, groupObj) {
        if (!groupObj.length) {
            db.createGroup(group_name, group_desc, cb);
        } else {
            errorMessageObj = {"error": "Group already exists"};
            processCreateGroup(err, errorMessageObj);
        }
    }
    function cb(err) {
        processCreateGroup(err, "Group created successfully");
    }
}

function listGroups(processListGroups) {
    db.listGroups(cb)
    function cb(err,groupObj) {
        processListGroups(err,groupObj)
    }
}

function getGroupWithName(group_name, processGetGroupWithName) {
    db.getGroupWithName(group_name, cb);

    function cb(err, groupObj) {
        processGetGroupWithName(err, groupObj)
    }
}

function addGameToGroup(game_name, group_name, processAddGameToGroup){
    db.getGroupWithName(group_name, processGetGroup);

    function processGetGroup(err, groupObj) {
        if (groupObj.length) {
            db.addGameToGroup(game_name, group_name, cb);
        } else {
            var errorMessageObj = {"error": "Bad request: The group you inserted doesnt exist."};
            processAddGameToGroup(err, errorMessageObj);
        }
    }
    function cb(err) {
        processAddGameToGroup(err, "Game added successfully to the group!")
    }
}

function editGroup(old_name,new_name,new_desc,processEditGroup) {
    db.getGroupWithName(old_name,cb)

    function cb(err,groupObj) {
        processEditGroup(err,groupObj)
    }
}

function removeGame(group_name,game_name,processRemoveGame) {
    db.removeGame(group_name,game_name,cb)

    function cb(err,gameObj) {
        processRemoveGame(err,gameObj)
    }
}
module.exports = {
    getGamesWithName: getGamesWithName,
    createGroup: createGroup,
    listGroups:listGroups,
    getGroupWithName:getGroupWithName,
    addGameToGroup: addGameToGroup,
    editGroup: editGroup,
    removeGame:removeGame
}
