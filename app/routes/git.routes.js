module.exports = (app) => {
    const gits = require('../controllers/git.controller.js');

    app.get('/showResult', gits.getData);

    app.get('/login', gits.getLogin);

    app.all('/redirect', gits.redirect);

    app.get('/user', gits.user);

}