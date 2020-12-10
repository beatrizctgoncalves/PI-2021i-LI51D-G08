'use strict'

const OK = "RESOURCE FOUND";
const CREATED = "GROUP CONFLICT";

const NOT_FOUND = "RESOURCE NOT FOUND";
const CONFLICT = "DUPLICATE GROUP FOUND";
const DB_ERROR = "ERROR IN DB";
const API_ERROR = "ERROR IN IGDB API";

function error(detailedError, shortDescription) {
    return Promise.reject({
        detail: detailedError.toUpperCase(),
        short: shortDescription
    })
}

function success(message, shortDescription, data) {
    return {
        message: message.toUpperCase(),
        short: shortDescription,
        data: data
    }
}

module.exports = {
    OK: OK,
    NOT_FOUND: NOT_FOUND,
    CREATED: CREATED,
    CONFLICT: CONFLICT,
    DB_ERROR: DB_ERROR,
    API_ERROR: API_ERROR,

    success: success,
    error: error
};