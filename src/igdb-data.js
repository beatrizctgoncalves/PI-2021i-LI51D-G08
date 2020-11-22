'use strict'
const error = require("./error")
const urllib  = require('urllib ');
const baseUrl = 'https://api.igdb.com/v4/'
const API_KEY = 's4fwgb8isqexk2j87n2xagqfc3hhy6';

module.exports = {
  getMostPopularGames : function (cb) {
    const url = `${baseUrl}games?api_key=${API_KEY}`
    requestUrl(url,cb)
  },

  getGameByName : function (name, cb) {
    console.log('Get Game by name: ' + name);
    const url = `${baseUrl}?api_key=${API_KEY}&query=${name}`
    requestUrl(url,cb)
  }
};

function requestUrl(url,cb) {
  urllib.request(
      url,
      (err, res, body) => {
        //TODO
      }
  )
}

function processRequest(cb, res, body){
  res.body = Array.isArray(body.results) ?
      body.results.map(game => getGameObject(game))
      :
      getGameObject(body);
  cb(null, res)
}

function getGameObject (refObject) {
  return {
    id: refObject.id,
    name: refObject.name,
    summary: refObject.summary,
  }
}
