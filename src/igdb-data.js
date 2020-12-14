'use strict'

const covidaResponses = require('./covida-responses')
const fetch = require('node-fetch')

const IGDB_HOST = 'https://api.igdb.com/v4/games' //API IGDB's base URL with a specific endpoint
const IGDB_CID = 's4fwgb8isqexk2j87n2xagqfc3hhy6'
const IGDB_KEY = 'Bearer 5tfgildk5un7ie5tz6fzywdd1dcryr'

module.exports = {
    
    //This method acesses to the API IGDB and make a request to get a specific game by name
    getSpecificGame: function(name) { 
        var myHeaders = new fetch.Headers();
        myHeaders.append("Client-ID", `${IGDB_CID}`);
        myHeaders.append("Authorization", `${IGDB_KEY}`);
        myHeaders.append("Content-Type", "text/plain");

        var raw = `fields name, total_rating, summary, url; where name = "${name}";`;

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
            if(!body.length) return undefined;
            else return body;
        })
        .catch(() => covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG));
    },

    //This method acesses to the API IGDB and make a request to get a game by name
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
            if(!body.length) return undefined;
            else return body;
        })
        .catch(() => covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG));
    }
}
