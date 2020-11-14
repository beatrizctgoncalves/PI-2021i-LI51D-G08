const services = require('./covida-services')

'use strict'

const request = require('request')

module.exports = () => {

    const covidaUrl = `https://www.igdb.com/api/search`

    return {
        getMostPopularGames: getMostPopularGames,
        getSpecificGame: getSpecificGame
    }

    function getMostPopularGames(queryOrderBy, callback) {
        const options = {
            qs: {
                'order_by': queryOrderBy,
                'client_id': 's4fwgb8isqexk2j87n2xagqfc3hhy6'
            },
            json: true,
            url: covidaUrl
        }
        request.get(options, (err, res, body) => {
            if (err) callback(err)
            else {
                if (res.statusCode !== 200) callback(body)
                else callback(null, body)
            }
        })
    }

    function getSpecificGame(gameID, callback) {
        const options = {
            qs: {
                'ids': gameID,
                'client_id': 's4fwgb8isqexk2j87n2xagqfc3hhy6'
            },
            url: covidaUrl,
            json: true,
        }
        request.get(options, (err, res, body) => {
            if (err) callback(err)
            else {
                callback(null, body)
            }
        })
    }
}