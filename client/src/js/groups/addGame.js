const global = require('../global.js');
const api = require('../covida-api.js');

const handlebars = global.handlebars;
const modListContentsTemplate =
    handlebars.compile(
        `<div class="card-columns card-popular m-3">
           {{#each games}}
                <div class="card">
                    {{#if urlImage}}
                        <img class="card-img-top img-fluid" src="{{urlImage}}" alt="Card image cap">
                    {{/if}}
                    <div class="card-body text-center">
                        <a href={{url}}>{{name}}</a>
                        <br><br><button id="butAddGame" class="btn btn-primary" value={{id}}>Add Game</button><br><br>
                        <p class="card-text">{{summary}}</p>
                        {{#if total_rating}}
                            <div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: {{total_rating}}%">{{total_rating}}</div>
                            </div>
                        {{/if}}
                    </div>
                </div>
            {{/each}}
        </div>`
    );

module.exports = {
    getView: () => 
        `<h1>Search For A Game To Add</h1>
        
        <div id='addGame'></div>`,
    
    authenticationRequired: true,

    run: (request) => {
        return api.addGameToGroup(request.args[2], request.args[1])
        .then(response => {
            if(!response.error) {
                alert(`New Game successfully added`);
                location.assign(`#detailsGroup/${request.args[0]}/${request.args[1]}`);
            } else {
                return Promise.reject(response.error);
            }
        })
        .catch((error) => {
            alert(error);
        })
    }
}
                