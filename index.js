var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var Promise = require('promise');
var helpers = require('./helper');
var pathView = __dirname + '/public/';

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

router.route('/home').get((req, res) => {
    res.sendFile(pathView + 'index.html');
});

router.get('/v1/api/noauth', (req, res) => {
    var userName = req.query.param1;
    helpers.getReposNoAuth(userName).then((reposObject) => {

        return reposObject;

    }).then((obj) => {
        var reps = JSON.stringify(obj);
        var reposArray = JSON.parse(reps);

        var urls = [];
        for (var i = 0; i < reposArray.length; i++) {

            var optionGitLanguage = {
                host: 'api.github.com',
                path: '/repos/' + userName + '/' + reposArray[i] + '/languages',
                method: 'GET',
                headers: {
                    'user-agent': 'node.js'
                }
            };

            urls.push(optionGitLanguage);
        }

        var responses = [];
        var completed_requests = 0;

        for (var a = 0; a < urls.length; a++) {

            var request2 = https.request(urls[a], function (response) {

                var body2 = '';
                response.on('data', function (chunk) {
                    body2 += chunk.toString('utf8');
                });
                response.on('end', function () {
                    responses.push(JSON.parse(body2));
                    completed_requests++;
                    if (completed_requests == urls.length) {
                        // All download done, process responses array
                        res.json(responses);
                    }
                });
            });
            request2.end();
        }

    }).catch((err) => {
        res.json(err);
    });
})

router.get('/v1/api', function (req, res) {
    var userName = req.query.param1;
    var authToken = req.query.param2;
    helpers.getRepos(userName, authToken).then((reposObject) => {

        return reposObject;

    }).then((obj) => {
        var reps = JSON.stringify(obj);
        var reposArray = JSON.parse(reps);

        var urls = [];
        for (var i = 0; i < reposArray.length; i++) {

            var optionGitLanguage = {
                host: 'api.github.com',
                path: '/repos/' + userName + '/' + reposArray[i] + '/languages',
                method: 'GET',
                headers: {
                    'user-agent': 'node.js',
                    'Authorization': 'token ' + authToken //insert the github auth access token
                }
            };

            urls.push(optionGitLanguage);
        }

        var responses = [];
        var completed_requests = 0;

        for (var a = 0; a < urls.length; a++) {

            var request2 = https.request(urls[a], function (response) {

                var body2 = '';
                response.on('data', function (chunk) {
                    body2 += chunk.toString('utf8');
                });
                response.on('end', function () {
                    responses.push(JSON.parse(body2));
                    completed_requests++;
                    if (completed_requests == urls.length) {
                        // All download done, process responses array
                        res.json(responses);
                    }
                });
            });
            request2.end();
        }

    }).catch((err) => {
        res.json(err);
    });
});

//register the routes
app.use('/', router);

//starting the server
app.listen(port);
console.log('Server running at Port ' + port);