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
        .then(body => body.result)
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

    getGroupByName: function(name) {
        return fetch(`${ES_URL}/groups/_search?q=name:${name}`, {
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
            else return undefined;
        })
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG));
    },

    editGroup: function(group_name, new_name, new_desc) {
        return fetch(`${ES_URL}/groups/_update_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": {
                    "match": {
                        "name": `${group_name}`
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
            return body.updated != 0 ? body.updated : undefined
        })
        .catch(() => {
            return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG)
        });
    },

    removeGroup: function(group_name) {
        return fetch(`${ES_URL}/groups/_delete_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": {
                    "match": {
                        "name": `${group_name}`
                    }
                }
            })
        })
        .then(response => response.json())
        .then(body => {
            return body.deleted != 0 ? body.deleted : undefined
        })
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },


    addGameToGroup: function(game, group_name){
        var total_rating = null;
        if("total_rating" in game[0]) total_rating = game[0].total_rating
        console.log(game)
        return fetch(`${ES_URL}/groups/_update_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": {
                    "match": {
                        "name": `${group_name}`
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
        .then(body => body.updated)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    
   
    getRatingsFromGames: function(group_name, max, min) {
        return fetch(`${ES_URL}/groups/_search?q=id:${group_name}/games/_search`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => response.json())
        .then(body => {
            let hit = body.hits.hits;
            if (hit.length) {   //NOT SURE YET
                var games = hit[0]._source.games.filter(g => g.total_rating > min && g.total_rating < max)
                return games;
            }
            else return undefined;
        })
        .catch(() => {
            return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG)
        });
    },

    getGamesIndex: function(group_name, game_name) {
        return fetch(`${ES_URL}/groups/_search?q=name:${group_name}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(body => {
                let hit = body.hits.hits[0]._source.games;
                if (hit.length) {
                    const game_index = hit.findIndex(g => g.name === game_name)
                    if(game_index != -1) {
                        return game_index;
                    } else return covidaResponses.GAME_NOT_FOUND_MSG;
                } else return covidaResponses.GROUP_NOT_FOUND_MSG;
            })
            .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    },

    removeGame: function(group_name, game_index) {
        return fetch(`${ES_URL}/groups/_update_by_query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "query": {
                        "match": {
                            "name": `${group_name}`
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
        .then(body => body.updated)
        .catch(() => covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG))
    }
}