exports.redirect = (req, res) => {
    const code = req.query.code;
    const returnedState = req.query.state;
    if (req.session.csrf_string === returnedState) {
        request.post(
            {
                url:
                    'https://github.com/login/oauth/access_token?' +
                    qs.stringify({
                        client_id: process.env.CLIENT_ID,
                        client_secret: process.env.CLIENT_SECRET,
                        code: code,
                        redirect_uri: redirect_uri,
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