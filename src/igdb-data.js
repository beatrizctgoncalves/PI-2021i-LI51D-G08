'use strict'

const urllib  = require('urllib');
const IGDB_HOST = 'https://api.igdb.com/v4'
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr'

/**
 * @param {function(Error, Array)} cb Callback receiving an array with top games or Error if not succeeded
 */
function getMostPopularGames(processGetPopularGames) {
    var options = {
        'method': 'POST',
        'url': 'https://api.igdb.com/v4/games',
        'headers': {
            'Client-ID': 's4fwgb8isqexk2j87n2xagqfc3hhy6',
            'Authorization': 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr',
            'Content-Type': 'text/plain',
            'Cookie': '__cfduid=d1a60445fdbc34aaa784100229f2f2d811605798257'
        },
        body: JSON.stringify({"data":"fields name, follows;where follows > 800;sort follows desc;"})
    };
    urllib.request(`${IGDB_HOST}/games`, options, function (error, res, data) {
        if (error) throw new Error(error);
        popularGamesObj = JSON.parse(JSON.stringify(data));
        console.log(popularGamesObj)
        processGetPopularGames(null, popularGamesObj.response.map(e => [{"name": e.name}])) // All series name
    });
    console.log("FIM")
}

function requestServerOptions(method, path, body) {
    if (body != null)
        return {
            'method': method,
            'uri': `${IGDB_HOST}${path}`,
            'headers': {
                'Client-ID' : `${IGDB_CID}`,
                'Authorization' : `Bearer ${IGDB_KEY}`
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
