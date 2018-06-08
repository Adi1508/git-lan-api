var helpers = {};
var https = require('https');
var async = require("async");
var fiber = require("fibers");
var http = require('http'); 

helpers.getRepos = (username) => {


    return new Promise((resolve, reject) => {

        var repos = [];
        var optionGit = {
            'protocol': 'https:',
            'hostname': 'api.github.com',
            'path': '/users/' + username + '/repos',
            'method': 'GET',
            'headers': {
                'user-agent': 'node.js',
                'Authorization': 'token '
            }
        };

        var request = https.request(optionGit, (response) => {

            var body = '';
            response.on('data', function (chunk) {
                body += chunk.toString('utf8');
            });

            var finalArray = [];

            response.on('end', () => {
                var obj = JSON.parse(body.toString());

                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var value = obj[key];

                    var subkey = Object.keys(value);
                    for (var k = 0; k < subkey.length; k++) {
                        var subValues = value['name'];
                    }
                    repos.push(subValues);
                }
                //console.log(repos);
                resolve(repos);
            });
        });
        request.end();

    }).then((repos) => {
        //console.log('user: '+username);
        var reps = JSON.stringify(repos);
        var reposArray = JSON.parse(reps);

        //console.log('first then: ' +username+ reposArray);

        var flag=null;
        var o = {};
        var key = 'lan';
        o[key] = [];
        var i =0;

        var urls=[];
        for (var i = 0; i < reposArray.length; i++) {

            var optionGitLanguage = {
                host: 'api.github.com',
                path: '/repos/' + username + '/' + reposArray[i] + '/languages',
                method: 'GET',
                headers: {
                    'user-agent': 'node.js',
                    'Authorization': 'token '
                }
            };

            urls.push(optionGitLanguage);
        }

        var responses = [];
        var completed_requests = 0;

        for (var a=0;a<urls.length;a++) {
            
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
                        console.log(responses);
                        return responses;
                    }
                });
            });
            request2.end();
        }

    });

}

module.exports = helpers;