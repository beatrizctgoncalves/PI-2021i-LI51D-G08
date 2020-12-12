'use strict'

const responses = require('./responses')
const fetch = require('node-fetch')

const SERVER_URL = 'http://localhost:8080';

const Groups_Database = [] //The repository in memory

function createGroup(name, desc) {
    var group = {
        "id": Groups_Database.length + 1,
        "name": name,
        "desc": desc,
        "games": []
    }
    Groups_Database.push(group)

    return fetch(`${SERVER_URL}/groups/_doc`, {
        method: 'POST',
        headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group) //Request body
    })
        .then(response => response.json()) //Expecting a json response
        .then(body => body.result)
        .catch(() => responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG))
}

function listGroups() {
    return fetch(`${SERVER_URL}/groups/_search`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
    .then(response => response.json()) //Expecting a json response
    .then(body => {
        if(body.length) return body.hits.hits.map(hit => hit._source);
        else return undefined;
    })
    .catch(() => {
        return responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG)
    });
}

function getGroupByID(id) {
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
}

function editGroup(group_id, new_name, new_desc, processEditGroup) {
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
}

function removeGroup(group_id) {
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
}


function addGameToGroup(game, group_id){
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
}

//NOT SURE YET
function getRatingsFromGames(group_id, max, min) {
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
}

function removeGameById(group_id, game_id) {
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

module.exports = {
    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByID: getGroupByID,
    editGroup: editGroup,
    removeGroup : removeGroup,

    addGameToGroup: addGameToGroup,
    getRatingsFromGames: getRatingsFromGames,
    removeGameById: removeGameById,
}