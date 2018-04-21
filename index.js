var express = require('express');
var app  = express();
var bodyParser = require('body-parser');
var https=require('https');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8383;

var router = express.Router();

router.use(function(req, res, next){
    console.log('api testing..');
    next();
});

var count=0;

router.route('/api/:username')
        .get(function(req, res){
            var userName = req.params.username;

            var optionGit = {
                host: 'api.github.com',
                path: '/users/'+userName+'/repos',
                method: 'GET',
                headers: {'user-agent' : 'node.js'}
            };

            var body = '';
            var repos = [];
            
            var request = https.request(optionGit, function(response){
                console.log('inside request 1');
                response.on('data', function(chunk){
                    body+=chunk.toString('utf8');
                });
                response.on('end', function(){
                    var obj = JSON.parse(body.toString());

                    var keys = Object.keys(obj);
                    for(var i =0; i<keys.length; i++){
                        var key = keys[i];
                        var value = obj[key];

                        var subkey = Object.keys(value);
                        for(var k = 0; k< subkey.length; k++){
                            var subValues = value['name'];
                        }
                        repos.push(subValues);
                    }
                    //res.json({message:repos});

                    for(var g = 0; g<repos.length; g++){
                        
                        console.log('repos: '+repos[g]);

                        var optionGitLanguage = {
                            host: 'api.github.com',
                            path: '/repos/'+ userName + '/' + repos[g] + '/languages',
                            method: 'GET',
                            headers: {'user-agent': 'node.js'}
                        };

                        //console.log('path2: '+optionGitLanguage.path);

                        var o = {};
                        var key = 'list of languages in your public repos';
                        o[key]=[];
                        var finalArray = [];
                        
                        var request2 = https.request(optionGitLanguage, function(response){
                            console.log('inside request 2');
                            var body2 = '';
                            response.on('data', function(chunk){
                                body2+=chunk.toString('utf8');
                            });
                            response.on('end', function(){
                                var obj2 = JSON.parse(body2.toString());
                                
                                var keys2 = Object.keys(obj2);
                                for(var h = 0; h<keys2.length; h++){
                                    var key2 = keys2[h];
                                    var value2 = obj2[key2];
                                    console.log(h+' '+key2);
                                    var data = {
                                        repo: repos[a],
                                        languages: key2
                                    }
                                }
                                o[key].push(data);
                                console.log(JSON.stringify(o));
                            });
                        });
                        request2.end();
                    }
                }); 
            });
            request.end();
        });

//register the routes
app.use('/v1', router);

//starting the server
app.listen(port);
console.log('Server running at Port '+port);

