var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// express session
const session = require('express-session');
// generates a random string for the
const randomString = require('randomstring');

var Promise = require('promise');
//var helpers = require('./helper');
var pathView = __dirname + '/public/';
const configjs = require('./config/config.js');
var config = configjs.config();
const qs = require('querystring');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8383;
var router = express.Router();

router.use(function (req, res, next) {
    console.log('api testing..');
    next();
});

// initializes session
app.use(
    session({
        secret: randomString.generate(),
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    })
);

app.get('/login', (req, res, next) => {
    req.session.csrf_string = randomString.generate();
    const githubAuthUrl = 'https://github.com/login/oauth/authorize?' +
        qs.stringify({
            client_id: config.clientID,
            redirect_url: config.url,
            state: req.session.csrf_string,
            scope: 'user:email'
        });
    res.redirect(githubAuthUrl);
});


app.all('/redirect', (req, res) => {
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
});

app.get('/user', (req, res) => {
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
});

app.get('/home', (req, res) => {
    console.log('inside home : ' + config.app_name);
    res.sendFile(pathView + 'index.html');
})

require('./app/routes/git.routes.js')(app);

//starting the server
app.listen(port);
console.log('Server running at Port ' + port);