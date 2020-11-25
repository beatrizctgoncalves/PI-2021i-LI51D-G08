'use strict'

const urllib  = require('urllib');
const IGDB_HOST = 'https://api.igdb.com/v4/games'
const IGDB_KEY = 's4fwgb8isqexk2j87n2xagqfc3hhy6'

/**
 * @param {function(Error, Array)} cb Callback receiving an array with top games or Error if not succeeded
 */
  function getTopGames(cb) {
    urllib.request(IGDB_HOST, 
        {
            method: 'GET',
            headers: {
                'Client-ID' : 's4fwgb8isqexk2j87n2xagqfc3hhy6',
                'Key' :'5tfgildk5un7ie5tz6fzywdd1dcryr'
            },
            data: {
                'top_games': 'fields *; where rating > 0; desc rating; limit 10;',
            }
        },
            (err, data, res) => {
                console.log(res.status, res.headers, data);
            }
        );
}

module.exports = getTopGames

/**
 * @param {String} game Game name
 * @param {function(Error, Array)} cb Callback receives an array of Game objects with given name or 
 * an Error if there is no Game with given name.
 */
function getGameByName(game, cb) {
    urllib.request(IGDB_HOST, 
        {
            method: 'GET',
            headers: {
                'Client-ID' : 's4fwgb8isqexk2j87n2xagqfc3hhy6',
                'Key' :'5tfgildk5un7ie5tz6fzywdd1dcryr'
            },
            data: {
                'game': 'fields *; where name = ' + game,
            }
        },
            (err, data, res) => {
                console.log(res.status, res.headers);
            }
        );
}

module.exports = getGameByName

/**
 * @param {function(Error, Array)} cb Callback receives an array of Game objects with given name or 
 * an Error if there is no Game with given name.
 */
function getAllGroups(cb) {
    urllib.request(IGDB_HOST, 
        {
            method: 'GET',
            headers: {
                'Client-ID' : 's4fwgb8isqexk2j87n2xagqfc3hhy6',
                'Key' :'5tfgildk5un7ie5tz6fzywdd1dcryr'
            },
            data: {
                'groups': 'fields *; where rating > 0; desc rating; limit {$nr};',
            }
        },
            (err, data, res) => {
                console.log(res.status, res.headers, data);
            }
        );
}

module.exports = getAllGroups

/**
 * @param {String} group Group name
 * @param {function(Error, Array)} cb Callback receives an array of Game objects with given name or 
 * an Error if there is no Game with given name.
 */
function getGroupDetails(group, cb) {
    urllib.request(IGDB_HOST, 
        {
            method: 'GET',
            headers: {
                'Client-ID' : 's4fwgb8isqexk2j87n2xagqfc3hhy6',
                'Key' :'5tfgildk5un7ie5tz6fzywdd1dcryr'
            },
            data: {
                'group': 'fields *; where name = ' + group,
            }
        },
            (err, data, res) => {
                console.log(res.status, res.headers);
            }
        );
}

module.exports = getGroupDetails

function requestServerOptions(method, path, body) {
    if (body != null)
        return {
            'method': method,
            'uri': `${SERVER_URI}${path}`,
            'body': body,
            'json': true
        };
    else
        return {
            'method': method,
            'uri': `${SERVER_URI}${path}`,
            'json': true
        }
}
