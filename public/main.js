$('#fetch').click(() => {
    var username = document.getElementById("username").value;
    var token = document.getElementById("token").value;

    if (token === null || undefined === token || token === '') {

        /*var data = {};
        data.param1 = username;

        $.ajax({
            type: 'GET',
            data: data,
            contentType: 'application/json',
            url: 'https://git-lan-api.herokuapp.com/v1/api/noauth',
            dataType: 'json',
            success: (result) => {
                $("#result").empty();
                var returnMovies = JSON.stringify(result);
                var items2 = [];
                var jsonData = JSON.parse(returnMovies);
                var finalData = [];
                for (var i = 0; i < jsonData.length; i++) {
                    var counter = Object.keys(jsonData[i]);
                    if (counter.length === 1 && undefined !== counter) {
                        finalData.push(counter[0]);
                    } else if (counter.length > 1 && undefined !== counter) {
                        for (var k = 0; k < counter.length; k++) {
                            finalData.push(counter[k]);
                        }
                    }
                }
                var lan = [],
                    count = [],
                    prev;

                finalData.sort();
                for (var i = 0; i < finalData.length; i++) {
                    if (finalData[i] !== prev) {
                        lan.push(finalData[i]);
                        count.push(1);
                    } else {
                        count[count.length - 1]++;
                    }
                    prev = finalData[i];
                }

                var countSum = 0;
                for (var h = 0; h < count.length; h++) {
                    countSum = countSum + count[h];
                }
                console.log(countSum);
                for (var g = 0; g < lan.length; g++) {
                    items2.push('<li class="list-group-item">' + lan[g] + '<span class="badge">' + Math.round((count[g] / countSum) * 100) + ' % </span></li>');
                }
                $('#result').append(items2.join(''));
            }
        });*/

        alert('Please enter the auth token.');

    } else {
        var data = {};
        data.param1 = username;
        data.param2 = token;

        $.ajax({
            type: 'GET',
            data: data,
            contentType: 'application/json',
            url: 'https://git-lan-api.herokuapp.com/v1/api',
            dataType: 'json',
            success: (result) => {
                $("#result").empty();
                var returnMovies = JSON.stringify(result);
                var items2 = [];
                var jsonData = JSON.parse(returnMovies);
                var finalData = [];
                for (var i = 0; i < jsonData.length; i++) {
                    var counter = Object.keys(jsonData[i]);
                    if (counter.length === 1 && undefined !== counter) {
                        finalData.push(counter[0]);
                    } else if (counter.length > 1 && undefined !== counter) {
                        for (var k = 0; k < counter.length; k++) {
                            finalData.push(counter[k]);
                        }
                    }
                }
                var lan = [],
                    count = [],
                    prev;

                finalData.sort();
                for (var i = 0; i < finalData.length; i++) {
                    if (finalData[i] !== prev) {
                        lan.push(finalData[i]);
                        count.push(1);
                    } else {
                        count[count.length - 1]++;
                    }
                    prev = finalData[i];
                }

                var countSum = 0;
                for (var h = 0; h < count.length; h++) {
                    countSum = countSum + count[h];
                }
                console.log(countSum);
                for (var g = 0; g < lan.length; g++) {
                    items2.push('<li class="list-group-item">' + lan[g] + '<span class="badge">' + Math.round((count[g] / countSum) * 100) + ' % </span></li>');
                }
                $('#result').append(items2.join(''));
            }
        });
    }

});