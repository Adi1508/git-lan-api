var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var Promise = require('promise');
var helpers = require('./helper');

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

var count = 0;

router.route('/api/:username')
    .get(function (req, res) {
        var userName = req.params.username;
        console.log(userName);
        var infoGet;
        helpers.getRepos(userName).then((reposObject)=>{
            console.log(reposObject);
            infoGet = JSON.stringify(reposObject);
            console.log("infoGet : "+ infoGet); 
            res.json(JSON.parse(infoGet));
        }).catch((err)=>{
            res.json(err);
        });
        //console.log('output after helper: '+JSON.parse(infoGet));
    });

router.route('/api')
    .get(function (req, res) {
        res.json({
            message: 'Welcome to git-lan-api, to use the API please pass your username in the url with the API'
        })
    });

//register the routes
app.use('/v1', router);

//starting the server
app.listen(port);
console.log('Server running at Port ' + port);