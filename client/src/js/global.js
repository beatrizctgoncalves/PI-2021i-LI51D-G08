const handlebars = require('handlebars');

module.exports = {
    logo: require('../images/covida.png').default,

    errorTemplate: (msg) => {
        if (msg) {
            return `<div class="alert alert-danger m-5 text-center" role="alert">
                ${msg}
                </div>`
        } else {
            return `<div class="alert alert-danger m-5 text-center" role="alert">
                Something Went Wrong - Check Your Connection
                </div>`
        }
    },

    successTemplate: (msg) => {
        if (msg) {
            return `
                <div class="alert alert-success m-5" role="alert">
                ${msg}
                </div>
                	`
        } else {
            return `
                <div class="alert alert-success m-5" role="alert">
                Operation Completed Successfully
                </div>
                	`
        }
    },

    noResultsTemplate: (msg) => {
        if (msg) {
            return `
                <div class="alert alert-warning m-5" role="alert">
                    ${msg}
                </div>
                	`
        } else {
            return `
                <div class="alert alert-warning m-5" role="alert">
                    No Results Found
                </div>
                	`
        }
    },
    
    handlebars: handlebars,

    formatName: function(name) {
        return name.replaceAll("%20", " ");
    },

    spinnerTemplate: 
        `<div class="text-center">
		    <div class="spinner-border text-primary m-5" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>`,

    //TODO: colocar a foto de cada jogo
    gamesTemplate: function() {
        return `<div class="card-columns card-popular m-3">
           {{#each games}}
           <div class="card">
                <img class="card-img-top img-fluid" src="{{image}}" alt="Card image cap">
                <div class="card-body text-center">
                    <a href={{url}}>{{name}}</a>
                    <p class="card-text">{{summary}}</p>
                    {{#if total_rating}}
                        <div class="progress">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: {{total_rating}}%">{{total_rating}}</div>
                        </div>
                    {{/if}}
                </div>
            </div>
            {{/each}}
        </div>`;
    }
}
