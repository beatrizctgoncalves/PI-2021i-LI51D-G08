module.exports = () => {
    return {
        getAllGames: getAllGames,
        getGame: getGame
    }

    function getAllGames(queryOrderBy, callback) {
        const games = game
        if (!games)
            return callback({
                code: 404
            })
        callback(null, games)
    }

    function getGame(gameId, callback) {
        //TODO
    }
}

const game = {
    //TODO
};

