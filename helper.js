var helpers = {};
var https = require('https');

helpers.getRepos = (username, authToken) => {

    return new Promise((resolve, reject) => {

        var repos = [];
        var optionGit = {
            'protocol': 'https:',
            'hostname': 'api.github.com',
            'path': '/users/' + username + '/repos',
            'method': 'GET',
            'headers': {
                'user-agent': 'node.js',
                'Authorization': 'token '+authToken //insert the github auth access token
            }
        };

        var request = https.request(optionGit, (response) => {

            var body = '';
            response.on('data', function (chunk) {
                body += chunk.toString('utf8');
            });

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
                resolve(repos);
            });
        });
        request.end();
    });
}

helpers.getReposNoAuth = (username) => {

    return new Promise((resolve, reject) => {

        var repos = [];
        var optionGit = {
            'protocol': 'https:',
            'hostname': 'api.github.com',
            'path': '/users/' + username + '/repos',
            'method': 'GET',
            'headers': {
                'user-agent': 'node.js'
            }
        };

        var request = https.request(optionGit, (response) => {

            var body = '';
            response.on('data', function (chunk) {
                body += chunk.toString('utf8');
            });

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
                resolve(repos);
            });
        });
        request.end();
    });
}

module.exports = helpers;