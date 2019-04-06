const configjs = require('./../../config/config.js');
var config = configjs.config();
const randomString = require('randomstring');
const qs = require('querystring');

exports.getLogin = (req, res) => {
    req.session.csrf_string = randomString.generate();
    const githubAuthUrl = 'https://github.com/login/oauth/authorize?' +
        qs.stringify({
            client_id: config.clientID,
            redirect_url: config.url,
            state: req.session.csrf_string,
            scope: 'user:email'
        });
    res.redirect(githubAuthUrl);
}