'use strict'

 const data = require('./igdb-data');
 const db = require('./covida-db');


function services(data, db){

    function isInvalid(id) { return !id || !Number(id) }

    const theServices = {
        getMostPopularGames : function (cb) {
            data.getMostPopularGames(cb)
        },

        getGameByName : function (name, cb) {
            if(!name){
                return cb(
                    error.create(
                        error.ARGUMENT_ERROR,
                        'Invalid Game name'
                    )
                )
            }
            data.getGameByName(name, cb)
        }
    };
    return theServices;
}


module.exports = services;

