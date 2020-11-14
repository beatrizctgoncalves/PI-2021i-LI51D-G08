const services = require('./covida-services')

'use strict'

const request = require('request')

module.exports = class CovidaDB {

    constructor(es) {
        this.covidaDB = 'http://' + es.host + ':' + es.port + '/' + es.group_index + '/group/'
    }

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

    listAllGroups(callback) {
        const url = this.covidaDB + '_search'
        request.get(url, (err, res, body) => {
            if (!this.checkError(200, callback, err, res, body))
                callback(null, JSON.parse(body).hits.hits)
        })
    }
}