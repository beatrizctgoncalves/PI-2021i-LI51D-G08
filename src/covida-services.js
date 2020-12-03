'use strict'

 const data = require('./igdb-data.js');
 const db = require('./covida-db.js');

 //All methods have a callback so the access to the api can be asynchronous

 //Implementation of the route to get a specific game which accesses to the api
function getGamesWithName(game_name, processGetGamesWithName) {
    data.getGamesWithName(game_name, cb)

    function cb(err, gameObj) {
        if(gameObj === "[]") {
            var errorMessageObj = "The game you inserted doesnt exist.";
            processGetGamesWithName(err, errorMessageObj)
        } else {
            processGetGamesWithName(err, gameObj);
        }
    }
}

//Implementation of the route to create a group which accesses to the database
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

//Implementation of the route to get all groups which accesses to the database
function listGroups(processListGroups) {
    db.listGroups(cb)

    function cb(err,groupObj) {
        if(JSON.stringify(groupObj) === "[]") {
            var errorMessageObj = {"error": "There are no groups on the database."};
            processListGroups(err, errorMessageObj)
        } else {
            processListGroups(err, groupObj);
        }
    }
}

//Implementation of the route to get a specific group which accesses to the database
function getGroupWithName(group_name, processGetGroupWithName) {
    db.getGroupWithName(group_name, cb);

    function cb(err, groupObj) {
        if(JSON.stringify(groupObj) === "[]") {
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processGetGroupWithName(err, errorMessageObj)
        } else {
            processGetGroupWithName(err, groupObj);
        }
    }
}

//Implementation of the route to add a game to a specific group which accesses to the database
function addGameToGroup(game_name, group_name, processAddGameToGroup){
    db.getGroupWithName(group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            data.getGamesWithName(game_name, processGetGamesWithName)

            function processGetGamesWithName(err, gameObj) {
                if(gameObj === "[]") {
                    var errorMessageObj = {"error": "The game you inserted doesnt exist."};
                    processAddGameToGroup(err, errorMessageObj)
                } else {
                    db.addGameToGroup(gameObj, group_name, cb);
                }
            }
        } else {
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processAddGameToGroup(err, errorMessageObj);
        }
    }

    function cb(err) {
        processAddGameToGroup(err, "Game added successfully to the group!")
    }
}

//Implementation of the route to get a game between the given interval of values which accesses to both database and api
function getRatingsFromGames(group_name, max, min, processGetRatingsFromGames) {
    db.getGroupWithName(group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            if(min >=0 && max <= 100) {
                db.getRatingsFromGames(group_name, max, min, cb);

                function cb(err, gameObj) {
                    if(JSON.stringify(gameObj) === "[]") {
                        var errorMessageObj = {"error": "The group you inserted doesnt have games."};
                        processGetRatingsFromGames(err, errorMessageObj)
                    } else {
                        processGetRatingsFromGames(err, gameObj)
                    }
                }
            } else {
                let errormessageObj= {"error" :"Interval is not within a possible range"}
                processGetRatingsFromGames(null, errormessageObj)
            }
        } else {
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processGetRatingsFromGames(err, errorMessageObj);
        }
    }
}

//Implementation of the route to update a specific group which accesses to the database
function editGroup(old_name, new_name, new_desc, processEditGroup) {
    db.getGroupWithName(old_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            db.editGroup(old_name, new_name, new_desc, cb);
        } else {
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processEditGroup(err, errorMessageObj);
        }
    }
    function cb(err) {
        processEditGroup(err, "Group edited successfully!")
    }
}

//Implementation of the route to delete a specific game which accesses to the database
function removeGame(group_name, game_name, processRemoveGame) {
    db.getGroupWithName(group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if (groupObj.length) {
            db.removeGame(group_name, game_name, cb)

            function cb(err, gameObj) {
                if(JSON.stringify(gameObj) === "[]") {
                    var errorMessageObj = {"error": "The game you inserted doesnt exist in this group."};
                    processRemoveGame(err, errorMessageObj)
                } else {
                    processRemoveGame(err, "Game deleted successfully!");
                }
            }
        } else {
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processRemoveGame(err, errorMessageObj);
        }
    }
}

module.exports = {
    getGamesWithName: getGamesWithName,

    createGroup: createGroup,
    listGroups:listGroups,
    getGroupWithName:getGroupWithName,
    addGameToGroup: addGameToGroup,

    getRatingsFromGames: getRatingsFromGames,
    editGroup: editGroup,
    removeGame: removeGame,
}
