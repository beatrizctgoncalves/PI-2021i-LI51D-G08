const api = require('../covida-api.js');
const statusCode = require('../covida-status.js');

module.exports = {

    getView: () => 
        `<h1></h1>
        <div id='removeGroup'></div>`,        

    authenticationRequired: true,

    run: (req) => {
        return api.removeGroup(req.args[1])
        .then(response => {
            if (!response.error) {
                alert(`Group ${req.args[0]} successfully removed`);
                location.assign(`#groups`);
            } else {
                return Promise.reject(response.error);
            }
        }).catch(error => {
            alert(error.body);
        })
    }
}