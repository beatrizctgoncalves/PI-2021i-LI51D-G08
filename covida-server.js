'use strict'

const path = require('path')
const express = require('express')  //Import the express module
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser') //Import the body-parser module
const authentication = require('./covida-auth')

const app = express() //Create an Express application

authentication.initialize(app);

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})) //Parse application/x-www-form-urlencoded

app.engine('handlebars', expressHbs())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static('views'))

const data = require('./igdb-data')
const db = require('./covida-db')
const covidaResponses = require('./covida-responses')

const services = require('./covida-services')(data, db, covidaResponses)

const webApiCreator = require('./covida-web-api')(services) //Import the covida-web-api
const webSiteCreator = require('./covida-web-site')(services) //Import the covida-web-site
const usersCreator = require('./covida-users')(services) //Import the covida-users

const fetch = require('node-fetch');

app.get('/', function(req, res) {
    let isNotAuth = false;
    let username = "";
    if(!req.user) isNotAuth = true;
    else username = req.user.body[0].username;
    res.status(200).render('home', {
        username: username,
        isNotAuth: isNotAuth
    })
})

app.get('/account', function(req, res) {
    fetch(`http://localhost:8080/api/groups/owner/${req.user.body[0].username}`)
        .then(response => response.json())
        .then(groups => {
            if(groups.error) {
                Promise.reject(groups.error)
            } else {
                if(!req.user.body) {
                    error({ status: 401, body: "You are unauthenticated" }, res);
                } else {
                    let gamesCounter = null;
                    groups.map(g => gamesCounter = gamesCounter + g.games.length)
                    res.status(200).render('account', {
                        username: req.user.body[0].username,
                        groups_length: groups.length,
                        games_length: gamesCounter
                    })
                }
            }
        })
        .catch(error => {
            console.log(error)
            if(error.status === 404) {
                res.status(200).render('account', {
                    username: req.user.body[0].username,
                    groups_length: 0,
                    games_length: 0
                })
            } else {
                const status = error.status || 500
                res.status(status).render('error', error)
            }            
        })
})

app.get('/editGroup/:group_id/:group_name', function(req, res) {
    if(req.user) {
        res.status(200).render('editGroup', {
            username: req.user.body[0].username,
            name: req.params.group_name,
            id: req.params.group_id
        });
    } else {
        error({ status: 401, body: "You are unauthenticated" }, res);
    }
})

app.get('/searchGame/:group_name/:group_id', function(req, res) {
    if(req.user) {
        res.status(200).render('searchGame', {
            username: req.user.body[0].username,
            name: req.params.group_name,
            id: req.params.group_id
        });
    } else {
        error({ status: 401, body: "You are unauthenticated" }, res);
    }
})

app.get('/signIn', function(req, res) {
    res.status(200).render('sign-in');
})

app.get('/signUp', function(req, res) {
    res.status(200).render('sign-up');
})

app.get('/logout', function(req, res) {
    console.log("Logout");
    req.logout();
    res.redirect('/');
})

app.use('/api', webApiCreator)
app.use('/site', webSiteCreator)
app.use('/users', usersCreator)

function error(err, res) {
    const status = err.status || 500
    res.status(status).render('error', err)
}

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`)) //Listening on port 8080
