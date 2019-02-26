exports.user = (req, res) => {
    request.get(
        {
            url: 'https://api.github.com/user/public_emails',
            headers: {
                Authorization: 'token ' + req.session.access_token,
                'User-Agent': 'Login-App'
            }
        },
        (error, response, body) => {
            res.send(
                "<p>You're logged in! Here's all your emails on GitHub: </p>" +
                body +
                '<p>Go back to <a href="./">log in page</a>.</p>'
            );
        }
    );
}