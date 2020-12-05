'use strict'

const urllib  = require('urllib')
const IGDB_HOST = 'https://api.igdb.com/v4/games' //API IGDB's base URL with a specific endpoint
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr'

//This method acesses to the API IGDB and make a request to get a specific game by name
function getGamesByName(name, processGetGamesByName) { //Most of the requests to the API IGDB use the POST method
    const options = {
        'method': 'POST', 
        'url': `${IGDB_HOST}`,
        'headers': {
            'Client-ID': `${IGDB_CID}`,
            'Authorization': `${IGDB_KEY}`,
            'Content-Type': 'text/plain'
        },
        data: `search "${name}"; fields name, total_rating, summary, url;`
    };
    urllib.request(`${IGDB_HOST}`, options, function(error, data, res) {
        if (error == null) {
            //Parses a JSON string, constructing the JavaScript value or object described by the string
            processGetGamesByName(null, JSON.parse(data.toString())) }
    })
}

//This method acesses to the API IGDB and make a request to get a specific game by id
function getGamesById(id, processGetGamesById) { //Most of the requests to the API IGDB use the POST method
    const options = {
        'method': 'POST', 
        'url': `${IGDB_HOST}`,
        'headers': {
            'Client-ID': `${IGDB_CID}`,
            'Authorization': `${IGDB_KEY}`,
            'Content-Type': 'text/plain'
        },
        data: `fields name, total_rating, summary, url; where id = ${id};`
    };
    urllib.request(`${IGDB_HOST}`, options, function(error, data, res) {
        if (error == null) {
            processGetGamesById(null, JSON.parse(data.toString()))
        }
    })
}

module.exports = {
    getGamesByName: getGamesByName,
    getGamesById: getGamesById
}
