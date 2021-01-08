const passport = require('passport');
const session = require('express-session');
const services = require('./covida-services');
const FileStore = require('session-file-store')(session);

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
            store: new FileStore({
                path: './sessions/'
            })
        }));
        app.use(passport.initialize(undefined));
        app.use(passport.session(undefined));

        passport.serializeUser(userToRef);
        passport.deserializeUser(refToUser);
    }
}
