const services = require('./covida-services')

'use strict'

const request = require('request')

module.exports = class CovidaDB {

   // constructor(es) {
   //     this.covidaDB = 'http://' + es.host + ':' + es.port + '/' + es.group_index + '/group/'
   // }

    static init(es) {
        return new CovidaDB(es)
    }

    checkError(statusCode, callback, err, res, body) {
        if (err) {
            callback(err)
            return true
        }

        if (res.statusCode != statusCode) {
            callback({
                code: res.statusCode,
                message: res.statusMessage,
                error: body
            })
            return true
        }
        return false
    }
}