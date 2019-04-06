const configjs = require('./../../config/config.js');
var config = configjs.config();

exports.redirect = (req, res) => {
    const code = req.query.code;
    const returnedState = req.query.state;
    if (req.session.csrf_string === returnedState) {
        request.post(
            {
                url:
                    'https://github.com/login/oauth/access_token?' +
                    qs.stringify({
                        client_id: config.clientID,
                        client_secret: config.clientSecret,
                        code: code,
                        redirect_uri: config.redirectURL,
                        state: req.session.csrf_string
                    })
            },
            (error, response, body) => {
                req.session.access_token = qs.parse(body).access_token;
                res.redirect('/user');
            }
        );
    } else {
        res.redirect('/');
    }
}