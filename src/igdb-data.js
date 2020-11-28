'use strict'

const urllib  = require('urllib').create();
const IGDB_HOST = 'https://api.igdb.com/v4'
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr'

function getGamesWithName(name, processGetGamesWithName) {
    const options = {
        'method': 'POST',
        'url': `${IGDB_HOST}/games`,
        'headers': {
            'Client-ID': `${IGDB_CID}`,
            'Authorization': `${IGDB_KEY}`,
            'Content-Type': 'text/plain'
        },
        data: `search "${name}"; fields name, total_rating, summary;`
    };
    urllib.request(`${IGDB_HOST}/games`, options, function(error, data, res) {
        if (error == null) {
            var gamesDetails = data.toString();
            processGetGamesWithName(null, gamesDetails)
        }
    })
}
//ITS WRONG
function getGamesWithRating(game, rating_max, rating_min, processGetGamesWithRating) {
    const options = {
        'method': 'POST',
        'url': `${IGDB_HOST}/games`,
        'headers': {
            'Client-ID': `${IGDB_CID}`,
            'Authorization': `${IGDB_KEY}`,
            'Content-Type': 'text/plain'
        },
        data: `fields name, total_rating, summary; where total_rating > ${rating_min}; where total_rating < ${rating_max}; sort name desc;`
    };
    console.log()
    urllib.request(`${IGDB_HOST}/games`, options, function(error, data, res) {
        if (error == null) {
            var gamesDetails = data.toString();
            processGetGamesWithRating(null, gamesDetails)
        }
    })
}

module.exports = {
    getGamesWithName: getGamesWithName,
    getGamesWithRating: getGamesWithRating
}
