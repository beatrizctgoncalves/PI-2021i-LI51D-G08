module.exports = {
    //SUCCESS
    OK: 200,
    CREATED: 201,

    URI_MSG: "http://localhost:8080/groups/",

    setSuccessToUri: function (status, id) { //Send the uri with id
        return {
            status: status,
            body: this.URI_MSG.concat(id.toString())
        }
    },
    
    setSuccessToList: function (status, obj) { //Lists objects
        return {
            status: status,
            body: obj
        }
    },


    //ERROR
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLIT_GAME: 409,
    DB_ERROR: 500,
    API_ERROR: 503,

    BAD_REQUEST_MSG: "Please insert a valid parameter!",
    GAME_NOT_FOUND_MSG: "Could not find game!",
    GROUP_NOT_FOUND_MSG: "Could not find group!",
    GROUPS_0_MSG: "Could not find any group!",
    CONFLIT_GAME_MSG: "This game already exists in this group!",
    DB_ERROR_MSG: "Error in DataBase",
    API_ERROR_MSG: "Error in IGDB API",

    setError: function (status, message) {
        return Promise.reject({
            status: status,
            body: message
        })
    }
};