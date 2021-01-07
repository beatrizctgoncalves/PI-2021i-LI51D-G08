'use strict';

const BASE_URL = 'http://localhost:8080';

var arrayMethods = {
    POST: 'POST',
    DELETE: 'DELETE',
    GET: 'GET',
    PUT: 'PUT'
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
    getSpecificGame: function(id) {
        return makeFetch(`/games/id/${id}`, arrayMethods.GET, null)
    },

    searchGamesByName: function(name) {
        return makeFetch(`/games/name/${name}`, arrayMethods.GET, null)
    },

    createGroup: function(name, desc) {
        var requestBody = JSON.stringify({
            "name": name,
            "desc": desc,
            "games": []
        });
        return makeFetch('/groups', arrayMethods.POST, requestBody)
    },

    listGroups: function() {
        return makeFetch('/groups', arrayMethods.GET, null)
    },

    getGroupById: function(id) {
        return makeFetch(`/groups/${id}`, arrayMethods.GET, null)
    },

    editGroup: function(group_id, new_name, new_desc) {
        var requestBody = JSON.stringify({
            "name": `${new_name}`,
            "desc": `${new_desc}`
        });
        return makeFetch(`/groups/${group_id}`, arrayMethods.PUT, requestBody)
    },

    removeGroup: function(group_id) {
        return makeFetch(`/groups/${group_id}`, arrayMethods.DELETE, null)
    },

    addGameToGroup: function(game_id, group_id){
        return makeFetch(`/groups/${group_id}/games/${game_id}`, arrayMethods.PUT, null)
    },

    getRatingsFromGames: function(group_id, max, min){
        return makeFetch(`/groups/${group_id}/games/${min}&${max}`, arrayMethods.GET, null)
    },

    removeGame: function(game_id, group_id){
        return makeFetch(`/groups/${group_id}/games/${game_id}`, arrayMethods.DELETE, null)
    },

    signUp: function(username, password) {
        var requestBody = JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        });
        return makeFetch('/users/signup', arrayMethods.POST, requestBody)
    },
    
    signIn: function(username, password) {
        var requestBody = JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        });
        return makeFetch('/users/signin', arrayMethods.POST, requestBody)
    },
    
    logout: function() {
        return makeFetch('/users/logout', arrayMethods.POST, null)
    },

    getUser: function() {
        return makeFetch('/user', arrayMethods.GET, null)
    }
}