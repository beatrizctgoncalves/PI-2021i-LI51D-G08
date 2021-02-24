'use strict'

const express = require('express')

module.exports = function(services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.post('/signup', signUp)
    router.post('/signin', signIn)

    return router;

    function signUp(req, res) {
        console.log("Create User")
        const username = req.body.username
        const password = req.body.password
        services.createUser(username, password, 'site/')
            .then(() => {
                //User Login
                return new Promise((resolve, reject) => {
                    req.login({ username: username, password: password }, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    })
                })
            })
            .then(() => res.redirect('/'))
            .catch(err => error(err, res))
    }

    function signIn(req, res) {
        console.log("Sign In")
        services.signIn(req)
            .then(() => res.redirect('/'))
            .catch(err => error(err, res))
    }
}

function error(err, res) {
    const status = err.status || 500
    res.status(status).render('error', err)
}