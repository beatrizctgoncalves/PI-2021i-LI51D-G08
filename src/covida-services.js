'use strict'

 const data = require('./igdb-data.js');
 const db = require('./covida-db.js');

function getGamesWithName(game_name, processGetGamesWithName) {
    data.getGamesWithName(game_name, processGetGamesWithName)
}

function createGroup(group_name, group_desc, processGetGroup) {
    db.getGroupByName(group_name, processGetGroup);

    function processGetGroup(err, groupObj) {
        if (groupObj == null) {
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

module.exports = {
    getGamesWithName: getGamesWithName,
    createGroup: createGroup
}
