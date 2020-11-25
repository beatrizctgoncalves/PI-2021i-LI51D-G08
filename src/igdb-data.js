'use strict'

const urllib  = require('urllib');
const IGDB_HOST = 'https://api.igdb.com/v4'
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr'

/**
 * @param {function(Error, Array)} cb Callback receiving an array with top games or Error if not succeeded
 */
function getMostPopularGames(processGetPopularGames) {
    const options = {
        'method': 'GET',
        'uri': `${IGDB_HOST}/games`,
    };
    urllib.request(IGDB_HOST, options, (err, res, body) => {
        if (err == null) {
            popularGamesObj = JSON.parse(body);

            return processGetPopularGames(null, popularGamesObj.results.map(e => [{"name": e.name,}])) // All games' names
        }
    });
}


function requestServerOptions(method, path, body) {
    if (body != null)
        return {
            'method': method,
            'uri': `${IGDB_HOST}${path}`,
            'headers': {
                'Client-ID' : `${IGDB_CID}`,
                'Key' : `${IGDB_KEY}`
            },
            'body': body,
            'json': true
        };
    else
        return {
            'method': method,
            'uri': `${IGDB_HOST}${path}`,
            'headers': {
                'Client-ID' : `${IGDB_CID}`,
                'Key' : `${IGDB_KEY}`
            },
            'json': true
        }
}

function post(options, beforeOrAfter) {
    beforeOrAfter(function (done) {
        request.post(options, (err, res, body) => {
            done()
        })
    });

    refresh(beforeOrAfter)
}

function put(options, beforeOrAfter) {
    beforeOrAfter(function (done) {
        request.put(options, (err, res, body) => {
            done()
        })
    });

    refresh(beforeOrAfter)
}

function del(options, beforeOrAfter) {
    beforeOrAfter(function (done) {
        request.delete(options, (err, res, body) => {
            done()
        })
    });

    refresh(beforeOrAfter)
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
    getMostPopularGames : getMostPopularGames,
    requestServerOptions : requestServerOptions,
    post : post,
    put : put,
    del : del,
    getErrObj : getErrObj
}
