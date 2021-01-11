const api = require('../covida-api.js');

module.exports = {

    getView: () => {
        //TODO undefined
        `<h1>Search Results</h1>
        <div id='removeGroup'></div>`
    },        

    authenticationRequired: true,

    run: (req) => {
       /* const back = document.querySelector(`#back`)
        back.onclick = () => {
            window.history.back();
        }*/
        return api.removeGroup(req.args[1])
        .then(response => {
            if (!response.error) {

                alert(`Remove Group ${req.args[0]} successfully created`)
                location.assign(`#groups`)
            } else {
                return Promise.reject(response.error);
            }
        }).catch(error => {
            alert(error);
        })

    }




}