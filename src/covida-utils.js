
const request = require('request');

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;
const SERVER_URI = `http://${SERVER_HOST}:${SERVER_PORT}/`;

const API_URL_START = "https://api.igdb.com/v4";
const API_KEY = 's4fwgb8isqexk2j87n2xagqfc3hhy6';
const language = 'en-US';

const TIMEOUT = 10000000;

function requestServerOptions(method, path, body) {
    if (body != null)
        return {
            'method': method,
            'uri': `${SERVER_URI}${path}`,
            'body': body,
            'json': true
        };
    else
        return {
            'method': method,
            'uri': `${SERVER_URI}${path}`,
            'json': true
        }
}

function post(options, beforeOrAfter) {
    beforeOrAfter(function (done) {
        request.post(options, (err, res, body) => {
            done()
        })
    });

    refresh(beforeOrAfter)
}

module.exports = {
    requestServerOptions: requestServerOptions,
    requestDatabaseOptions: requestDatabaseOptions,
    refresh: refresh,
    post: post,
    put: put,
    del: del,
    getErrObj: getErrObj,
    SERVER_PORT: SERVER_PORT,
    MOCHA_TIMEOUT: TIMEOUT,
    API_URL_START: API_URL_START,
    API_KEY: API_KEY,
    language: language
};