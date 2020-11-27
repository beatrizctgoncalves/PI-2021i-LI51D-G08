module.exports = {
    ARGUMENT_ERROR : 400,
    NOT_FOUND : 404,

    create : function (code, message) {
        return {
        statusCode: code,
        body: {status_message:message}
        }
    }
};