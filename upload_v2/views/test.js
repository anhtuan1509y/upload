var request = require('request');
function hide(id){
    request.post(
    '/delete/' +id,
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    );
    console.log("chay r")
    var x = document.getElementById(id);
    x.style.display = 'none';
  }