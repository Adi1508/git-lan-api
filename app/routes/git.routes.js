var express = require('express');
var router = express.Router();
const result = require('../controllers/git.controller.js');
const login = require('../controllers/gits.user');
const redirect = require('../controllers/gits.redirect')
const user = require('../controllers/gits.user')

module.exports = (app) => {
    app.use('/showResult', result.getData);

    //app.use('/login', login.getLogin);

    //app.use('/redirect', redirect.redirect);

    //app.use('/user', user.user);
}