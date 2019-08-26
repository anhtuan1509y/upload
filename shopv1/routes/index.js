var express = require('express');
var router = express.Router();
var pg = require('pg')
var connect = require('../connection')
var pool = new pg.Pool(connect.config)
/* GET home page. */
router.get('/', function(req, res, next) {
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    client.query("SELECT * FROM product",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
      console.log(result.rows)
      res.render('index',{listSP: result.rows})
    });
  });
});

router.post('/', function(req, res, next) {
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    client.query("SELECT * FROM product",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
      console.log(result.rows)
      res.send("oke")
      //res.render('index',{listSP: result[0]})
    });
  });
});

router.get('/quanly', function(req, res, next) {
 pool.connect(function(err,client,done) {
  if(err){
    return console.log('erroe fetching',err);
  }
  client.query("SELECT * FROM product",function(err, result) {
    done();
    if(err){
      return console.log('err query',err);
    }
    console.log(result.rows)
    res.render('quanly',{listSP: result.rows})
  });
});
});

module.exports = router;
