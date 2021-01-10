const api = require('../covida-api.js');
const auth = require('../auth.js');
const global = require('../global.js');

const handlebars = global.handlebars;

const modListContentsTemplate =
    handlebars.compile(
        `<div class="card-columns card-groups m-3">
            {{#each groups}}
                <div class="card text-center">
                    <div class="card-header bg-primary">
                        {{name}}
                        <a href="#editGroup/{{name}}" class="float-left text-dark">
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                    <div class="card-body text-center">
                        <p class="card-text"><em>{{desc}}</em></p>
                        
                    </div>
                    <div class="card-footer text-muted">
                        {{#each games}}
                            <img class="card-img-top img-fluid" src="{{urlImage}}" alt="Card image cap">
                            <div class="card-body text-center">
                                <a href={{url}}>{{name}}</a>
                                <p class="card-text">{{summary}}</p>
                                {{#if total_rating}}
                                    <div class="progress">
                                        <div class="progress-bar bg-primary" role="progressbar" style="width: {{total_rating}}%">{{total_rating}}</div>
                                    </div>
                                {{/if}}
                            </div>
                        {{/each}}
                    </div>
                </div>
            {{/each}}
        </div>`
    );

module.exports = {
    getView: () => {
        let currentUser = auth.getCurrentUser();
        return `<h1>${currentUser}'s Groups</h1>
            <div id='groups'>
                ${global.spinnerTemplate}
            </div>`
    },

    authenticationRequired: true,

    run: () => {
        let currentUser = auth.getCurrentUser();
        const itemsContainer = document.querySelector('#groups');
        api.getGroups(currentUser)
        .then(allGroups => {
            if (!allGroups.error) {
                itemsContainer.innerHTML = modListContentsTemplate({
                    groups: allGroups
                })
            } else {
                return Promise.reject(allGroups.error);
            }
        })
        .catch(error => alert(error));
        //alert("You don't have any group yet!")
    }
}
