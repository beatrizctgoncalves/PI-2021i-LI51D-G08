'use strict'

 const data = require('./igdb-data.js');
 const db = require('./covida-db.js');

 //All methods have a callback so the access to the api can be asynchronous

 //Implementation of the route to get a specific game by name which accesses to the api
function getGamesByName(game_name, processGetGamesByName) {
    data.getGamesByName(game_name, cb)

    function cb(statusCode, gameObj) {
        if(gameObj === "[]") {
            statusCode = 404
            var errorMessageObj = "The game you inserted doesnt exist. Please insert a valid Name!";
            processGetGamesByName(statusCode, errorMessageObj);
        } else {
            statusCode = 200
            processGetGamesByName(statusCode, gameObj);
        }
    }
}

//Implementation of the route to get a specific game by id which accesses to the api
function getGamesById(game_id, processGetGamesById) {
    data.getGamesById(game_id, cb);

    function cb(statusCode, gameObj) {
        if(JSON.stringify(gameObj) === "[]") {
            statusCode = 404
            var errorMessageObj = "The game you inserted doesnt exist. Please insert a valid ID!";
            processGetGamesById(statusCode, errorMessageObj);
        } else {
            statusCode = 200
            processGetGamesById(statusCode, gameObj)
        }
    }        
}

//Implementation of the route to create a group which accesses to the database
function createGroup(group_name, group_desc, processCreateGroup) {
    db.getGroupByName(group_name, processGetGroup);

    function processGetGroup(statusCode, groupObj) {
        if (!groupObj.length) {
            db.createGroup(group_name, group_desc, cb);
        } else {
            statusCode = 404;
            var errorMessageObj = {"error": "Group already exists"};
            processCreateGroup(statusCode, errorMessageObj);
        }
    }
    function cb(statusCode) {
        statusCode = 201
        processCreateGroup(statusCode, "Group created successfully");
    }
}

//Implementation of the route to get all groups which accesses to the database
function listGroups(processListGroups) {
    db.listGroups(cb)

    function cb(statusCode, groupObj) {
        if(JSON.stringify(groupObj) === "[]") {
            statusCode = 404;
            var errorMessageObj = {"error": "There are no groups on the database."};
            processListGroups(statusCode, errorMessageObj);
        } else {
            statusCode = 200;
            processListGroups(statusCode, groupObj);
        }
    }
}

//Implementation of the route to get a specific group which accesses to the database
function getGroupByName(group_name, processGetGroupByName) {
    db.getGroupByName(group_name, cb);

    function cb(statusCode, groupObj) {
        if(JSON.stringify(groupObj) === "[]") {
            statusCode = 404;
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processGetGroupByName(statusCode, errorMessageObj)
        } else {
            statusCode = 200;
            processGetGroupByName(statusCode, groupObj);
        }
    }
}

//Implementation of the route to add a game by name to a specific group which accesses to the database
function addGameByNameToGroup(game_name, group_name, processAddGameByNameToGroup){
    db.getGroupByName(group_name, processGetGroupByName);

    function processGetGroupByName(statusCode, groupObj) {
        if (groupObj.length) {
            data.getGamesByName(game_name, processGetGamesByName)

            function processGetGamesByName(statusCode, gameObj) {
                if(gameObj === "[]") {
                    statusCode = 404;
                    var errorMessageObj = {"error": "The game you inserted doesnt exist."};
                    processAddGameByNameToGroup(statusCode, errorMessageObj)
                } else {
                    db.addGameToGroup(gameObj, group_name, cb);
                }
            }
        } else {
            statusCode = 404;
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processAddGameByNameToGroup(statusCode, errorMessageObj);
        }
    }

    function cb(statusCode) {
        statusCode = 200
        processAddGameByNameToGroup(statusCode, "Game added successfully to the group!")
    }
}

