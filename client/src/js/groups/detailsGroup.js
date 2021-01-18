const api = require('../covida-api.js');
const statusCode = require('../covida-status.js');
const global = require('../global.js');
const handlebars = global.handlebars;

const GroupsAndGamesTemplate =
    handlebars.compile(`
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
                        <a href="#searchGame/{{name}}/{{id}}" class="float-left">
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
                                    <a href="#removeGame/{{group_id}}/{{name}}/{{id}}" class="float-right">
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

const noGamesTemplate =
    handlebars.compile(`
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
                        <a href="#searchGame/{{name}}/{{id}}" class="float-left">
                            <i class="fas fa-plus"></i>
                        </a><br>
                    </div>
                    <div class="card"> 
                        <div class="card-body text-center">
                            <p class="card-text">You do not have any game saved in this group.</p><br>
                            <p class="card-text">Add your first game!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

const gamesTemplate =
    handlebars.compile(global.gamesTemplate());

module.exports  = {
    getView: () => 
        `<h1 id='title'></h1>
        <div id='groupDetails'></div>
        <br><br><br>
        <div class="col-lg-6 offset-lg-3">
            <div class = "col text-center">
                <p class="card-text text-white">Want to see the best Games you have in this Group?</p><br>
            </div>
            <div class="form-group row">
                <div class = "col text-center">
                    <input type="text" class="form-control" id="minimum" placeholder="Rating Minimum" required>
                </div>
                <div class = "col text-center">
                    <input type="text" class="form-control" id="maximum" placeholder="Rating Maximum" required>
                </div>
            </div>
            <div class = "col text-center">
                <button id="getRatingsButton" class="btn btn-primary">Get the Games with the best rating!</button>
            </div>
        </div>
        <div id='getRatings'></div>
        <div class = "col text-center">
            <br><br><button id="backButton" class="btn btn-primary">Go Back</button><br><br>
        </div>`,

    authenticationRequired: true,

    run: (req) => {
        const groupDetails = document.querySelector(`#groupDetails`);
        const title = document.querySelector('#title');
        const name = global.formatName("Details of " + req.args[0]);
        title.innerHTML = name;
        api.getGroupById(req.args[1])
        .then(group => {
            if (!group.error) {
                if(!group.games.length) {
                    groupDetails.innerHTML = noGamesTemplate({
                        id: group.id,
                        name: group.name,
                        desc: group.desc
                    })
                } else {
                    group.games.map(g => g.group_id = req.args[1])
                    groupDetails.innerHTML = GroupsAndGamesTemplate({
                        id: group.id,
                        name: group.name,
                        desc: group.desc,
                        games: group.games
                    })
                }
            } else {
                return Promise.reject(group.error);
            }
        })
        .catch(error => alert(error.body));

        //TODO: this shouldn't appear when there are no games!
        const getRatings = document.querySelector(`#getRatings`);
        const getRatingsButton = document.querySelector('#getRatingsButton');
        const minimum = document.getElementById("minimum");
        const maximum = document.getElementById("maximum");
        getRatingsButton.onclick= () => 
        {
            const minimumValue = minimum.value;
            if (minimumValue.length === 0) {
                alert('Please insert a Minimum Value!');
                return;
            }
            const maximumValue = maximum.value;
            if (maximumValue.length === 0) {
                alert('Please insert a Maximum Value!');
                return;
            }
            return api.getRatingsFromGames(req.args[1], maximumValue, minimumValue)
            .then(gamesResult => {
                if (!gamesResult.error) {
                    getRatings.innerHTML = gamesTemplate({
                        games: gamesResult
                    })
                } else {
                    return Promise.reject(gamesResult.error);
                }
            })
            .catch(error => {
                if(error.status == statusCode.NOT_FOUND) {
                    return getRatings.innerHTML = global.noResultsTemplate();
                } else return getRatings.innerHTML = global.errorTemplate(error.body);
            });
        }

        const backButton = document.querySelector('#backButton');
        backButton.onclick= () => 
        {
            location.assign('#groups');
        }
    }
}