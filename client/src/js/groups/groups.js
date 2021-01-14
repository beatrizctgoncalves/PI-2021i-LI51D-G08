const api = require('../covida-api.js');
const auth = require('../auth.js');
const statusCode = require('../covida-status.js');
const global = require('../global.js');

const handlebars = global.handlebars;

const modListContentsTemplate =
    handlebars.compile(
        `<div class="card-columns card-groups m-3">
            {{#each groups}}
                <div class="card text-center">
                    <div class="card-header bg-primary">
                        <a href="#detailsGroup/{{name}}/{{id}}" class = "text-dark">
                            {{name}}
                        </a>
                        <a href="#editGroup/{{name}}/{{id}}" class="float-left text-dark">
                            <i class="far fa-edit"></i>
                        </a>
                        <a href="#removeGroup/{{name}}/{{id}}" class="float-right text-dark">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    </div>
                    <div class="card-body text-center">
                        <p class="card-text"><em>{{desc}}</em></p>
                    </div>
                    <div class="card-footer text-muted">
                        {{#each games}}
                            <div class="card-body text-center">
                                <a href={{url}}>{{name}}</a>
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
            </div>
            <div class = "col text-center">
                <button id="backButton" class="btn btn-primary">Go Back</button>
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
        .catch(error => {
            alert(error.body);
            location.assign('#account');
        })

        const backButton = document.querySelector('#backButton');
        backButton.onclick= () => 
        {
            location.assign('#account');
        }
    }
}
