var express = require('express');
var router = express.Router();
var coonect = require('../../upload/connection')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  var pool = new pg.Pool(config);
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    client.query("INSERT INTO img(name,img) VALUES('test','test')",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
      console.log(result)
    });
  });
});

module.exports = router;
