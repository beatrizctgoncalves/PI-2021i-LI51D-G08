'use strict'
const error = require("./error")
const urllib  = require('urllib ');
const IGDB_HOST = 'https://api.igdb.com/v4/games'
const IGDB_KEY = 's4fwgb8isqexk2j87n2xagqfc3hhy6'


/**
 * @param {function(Error, Array)} cb Callback receiving an array with top games or Error if not succeeded
 */
  function getTopGames(nr,cb) {
    urllib.request(IGDB_HOST, 
        {
            method: 'GET',
            headers: {
                'Client-ID' : 's4fwgb8isqexk2j87n2xagqfc3hhy6',
                'Key' :'5tfgildk5un7ie5tz6fzywdd1dcryr'
            },
            data: {
                'top_games': 'fields *; where rating > 0;desc rating;limit {$nr};',
            }
        },
            (err, data, res) => {
                console.log(res.status, res.headers, data);
            }
        );
    
}

model.exports = getTopGames

/**
 * @param {String} game Game name
 * @param {function(Error, Array)} cb Callback receives an array of Game objects with given name or 
 * an Error if there is no Game with given name.
 */
function searchGame(game, cb) {
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