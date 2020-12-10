module.exports = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    DB_ERROR: 500,
    API_ERROR: 503,

    BAD_REQUEST_MSG: "Please insert a valid parameter!",
    GAME_NOT_FOUND_MSG: "Could not found game!",
    GROUP_NOT_FOUND_MSG: "Could not found group!",
    DB_ERROR_MSG: "Error in DataBase",
    API_ERROR_MSG: "Error in IGDB API",

    setError: function (status, message) {
        return {
            status: status,
            body: message
        }
    }
};