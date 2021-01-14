const api = require('../covida-api.js');
const statusCode = require('../covida-status.js');

module.exports = {

    getView: () => 
        `<h1></h1>
        <div id='removeGame'></div>`,

    authenticationRequired: true,

    run: (req) => {
        return api.removeGame(req.args[2], req.args[0])
        .then(response => {
            if (!response.error) {
                alert(`Game ${req.args[1]} successfully removed`);
                window.history.back();
            } else {
                return Promise.reject(response.error);
            }
        }).catch(error => {
            alert(error.body);
        })
    }
}