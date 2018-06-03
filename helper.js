var helpers = {};
var https = require('https');
var async = require("async");
var fiber = require("fibers");
//var EventEmitter = require("events").EventEmitter;
//var repData = new EventEmitter();

helpers.getRepos = (username) => {


    return new Promise((resolve, reject)=>{

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
                console.log(repos);
                resolve(repos);
            });
        });
        request.end();
      
    }).then((repos)=>{

        var reps = JSON.stringify(repos);
        var reposArray = JSON.parse(reps);

        console.log('first then: '+reposArray);

        var o = {};
            var key = 'lan';
            o[key] = [];

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

            var request2 = https.request(optionGitLanguage, function (response) {

                var body2 = '';
                response.on('data', function (chunk) {
                    body2 += chunk.toString('utf8');
                });
                response.on('end', function () {
                    o[key].push(JSON.stringify(body2));
                });
            });
            request2.end();
        }
        console.log(o);

    }).then((array)=>{
        
        console.log("second then: "+array);

    })


    /*return new Promise((resolve, reject) => {
        

        //console.log(optionGit.path);

        
                

                //console.log(reposArray);

                for (var i = 0; i < reposArray.length; i++) {

                    var optionGitLanguage = {
                        host: 'api.github.com',
                        path: '/repos/' + username + '/' + reposArray[i] + '/languages',
                        method: 'GET',
                        headers: {
                            'user-agent': 'node.js',
                            'Authorization': 'token 48284cb2a28e434813ae926bfdedd9f8236aa692'
                        }
                    };

                    var o = {};
                    var key = 'lan';
                    o[key] = [];

                    var request2 = https.request(optionGitLanguage, function (response) {

                        var body2 = '';
                        response.on('data', function (chunk) {
                            body2 += chunk.toString('utf8');
                        });
                        response.on('end', function () {
                            o[key].push(JSON.stringify(body2));
                            //console.log(JSON.stringify(o));
                            //repData = JSON.stringify(o);
                            //repData.emit('update');
                        });
                        //console.log(JSON.stringify(o));
                        //resolve(JSON.stringify(o));
                    });
                    request2.end();
                }
                //console.log(o.length);
                console.log(JSON.stringify(o));
                /*repData.on('update', function () {
                    console.log(repData);
                })*/
                //resolve(repos);

            //});

        //});

        // Bind to the error event so it doesn't get thrown
        //request.on('error', function (e) {
          //  reject(e);
        //});

        //request.end();
    //});

}



/*helpers.funCall = (reps, username) => {
    var arr = [];

    return new Promise((resolve, reject) => {
        var repos = JSON.stringify(reps);
        var reposArray = JSON.parse(repos);

        for (var i = 0; i < reposArray.length; i++) {

            helpers.getInfo(reposArray[i], username).then((data) => {
                var resp = JSON.stringify(data);
                arr.push(resp);
            });


        }
        console.log(datares);
        console.log('arr: ' + arr);
    });

}

helpers.getInfo = (reps, userName) => {
    return new Promise((resolve, reject) => {


        var o = {};

        var repos = JSON.stringify(reps);
        var reposArray = JSON.parse(repos);

        for (var i = 0; i < reposArray.length; i++) {

            var optionGitLanguage = {
                host: 'api.github.com',
                path: '/repos/' + userName + '/' + reposArray[i] + '/languages',
                method: 'GET',
                headers: {
                    'user-agent': 'node.js',
                    'Authorization': 'token 48284cb2a28e434813ae926bfdedd9f8236aa692'
                }
            };


            var key = 'lan';
            o[key] = [];

            var request2 = https.request(optionGitLanguage, function (response) {

                var body2 = '';
                response.on('data', function (chunk) {
                    body2 += chunk.toString('utf8');
                });
                response.on('end', function () {
                    o[key].push(JSON.stringify(body2));

                });
                //console.log(JSON.stringify(o));
                //resolve(o);
            });
            request2.end();
        }

        console.log(JSON.stringify(o));


    });
}*/

module.exports = helpers;