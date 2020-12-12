'use strict'

const responses = require('./responses')
const fetch = require('node-fetch')

const ES_URL = 'http://localhost:9200';

const Groups_Database = [] //The repository in memory

module.exports = {
    createGroup: function(name, desc) {
        var group = {
            "id": Groups_Database.length + 1,
            "name": name,
            "desc": desc,
            "games": []
        }
        Groups_Database.push(group)

        return http.request(`${SERVER_URL}/groups`, {
            method: 'POST',
            headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                'Content-Type': 'application/json'
            },
            'dataType': 'json',
            'content': JSON.stringify(group), //Request body
        })
        .then(result => new Promise((resolve, reject) => {
            console.log(result.data)
            if(result.data) return resolve(result.data)
            else return reject(responses.DB_ERROR_MSG)
        }))
    },

    listGroups: function() {
        return fetch(`${SERVER_URL}/groups/_search`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json()) //Expecting a json response
        .then(body => {
            console.log(body.hits.hits)
            if(body.length) return body.hits.hits.map(hit => hit._source);
            else return undefined;
        })
        .catch(() => {
            return responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG)
        });
    },

    getGroupByID: function(id) {
        return fetch(`${SERVER_URL}/groups/${id}/_search?q=id:${id}`, {
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
            return responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG)
        });
    },

    editGroup: function(group_id, new_name, new_desc, processEditGroup) {
        return fetch(`${SERVER_URL}/groups/_doc/_update_by_query`, {
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
            console.log(body)
            if(body) return body.updated;
            return undefined;
        })
        .catch(() => {
            return responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG)
        });
    },

    removeGroup: function(group_id) {
        return fetch(`${SERVER_URL}/groups/_doc/_delete_by_query`, {
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
        .catch(() => responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG))
    },


    addGameToGroup: function(game, group_id){
        return fetch(`${SERVER_URL}/groups/_doc/_update_by_query`, {
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
            .catch(() => responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG))
    },

    //NOT SURE YET
    getRatingsFromGames: function(group_id, max, min) {
        return fetch(`${SERVER_URL}/groups/${group_id}/games/_search`, {
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
            return responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG)
        });
    },

    removeGameById: function(group_id, game_id) {
        return fetch(`${SERVER_URL}/groups/_doc/_update_by_query`, {
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
                }
            )
        })
        .then(response => response.json())
        .then(body => body.updated)
        .catch(() => responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG))
    }
}