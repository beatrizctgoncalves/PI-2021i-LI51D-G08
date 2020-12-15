'use strict'

const covidaResponses = require('./covida-responses')
const fetch = require('node-fetch');
const { API_ERROR_MSG } = require('./covida-responses');

const ES_URL = 'http://localhost:9200';

module.exports = {
    createGroup: function(name, desc) {
        return fetch(`${ES_URL}/groups/_doc/`, {
            method: 'POST',
            headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //Request body
                "name": name,
                "desc": desc,
                "games": []
            })
        })
        .then(response => response.json())
        .then(body => {
            if(body.result){
                console.log("id:",body._id)
                return body._id
            }
            else
                return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG)   
        })//return id e uri http://localhost:groups/id
        
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
            if(body.hits.hits.length) {
                return body.hits.hits.map(hit => {
                    hit._source.id = hit._id;
                    return hit._source;
                });
            }
            else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUPS_0_MSG);
        })
    },

    getGroupById: function(id) {
        return fetch(`${ES_URL}/groups/_search?q=name:${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json())
        .then(body => {
            let hit = body.hits.hits;
            if(hit.length) return hit[0]._source;
            else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
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
                        "desc": `${new_desc}`
                    }
                }
            })
        })
        .then(response => response.json())
        .then(body => {
            if(body.updated) {
                return body._id;
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
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
        .then(body => {
            if(body.deleted) {
                return body._id;
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
    },


    addGameToGroup: function(game, group_id){
        var total_rating;
        "total_rating" in game[0] ? total_rating = game[0].total_rating : total_rating = null

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
                    "inline": "ctx._source.games.add(params.games)",
                    "params": {
                        "games": {
                            "id": game[0].id,
                            "name": game[0].name,
                            "total_rating": total_rating,
                            "summary": game[0].summary,
                            "url": game[0].url
                        }
                    }
                }
            })
        })
        .then(response => response.json())
        .then(body => {
            if(body.updated) {
                return body._id;
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
    },

    getRatingsFromGames: function(group_id, max, min) {
        return fetch(`${ES_URL}/groups/_search?q=id:${group_id}/games/_search`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json())
        .then(body => {
            let hit = body.hits.hits;
            if (hit.length) {
                var games = hit[0]._source.games.filter(g => g.total_rating > min && g.total_rating < max)
                if(games == -1) return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GAME_NOT_FOUND_MSG);
                else return games;
            }
            else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
    },

    removeGame: function(group_id, game_index) {
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
                        "inline": "ctx._source.games.remove(params.game_index)",
                        "params": {
                            "game_index": game_index
                        }
                    }
                })
        })
        .then(response => response.json())
        .then(body => {
            if(body.updated) {
                return body._id;
            } else return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GROUP_NOT_FOUND_MSG);
        })
    }
}