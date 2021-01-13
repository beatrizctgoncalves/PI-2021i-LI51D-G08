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
                        <a href={{url}}>{{name}}</a><br>
                        <a href="#addGame/{{group_name}}/{{group_id}}/{{id}}" class="float-right text-blue">
                            <i class="fas fa-plus"></i>
                        </a><br>
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
        <div class="col-lg-6 offset-lg-3">
            <div class="form-group row">
                <input type="text" class="form-control" id="search" placeholder="Search" required><br><br><br>
                <button id="butSearch" class="btn btn-primary">Search</button>
            </div>
        </div>
        <div id='gameResults'></div>`,
    
    authenticationRequired: true,

    run: (request) => {
        const itemsContainer = document.querySelector('#gameResults');
        const search = document.getElementById("search");
        const butSearch = document.querySelector('#butSearch');

        butSearch.onclick = () => 
        {
            const searchText = search.value;
            if (searchText.length === 0) {
                alert('Please insert a Game Name!');
                return;
            }
            return api.searchGamesByName(searchText)
            .then(gameResult => {
                if(!gameResult.error) {
                    gameResult.map(g => {
                        g.group_name = request.args[0];
                        g.group_id = request.args[1];
                    })
                    itemsContainer.innerHTML = modListContentsTemplate({
                        games: gameResult
                    })
                } else {
                    return Promise.reject(response.error);
                }
            })
            .catch((error) => {
                alert(error);
            })
        }
    }
}