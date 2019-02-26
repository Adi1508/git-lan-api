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

app.get('/home', (req, res) => {
    console.log('inside home : ' + config.app_name);
    res.sendFile(pathView + 'index.html');
})

require('./app/routes/git.routes.js')(app);

//starting the server
app.listen(port);
console.log('Server running at Port ' + port);