const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const servicesCreator = require('./covida-services');
const data = require('./igdb-data');
const db = require('./covida-db');
const covidaResponses = require('./covida-responses');
const services = servicesCreator(data, db, covidaResponses)

function userToRef(user, done) {
    done(null, user);
}

function refToUser(userRef, done) {
    services.getUserByName(userRef.username)
    .then(user => {
        done(null, user)
    })
    .catch(() => done("User Unknown"))
}

module.exports = {
    initialize: app => {
        app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: 'iselleic',
            store: new FileStore({logFn: function(){}})
        }));
        app.use(passport.initialize(undefined));
        app.use(passport.session(undefined));

        passport.serializeUser(userToRef);
        passport.deserializeUser(refToUser);
    }
}
