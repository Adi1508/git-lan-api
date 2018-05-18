var helpers = {};

helpers.getRepos = (username)=>{
  return new Promise( (resolve, reject) => {
    var repos = [];

    var optionGit = {
        host: 'api.github.com',
        path: '/users/'+username+'/repos',
        method: 'GET',
        headers: {'user-agent' : 'node.js'}
    };

    var request = https.request(optionGit, (response)=>{
        console.log('inside request 1');
        response.on('data', function(chunk){
            body+=chunk.toString('utf8');
        });
        response.on('end', ()=>{
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
        });
     });
     console.log(repos);
     request.end();
  });
  resolve(repos);
}

helpers.getInfo = (repo) => {
    return new Promise( (resolve, reject) => {
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
                        repo: repos[g],
                        languages: key2
                    }
                }
                o[key].push(data);
                console.log(JSON.stringify(o));
            });
        });
        request2.end();
    });
}

module.exports = helpers;