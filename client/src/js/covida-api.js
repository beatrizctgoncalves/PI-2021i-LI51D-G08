'use strict';

const BASE_URL = 'http://localhost:8080/';

var arrayMethods = {
    POST: 'POST',
    DELETE: 'DELETE',
    GET: 'GET',
};

function makeFetch(uri, method, raw) {
    return fetch(`${BASE_URL}`.concat(uri), {  
        method: method,
        headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
            'Content-Type': 'application/json'
        },
        body: raw  //Request body
    })
    .then(response => response.json()) //Expecting a json response
}

module.exports = {
    createGroup: function(name, desc) {
        var requestBody = JSON.stringify({
            "name": name,
            "desc": desc,
            "games": []
        });
        return makeFetch('/groups/_doc', arrayMethods.POST, requestBody)
    },

    listGroups: function() {
        return makeFetch('/groups/_search', arrayMethods.GET, null)
    },

    getGroupById: function(id) {
        return makeFetch(`/groups/_doc/${id}`, arrayMethods.GET, null)
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
        return makeFetch(`/groups/_update/${group_id}`, arrayMethods.POST, requestBody)
    },

    removeGroup: function(group_id) {
        var requestBody = JSON.stringify({
            "query": {
                "match": {
                    "id": `${group_id}`
                }
            }
        })
        return makeFetch(`/groups/_doc/${group_id}`, arrayMethods.DELETE, requestBody)
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
        return makeFetch(`/groups/_update/${group_id}`, arrayMethods.POST, requestBody)
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
        return makeFetch(`/groups/_update/${group_id}`,arrayMethods.POST,requestBody)
    }
}