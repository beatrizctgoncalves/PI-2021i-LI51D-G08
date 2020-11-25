'use strict'

 const data = require('./igdb-data');
 const db = require('./covida-db');

function services(data, db){

    function isInvalid(id) { return !id || !Number(id) }

    const theServices = {
        getMostPopularGames : function (cb) {
            data.getMostPopularGames(cb)
        }
    };
    return theServices;
}

module.exports = services;
