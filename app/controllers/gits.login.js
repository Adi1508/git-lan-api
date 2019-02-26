exports.getLogin = (req, res) => {
    const randomString = require('randomstring');
    const qs = require('querystring');

    req.session.csrf_string = randonString.generate();
    const githubAuthUrl = 'https://github.com/login/oauth/authorize?' +
        qs.stringify({
            client_id: process.env.CLIENT_ID,
            redirect_url: /** */d,
            state: req.session.csrf_string,
            scope: 'user:email'
        });
    res.redirect(githubAuthUrl);
}