//Implementation of the route to add a game by name to a specific group which accesses to the database
function addGameByIdToGroup(game_id, group_name, processAddGameByIdToGroup){
    db.getGroupByName(group_name, processGetGroupByName);

    function processGetGroupByName(statusCode, groupObj) {
        if (groupObj.length) {
            data.getGamesById(game_id, processGetGamesById)

            function processGetGamesById(statusCode, gameObj) {
                if(gameObj === "[]") {
                    statusCode = 404;
                    var errorMessageObj = {"error": "The game you inserted doesnt exist."};
                    processAddGameByIdToGroup(statusCode, errorMessageObj)
                } else {
                    db.addGameToGroup(gameObj, group_name, cb);
                }
            }
        } else {
            statusCode = 404;
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processAddGameByIdToGroup(statusCode, errorMessageObj);
        }
    }

    function cb(statusCode) {
        statusCode = 200
        processAddGameByIdToGroup(statusCode, "Game added successfully to the group!")
    }
}

//Implementation of the route to get a game between the given interval of values which accesses to both database and api
function getRatingsFromGames(group_name, max, min, processGetRatingsFromGames) {
    db.getGroupByName(group_name, processGetGroupByName);

    function processGetGroupByName(statusCode, groupObj) {
        if (groupObj.length) {
            if(min >=0 && max <= 100) {
                db.getRatingsFromGames(group_name, max, min, cb);

                function cb(statusCode, gameObj) {
                    if(JSON.stringify(gameObj) === "[]") {
                        statusCode = 404
                        var errorMessageObj = {"error": "The group you inserted doesnt have games."};
                        processGetRatingsFromGames(statusCode, errorMessageObj)
                    } else {
                        statusCode = 200
                        processGetRatingsFromGames(statusCode, gameObj)
                    }
                }
            } else {
                statusCode = 404
                let errormessageObj= {"error" :"Interval is not within a possible range"}
                processGetRatingsFromGames(statusCode, errormessageObj)
            }
        } else {
            statusCode = 404
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processGetRatingsFromGames(statusCode, errorMessageObj);
        }
    }
}

//Implementation of the route to update a specific group which accesses to the database
function editGroup(old_name, new_name, new_desc, processEditGroup) {
    db.getGroupByName(old_name, processGetGroupWithName);

    function processGetGroupWithName(statusCode, groupObj) {
        if (groupObj.length) {
            db.editGroup(old_name, new_name, new_desc, cb);
        } else {
            statusCode = 404
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processEditGroup(statusCode, errorMessageObj);
        }
    }
    function cb(statusCode) {
        statusCode = 200
        processEditGroup(statusCode, "Group edited successfully!")
    }
}

//Implementation of the route to delete a specific game which accesses to the database
function removeGameById(group_name, game_id, processRemoveGameById) {
    db.getGroupByName(group_name, processGetGroupByName);

    function processGetGroupByName(statusCode, groupObj) {
        if (groupObj.length) {
            db.removeGameById(group_name, game_id, cb)

            function cb(statusCode, gameObj) {
                if(JSON.stringify(gameObj) === "[]") {
                    statusCode = 404
                    var errorMessageObj = {"error": "The game you inserted doesnt exist in this group."};
                    processRemoveGameById(statusCode, errorMessageObj)
                } else {
                    statusCode = 200
                    processRemoveGameById(statusCode, "Game deleted successfully!");
                }
            }
        } else {
            statusCode = 404
            var errorMessageObj = {"error": "The group you inserted doesnt exist."};
            processRemoveGameById(statusCode, errorMessageObj);
        }
    }
}

module.exports = {
    getGamesByName: getGamesByName,
    getGamesById: getGamesById,

    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByName: getGroupByName,
    addGameByNameToGroup: addGameByNameToGroup,
    addGameByIdToGroup: addGameByIdToGroup,

    getRatingsFromGames: getRatingsFromGames,
    editGroup: editGroup,
    removeGameById: removeGameById,
}
