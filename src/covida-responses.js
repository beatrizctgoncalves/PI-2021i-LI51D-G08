module.exports = {
    //SUCCESS
    OK: 200,
    CREATED: 201,

    GROUP_CREATED_MSG: "Group successfully created!",
    GROUP_EDITED_MSG: "Group successfully edited!",
    GROUP_REMOVED_MSG: "Group successfully deleted!",
    GAME_REMOVED_FROM_GROUP_MSG: "Game successfully deleted!",
    GAME_ADD_TO_GROUP_MSG: "Game successfully added to the group!",
    RATINGS_WRONG_MSG: "Please insert valid numbers for ratings between 0 and 100!",

    setSuccess: function (status, obj) {
        return {
            status: status,
            body: obj,
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