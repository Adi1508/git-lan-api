exports.getData = (req, res) => {

    const helpers = require('../helpers/git.helper.js');
    var https = require('https');
    console.log('inside git.controller.js');
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
        console.log("repos found : " + urls.length);
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
}