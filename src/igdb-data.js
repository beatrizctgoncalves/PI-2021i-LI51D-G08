'use strict'

const urllib  = require('urllib').create();
const IGDB_HOST = 'https://api.igdb.com/v4'
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr'

/**
 * @param {function(Error, Array)} cb Callback receiving an array with top games or Error if not succeeded
 * TODO: Cb is missing
 */
function getGamesWithName(name, processGetGamesWithName) {
    const options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games',
        'headers': {
            'Client-ID': 's4fwgb8isqexk2j87n2xagqfc3hhy6',
            'Authorization': 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr',
            'Content-Type': 'text/plain',
            'Cookie': '__cfduid=d1a60445fdbc34aaa784100229f2f2d811605798257'
        },
        data: `search "${name}"; fields name, rating, summary;`
    };
    urllib.request(`${IGDB_HOST}/games`, options, function(error, data, res) {
        if (error == null) {
            var gamesDetails = data.toString()  
            processGetGamesWithName(null, gamesDetails)
        }
    })
}

function getErrObj(code, message = "Service Unavailable") {
    switch (code) {
        case 503:
            return {
                'statusCode': 503,
                'body': {"status": message}
            };
        case 409:
            return {
                'statusCode': 409,
                'body': {"status": message}
            };
        case 404:
            return {
                'statusCode': 404,
                'body': {"status": message}
            }
    }
}

module.exports = {
    getGamesWithName: getGamesWithName,
    getErrObj: getErrObj
}
