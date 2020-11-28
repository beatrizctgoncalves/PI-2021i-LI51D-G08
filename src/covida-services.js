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
            var errorMessageObj = {"error": "Group already exists"};
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
        if(JSON.stringify(groupObj) === "[]") {
            var errorMessageObj = {"error": "Bad request: there are no groups on the database."};
            processListGroups(err, errorMessageObj)
        } else {
            processListGroups(err, groupObj);
        }
    }
}

function getGroupWithName(group_name, processGetGroupWithName) {
    db.getGroupWithName(group_name, cb);

    function cb(err, groupObj) {
        if(JSON.stringify(groupObj) === "[]") {
            var errorMessageObj = {"error": "Bad request: the group you inserted doesnt exist."};
            processGetGroupWithName(err, errorMessageObj)
        } else {
            processGetGroupWithName(err, groupObj);
        }
    }
}

function addGameToGroup(game_name, group_name, processAddGameToGroup){
    db.getGroupWithName(group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            data.getGamesWithName(game_name, processGetGamesWithName)

            function processGetGamesWithName(err, gameObj) {
                if(gameObj === "[]") {
                    var errorMessageObj = {"error": "Bad request: the game you inserted doesnt exist."};
                    processAddGameToGroup(err, errorMessageObj)
                } else {
                    db.addGameToGroup(gameObj, group_name, cb);
                }
            }
        } else {
            var errorMessageObj = {"error": "Bad request: The group you inserted doesnt exist."};
            processAddGameToGroup(err, errorMessageObj);
        }
    }

    function cb(err) {
        processAddGameToGroup(err, "Game added successfully to the group!")
    }
}

function editGroup(old_name, new_name, new_desc, processEditGroup) {
    db.getGroupWithName(old_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            db.editGroup(old_name, new_name, new_desc, cb);
        } else {
            var errorMessageObj = {"error": "Bad request: The group you inserted doesnt exist."};
            processEditGroup(err, errorMessageObj);
        }
    }
    function cb(err) {
        processEditGroup(err, "Group edited successfully!")
    }
}

function removeGame(group_name, game_name, processRemoveGame) {
    db.getGroupWithName(group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            db.removeGame(group_name, game_name, cb)

            function cb(err, gameObj) {
                if(JSON.stringify(gameObj) === "[]") {
                    var errorMessageObj = {"error": "Bad request: the game you inserted doesnt exist in this group."};
                    processRemoveGame(err, errorMessageObj)
                } else {
                    processRemoveGame(err, "Game deleted successfully!");
                }
            }
        } else {
            var errorMessageObj = {"error": "Bad request: The group you inserted doesnt exist."};
            processRemoveGame(err, errorMessageObj);
        }
    }
}

//ITS WRONG
function getRatingsFromGames(group_name, max, min, processGetRatingsFromGames) {
    db.getGroupWithName(group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            if(min >=0 && max <= 100) {
                db.getRatingsFromGames(group_name, max, min, cb);

                function cb(err, gameObj) {
                    if(JSON.stringify(gameObj) === "[]") {
                        var errorMessageObj = {"error": "Bad request: the group you inserted doesnt have games."};
                        processGetRatingsFromGames(err, errorMessageObj)
                    } else {
                        processGetRatingsFromGames(err,JSON.stringify(gameObj))
                    }
                }
            } else {
                let errormessageObj= {"error" :" Interval is not within a possible range"}
                processGetRatingsFromGames(null, errormessageObj)
            }
        } else {
            var errorMessageObj = {"error": "Bad request: The group you inserted doesnt exist."};
            processGetRatingsFromGames(err, errorMessageObj);
        }
    }
}

module.exports = {
    getGamesWithName: getGamesWithName,
    createGroup: createGroup,
    listGroups:listGroups,
    getGroupWithName:getGroupWithName,
    addGameToGroup: addGameToGroup,
    editGroup: editGroup,
    removeGame: removeGame,
    getRatingsFromGames: getRatingsFromGames
}
