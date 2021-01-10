'use strict'

const covidaResponses = require('./covida-responses')
const fetch = require('node-fetch');

const ES_URL = 'http://localhost:9200/';

var arrayMethods = {
    POST: 'POST',
    DELETE: 'DELETE',
    GET: 'GET',
};

function makeFetch(uri, method, raw) {
    return fetch(`${ES_URL}`.concat(uri), {  
        method: method,
        headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
            'Content-Type': 'application/json'
        },
        body: raw  //Request body
    })
    .then(response => response.json()) //Expecting a json response
}

module.exports = {
    createGroup: function(name, desc, owner) {
        var requestBody = JSON.stringify({
            "owner": owner,
            "name": name,
            "desc": desc,
            "games": []
        });
        return makeFetch('groups/_doc?refresh=true', arrayMethods.POST, requestBody)
        .then(body => body._id)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    listGroups: function() {
        return makeFetch('groups/_search', arrayMethods.GET, null)
        .then(body => {
            if(body.hits) {
                if(body.hits.hits.length) {
                    return body.hits.hits.map(hit => {
                        hit._source.id = hit._id;
                        return hit._source;
                    });
                } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUPS_0_MSG);
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUPS_0_MSG);
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
        })
    },

    getGroupById: function(id) {
        return makeFetch(`groups/_doc/${id}`, arrayMethods.GET, null)
        .then(body => {
            if(body.found) {
                body._source.id = body._id;
                return body._source;
           } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
        })
    },

    editGroup: function(group_id, new_name, new_desc) {
        var requestBody = JSON.stringify({
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.desc = params.desc",
                "params": {
                    "name": `${new_name}`,
                    "desc": `${new_desc}`
                }
            }
        });
        return makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
        .then(body => {
            if(body.result == 'updated') {
                return body._id;
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
        })
    },

    removeGroup: function(group_id) {
        var requestBody = JSON.stringify({
            "query": {
                "match": {
                    "id": `${group_id}`
                }
            }
        })
        return makeFetch(`groups/_doc/${group_id}`, arrayMethods.DELETE, requestBody)
        .then(body => {
            if(body.result === 'deleted') return body._id
            else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
        })
    },


    addGameToGroup: function(game, group_id){
        var requestBody = JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.games.add(params.games)",
                "params": {
                    "games": {
                        "id": game[0].id,
                        "name": game[0].name
                    }
                }
            }
        })
        return makeFetch(`groups/_update/${group_id}`, arrayMethods.POST, requestBody)
        .then(body => body._id)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    removeGame: function(group_id, game_index) {
        var requestBody =  JSON.stringify({
            "script": {
                "lang": "painless",
                "inline": "ctx._source.games.remove(params.game)",
                "params": {
                    "game": game_index
                }
            }
        })
        return makeFetch(`groups/_update/${group_id}`,arrayMethods.POST,requestBody)
        .then(body => body._id)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    createUser: function(username, password) {
        var requestBody = JSON.stringify({
            "username": username,
            "password": password
        });
        return makeFetch('users/_doc?refresh=true', arrayMethods.POST, requestBody)
        .then(body => body._id)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    getUserById: function(id) {
        return makeFetch(`users/_doc/${id}`, arrayMethods.GET, null)
        .then(body => {
            if(body.found) {
                body._source.id = body._id;
                return body._source;
           } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.USER_NOT_FOUND_MSG);
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
        })
    },

    getUserByName: function(name) {
        return makeFetch(`users/_search?q=username:${name}`, arrayMethods.GET, null)
        .then(body => {
            if(body.hits) {
                if(body.hits.hits.length) {
                    return body.hits.hits.map(hit => hit._source);
                } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.USERNAME_USER_MSG);
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.USERNAME_USER_MSG);
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
        })
    }
}