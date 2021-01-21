'use strict'

const covidaResponses = require('./covida-responses')
const fetch = require('node-fetch')

const GET_API_IMAGE = "https://api.igdb.com/v4/covers"
const IGDB_HOST = 'https://api.igdb.com/v4/games' //API IGDB's base URL with a specific endpoint
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer jpzsqyp11uomkcirybhg2s41w6sfy5'
const API_IMAGE = "https:"

module.exports = {
    
    //This method makes a request to get a specific game by id
    getSpecificGame: function(id) { 
        var myHeaders = new fetch.Headers();
        myHeaders.append("Client-ID", `${IGDB_CID}`);
        myHeaders.append("Authorization", `${IGDB_KEY}`);
        myHeaders.append("Content-Type", "text/plain");
        var raw = `fields name, total_rating, summary, url; where id = ${id};`;
        
        //These properties are part of the Fetch Standard
        var requestOptions = {
            method: 'POST', // most of the requests to the API IGDB use the POST method
            headers: myHeaders, // request headers. format is the identical to that accepted by the Headers constructor (see below)
            body: raw, // request body
            redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
        };
        return fetch(`${IGDB_HOST}`, requestOptions)
        .then(response =>  response.json()) //Expecting a json response
        .then(body => {
            if(body.length > 1) return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GAME_NOT_FOUND_MSG);
            else {
                return body.map(e => ({
                    "id": e.id,
                    "name": e.name,
                    "summary": e.summary,
                    "total_rating": e.total_rating,
                    "url": e.url
                }));
            }
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG);
        })
    },

    //This method makes a request to get a game by name
    searchGamesByName: function(name) { //Most of the requests to the API IGDB use the POST method
        var myHeaders = new fetch.Headers();
        myHeaders.append("Client-ID", `${IGDB_CID}`);
        myHeaders.append("Authorization", `${IGDB_KEY}`);
        myHeaders.append("Content-Type", "text/plain");
        
        var raw  = `fields name, total_rating, summary, url; search "${name}";`;
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        return fetch(`${IGDB_HOST}`, requestOptions)
        .then(response => response.json())
        .then(body => {
            if(!body.length) return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GAME_NOT_FOUND_MSG);
            else {
                return body;
            }
        })
        .catch(error => {
            if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
            else return covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG);
        })
    },

    //This method makes a request to get the image of a specific game
    getImage: function(id) {
        var headers = new fetch.Headers();
        headers.append("Client-ID", `${IGDB_CID}`);
        headers.append("Authorization", `${IGDB_KEY}`);
        headers.append("Content-Type", "text/plain");
        
        var raw  = `fields url; where game = ${id};`;
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
        };
        return fetch(`${GET_API_IMAGE}`, requestOptions)
        .then(response => response.json())
        .then(body => {
            if(body.length)
                return API_IMAGE.concat(body[0].url.replace("thumb", "720p"))
            else 
                return undefined;
        })
        .catch(() => covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG))
    }
}
