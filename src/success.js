module.exports = {
    OK: 200,
    CREATED: 201,

    GROUP_CREATED_MSG: "Group successfully created!",
    GROUP_EDITED_MSG: "Group successfully edited!",
    GROUP_DELETED_MSG: "Group successfully deleted!",
    GAME_DELETED_FROM_GROUP_MSG: "Game successfully deleted!",
    GAME_ADD_TO_GROUP_MSG: "Game successfully added to the group!",

    setSuccess: function (status, obj) {
        return {
            status: status,
            body: obj,
        }
    }
};