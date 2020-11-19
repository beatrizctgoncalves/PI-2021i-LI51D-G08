const services = require('./covida-services')

'use strict'

const request = require('request')

module.exports = () => {

    const covidaUrl = `https://api.igdb.com/v4`

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
}