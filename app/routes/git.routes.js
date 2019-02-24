module.exports = (app) => {
    const gits = require('../controllers/git.controller.js');

    app.get('/showResult', gits.getData);

}