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

router.route('/api/:username')
    .get(function (req, res) {
        var userName = req.params.username;

        helpers.getRepos(userName).then((reposObject) => {

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
                        'Authorization': 'token 224970f5fee2c66066d67ab9f8584b6d006c6135'
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

                        responses.push(body2);
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