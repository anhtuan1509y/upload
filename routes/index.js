var express = require('express');
var router = express.Router();
var multer  = require('multer')
var pg = require('pg')
const fs = require('fs')
const path = './public/data/1566658296261-pasris.jpg'
var bodyParser = require('body-parser')
/* GET home page. */

var config = {
  user: 'ec2-23-23-173-30.compute-1.amazonaws.com',
  database: 'd2jbqsatcqvrkq',
  password: 'a18b40f17e5d52d44d804d3838f6a2701d5c498177d5dbcaf43128d379db18f0',
  host: 'localhost',
  port: 5432,
  max: 10,
};

var pool = new pg.Pool(config);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

function checkFileUpload(req,file,cd){
  if(!file.originalname.match(/\.(jpg|png|gif)$/)){
    cd(new Error("Chi dc nhap file hinh anh"))
  }else{
    cd(null,true)
  }

}
var upload = multer({ storage: storage,fileFilter: checkFileUpload })

router.get('/', upload.single('anhsp'), function(req, res, next) {
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    client.query("SELECT * FROM img",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
      console.log("Day la so dong thanh cong: "+result.rowCount);
      //console.log(result.rows[0])
      res.render('index',{ds: result.rows})
    });
  });
});


router.get('/add',function(req, res, next) {
res.render('add')
});

router.post('/add', upload.single('avatar'), function (req, res, next) {
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    if(checkSize(req.file.size)){
      client.query("INSERT INTO img(name,img) VALUES('"+ req.body.name +"','./data/"+req.file.originalname+"')",function(err, result) {
        done();
        if(err){
          return console.log('err query',err);
        } 
        res.redirect("../")
      });
    }
    else{
      res.send("Qua so luong cho phep")
    }
  });
})

router.get('/delete/:id', function (req, res, next) {
  //console.log(req.params.id)
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    client.query("SELECT * FROM img where id = '" + req.params.id +"'",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
     var path = "./public/"+result.rows[0].img;
     try {
      fs.unlinkSync(path)
      //file removed
    } catch(err) {
      console.error(err)
    }
    });
  });
  console.log("2")
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    client.query("delete from img where id ='"+ req.params.id+"'",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
      //console.log(result.rows[0])
      if(result.rows[0] == undefined){
        res.redirect('../')
      }
      else{
        res.send("loi r")
      }
    });
  });
})


router.get('/update/:id', function (req, res, next) {
  res.render('update')
})


router.post('/update/:id', upload.single('uAvatar'), function (req, res, next) {
  pool.connect(function(err,client,done) {
    if(err){
      return console.log('erroe fetching',err);
    }
    console.log(req.file.originalname)
    client.query("SELECT * FROM img where img = './data/" + req.file.originalname +"'",function(err, result) {
      done();
      if(err){
        return console.log('err query',err);
      }
      console.log(result)
      if(result.rowCount != 0){
        res.send('anh da ton tai. Vui long nhap anh khac')
      }else{
        if(checkSize(req.file.size)){
          var path;
          pool.connect(function(err,client,done) {
            client.query("SELECT * FROM img where id = '"+ req.params.id +"'",function(err, result) {
              done();
               path = result.rows[0].img;
            });
          });
          console.log("anh chua ton tai")  
          try {
            fs.unlinkSync(path)
               } catch(err) {
          console.error(err)
              }
          pool.connect(function(err,client,done) {
            if(err){
              return console.log('erroe fetching',err);
            }
            client.query("UPDATE img set img = './data/" + req.file.originalname +"' where id = '"+ req.params.id +"'",function(err, result) {
              done();
              if(err){
                return console.log('err query',err);
              }
              console.log("update success")
              });
          });
        }
        else{
          res.send("Qua kich co cho phep")
        }
      }
      });
  });
})
function checkSize(size){
  if(size < 2097152){
    return true;
  }
  else{
    return false;
  }
}
module.exports = router;
