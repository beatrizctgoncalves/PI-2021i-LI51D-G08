module.exports = (CovidaGamesData, CovidaDB) => {
    return {
        getAllGames: getAllGames,
        getGame: getGame,
        getAllGroups: getAllGroups,
        getGroup: getGroup,
        getGamesBetweenMaxMin: getGamesBetweenMaxMin,
        createGroup: createGroup,
        updateGroup: updateGroup,
        addGameToGroup: addGameToGroup,
    }
 
    function getAllGames(queryOrderBy, callback) {
        CovidaGamesData.getAllGames(queryOrderBy, (err, games) => callback(err, games))
    }

    function getGame(gameID, callback) {
        //TODO
    }

    function getAllGroups(callback) {
        //TODO
    }

    function getGroup(groupID, callback) {
        //TODO
    }

    function createGroup( /*groupID,*/ bodyName, bodyDescription, bodyGame, callback) {
        //TODO
    }

    function getGamesBetweenMaxMin(groupID, queryMinPlayTime, queryMaxPlayTime, callback) {
        //TODO
    }

    function updateGroup(groupID, bodyName, bodyDescription, callback) {
        //TODO
    }

    function addGameToGroup(groupID, gameId, callback) {
        //TODO
    }
};