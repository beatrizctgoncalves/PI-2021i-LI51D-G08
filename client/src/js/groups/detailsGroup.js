const api = require('../covida-api.js');
const global = require('../global.js');
const handlebars = global.handlebars;

const modListContentsTemplate =
    handlebars.compile( `
       
        <div class="card-columns card-groups m-1 text-center">
        {{#this}}
        <div class="card">
            <div class="card-header bg-primary">
                {{name}}
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
        {{/this}}
</div>
`);
module.exports  = {

    getView: () => {
        
        return `<h1>Details</h1>
            <div id='groupDetails'>
            </div>`
    },

    authenticationRequired: true,

    run: (req) => {
        const groupDetails = document.querySelector(`#groupDetails`)
        api.getGroupById(req.args[1])
        .then(group => {
            if (!group.error) {
                console.log(group.name);
                groupDetails.innerHTML = modListContentsTemplate({
                     group
                })
            } else {
                return Promise.reject(group.error);
            }
        })
        .catch(error => alert(error));
    }
}