'use strict'

const covidaResponses = require('./covida-responses')
const fetch = require('node-fetch')

const ES_URL = 'http://localhost:9200';

var count = 0;

module.exports = {
    createGroup: function(name, desc) {
        return fetch(`${ES_URL}/groups/_doc/`, {
            method: 'POST',
            headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //Request body
                "id": count+1,
                "name": name,
                "desc": desc,
                "games": []
            })
        })
            .then(response => response.json())
            .then(body => {
                console.log(body._id)
                body.result})
            .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    listGroups: function() {
        return fetch(`${ES_URL}/groups/_search`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json()) //Expecting a json response
        .then(body => {
            if(body.hits) return body.hits.hits.map(hit => hit._source);
            else return undefined;
        })
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG));
    },

    getGroupByID: function(id) {
        return fetch(`${ES_URL}/groups/_search?q=id:${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json())
        .then(body => {
            let hit = body.hits.hits;
            if (hit.length) return hit[0]._source;
            return undefined;
        })
        .catch(() => {
            return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG)
        });
    },

    editGroup: function(group_id, new_name, new_desc) {
        return fetch(`${ES_URL}/groups/_update_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": {
                    "match": {
                        "id": `${group_id}`
                    }
                },
                "script": {
                    "source": "ctx._source.name = params.name; ctx._source.desc = params.desc",
                    "params": {
                        "name": `${new_name}`,
                        "desc": `${new_desc}`,
                    }
                }
            })
        })
        .then(response => response.json())
        .then(body => {
            if(body) return body.updated;
            return undefined;
        })
        .catch(() => {
            return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG)
        });
    },

    removeGroup: function(group_id) {
        return fetch(`${ES_URL}/groups/_delete_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": {
                    "match": {
                        "id": `${group_id}`
                    }
                }
            })
        })
        .then(response => response.json())
        .then(body => body.deleted)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },


    addGameToGroup: function(game, group_id){
        return fetch(`${ES_URL}/groups/_update_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": {
                    "match": {
                        "id": `${group_id}`
                    }
                },
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.games.add(params.game)",
                    "params": {
                        "games": game
                    }
                }
            })
        })
            .then(response => response.json())
            .then(body => body.updated)
            .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    //NOT SURE YET
    getRatingsFromGames: function(group_id, max, min) {
        return fetch(`${ES_URL}/groups/${group_id}/games/_search`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json())
        .then(body => {
            let hit = body.hits.hits;
            console.log(hit)
            if (hit.length) return hit[0]._source;
            return undefined;
        })
        .catch(() => {
            return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG)
        });
    },

    removeGameById: function(group_id, game_id) {
        return fetch(`${ES_URL}/groups/_update_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "query": {
                        "match": {
                            "id": `${group_id}`
                        }
                    },
                    "script": {
                        "lang": "painless",
                        "inline": "ctx._source.games.remove(params.game_id)",
                        "params": {
                            "removeGame": game_id
                        }
                    }
                })
        })
        .then(response => response.json())
        .then(body => body.updated)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    }
}