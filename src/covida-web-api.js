const server = require('./covida-services')
const parse = require('url').parse

module.exports = {
    getAllGames: getAllGames,
    getGame: getGame,
    createGroup: createGroup,
    updateGroup: updateGroup,
    getAllGroups: getAllGroups,
    getGroup: getGroup,
    addGameToGroup: addGameToGroup,
    getGamesBetweenMaxMin: getGamesBetweenMaxMin
  }
    
function body(req, callback) {
    let body = ''
    req.on('data', (chunk) => body += chunk.toString())
    req.on('end', () => {
         let groups = JSON.parse(body)
         callback(null, groups)
    })
}

function getAllGames(req, res)  {
    const url = parse(req.url, true)
    const {
        query
    } = url
    covidaServices.getAllGames(query.order_by, processGetAllGames)

    function processGetAllGames(err, games) {
        if (err) {
            res.statusCode = err.code
            res.end(err.message + 'The error is:' + err.error)
        } else {
            res.status = 200
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(games));
        }
    }
} 

function getGame(req, res) {
    //TODO
}

function createGroup(req, res) {
    //TODO
}

function updateGroup(req, res) {
    //TODO
}

function getAllGroups(req, res) {
    //TODO  
}

function getGroup(req, res) {
    //TODO
}

function addGameToGroup(req, res) {
    //TODO   
}

function getGamesBetweenMaxMin(req, res) {
    //TODO
}

