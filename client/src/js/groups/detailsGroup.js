const api = require('../covida-api.js');
const global = require('../global.js');
const handlebars = global.handlebars;

const modListContentsTemplate =
    handlebars.compile( `
        <div class="col-lg-6 offset-lg-3">
            <div class="card text-center">
                <div class="card-header bg-primary">
                    Name: {{name}}
                </div>
                <div class="card-body text-center">
                    <p class="card-text"><em>Description: {{desc}}</em></p>
                </div>
                <div class="card-footer text-muted">
                    <div class="card-body text-center">
                        <a href="#searchGame/{{name}}/{{id}}" class="float-left text-blue">
                            <i class="fas fa-plus"></i>
                        </a><br>
                    </div>
                    {{#each games}}
                        <div class="card">
                            {{#if urlImage}}
                                <img class="card-img-top img-fluid" src="{{urlImage}}" alt="Card image cap">
                            {{/if}}
                            <div class="card-body text-center">
                                <div class="card-body text-center">
                                    <a href="#removeGame/{{group_id}}/{{id}}" class="float-right text-pink">
                                        <i class="fas fa-minus"></i>
                                    </a>
                                </div>
                                <a href={{url}}>{{name}}</a>
                                <p class="card-text">{{summary}}</p>
                                {{#if total_rating}}
                                    <div class="progress">
                                        <div class="progress-bar bg-primary" role="progressbar" style="width: {{total_rating}}%">{{total_rating}}</div>
                                    </div>
                                {{/if}}<br>
                            </div>
                        </div>
                    {{/each}}
                </div>
            </div>
        </div>
    `);

module.exports  = {
    getView: () => {
        return `<h1 id='title'></h1>
            <div id='groupDetails'>
            </div>`
    },

    authenticationRequired: true,

    run: (req) => {
        const groupDetails = document.querySelector(`#groupDetails`);
        const title = document.querySelector('#title');
        const name = global.formatName("Details of " + req.args[0]);
        title.innerHTML = name;
        api.getGroupById(req.args[1])
        .then(group => {
            if (!group.error) {
                group.games.map(g => g.group_id = req.args[1])
                groupDetails.innerHTML = modListContentsTemplate({
                    id: group.id,
                    name: group.name,
                    desc: group.desc,
                    games: group.games
                })
            } else {
                return Promise.reject(group.error);
            }
        })
        .catch(error => alert(error));
    }
}