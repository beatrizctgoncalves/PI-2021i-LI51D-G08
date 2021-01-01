const handlebars = require('handlebars');

function formatName(name) {
    return name.replaceAll("%20", " ");
}

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
    formatName: formatName,
    spinnerTemplate: 
        `<div class="text-center">
		    <div class="spinner-border text-primary m-5" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>`
}
