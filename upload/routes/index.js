var express = require('express');
var router = express.Router();
var multer  = require('multer')
var pg = require('pg')
var connect = require('../connection')
const fs = require('fs')
const path = './public/data/1566658296261-pasris.jpg'

var pool = new pg.Pool(connect.config);

var  tenfile;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
    tenfile = Date.now() + '-' + file.originalname;
  }
})
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('anhsp') ,function(req, res, next) {
  pool.connect(function(err,client,done) {
        if(err){
          return console.log('erroe fetching',err);
        }
        client.query("INSERT INTO img(name,img) VALUES('tuan','"+tenfile+"')",function(err, result) {
          done();
          if(err){
            return console.log('err query',err);
          }
          console.log(tenfile)
          res.redirect("./showall")
        });
      });
});

router.get('/showall',function(req, res, next) {
  res.render('showall', { link: "./data/"+ tenfile});
});

router.post('/showall',function(req, res, next) {
  try {
    fs.unlinkSync(path)
    //file removed
  } catch(err) {
    console.error(err)
  }
});

module.exports = router;

/*-------------------------------------------------------- */
// router.get('/', function(req, res, next) {
//  if(req.cookies.ten != " " &&req.cookies.mk != " "){
//   res.render("index.ejs",{title: "login", show:"hide",user: req.cookies.user,pw: req.cookies.mk})
//  }
//  else{
//     res.render("index.ejs",{title: "login", show:"hide",user: req.cookies.user})
//  }
// });

// router.post('/', function(req, res, next) {
//   var remenber = req.body.remember;
//   var name = req.body.login;
//   var mk = req.body.password;
//   console.log("ten: " + name + "pass: " + mk);
//   if(remenber == "on")
//   {
//     res.cookie('user', name);
//     res.cookie('mk', mk);
//   }
//   pool.connect(function(err,client,done) {
//     if(err){
//       return console.log('erroe fetching',err);
//     }
//     client.query("Select * from account where ten = '"+ name +"' and mk ='"+ mk +"' ",function(err, result) {
//       done();
//       if(err){
//         return console.log('err query',err);
//       }
//       if((result.rows).length == 1){
//          res.redirect('http://localhost:3000/listproduct')
//       }
//       else{
//         console.log("sai")
//         res.render('index', {title:"login",show :"show",user: req.cookies.user })
//       }
//     });
//   });
// });

// /* GET product page. */
// router.get('/listproduct', function(req, res, next) {
//   
// });


// router.get('/edit/:id', function(req, res, next) {
//   pool.connect(function(err,client,done) {
//     if(err){
//       return console.log('erroe fetching',err);
//     }
//     client.query("SELECT * FROM product where id ='"+ req.params.id +"'",function(err, result) {
//       done();
//       if(err){
//         return console.log('err query',err);
//       }
//        res.render('edit',{info: result})
//       // res.render('listproduct', {danhsach : result });
//     });
//   });
//  });

 
//  router.post('/edit/:id', function(req, res, next) {
//   var name = req.body.ten;
//   var price = req.body.price;
//   var img = req.body.img;
//   var ds = req.body.ds;
  
//   pool.connect(function(err,client,done) {
//     if(err){
//       return console.log('erroe fetching',err);
//     }
//     client.query("Update product set ten = '"+ name +"',price ='"+ price+"', img = '"+ img +"', description = '" + ds +"' where id =" + req.params.id +" ",function(err, result) {
//       done();
//       if(err){
//         return console.log('err query',err);
//       }
//       if(result.rowCount ==1 ){
//          res.redirect('http://localhost:3000/listproduct')
//       }
//       else{
//         console.log("fail")
//       }
//     });
//   });
// });

// router.get('/add', function(req, res, next) {
//   res.render("add");
//  });

//  router.post('/add', function(req, res, next) {
//   var name = req.body.ten;
//   var price = req.body.price;
//   var img = req.body.img;
//   var ds = req.body.ds;
  
//   pool.connect(function(err,client,done) {
//     if(err){
//       return console.log('erroe fetching',err);
//     }
//     client.query("Insert into product(ten, price, img, description) values('"+ name +"','"+ price+"','"+ img +"','" + ds+ "')",function(err, result) {
//       done();
//       if(err){
//         return console.log('err query',err);
//       }
//       if(result.rowCount ==1 ){
//          res.redirect('http://localhost:3000/listproduct')
//       }
//       else{
//         console.log("fail")
//       }
//     });
//   });
// });


// router.get('/delete/:id', function(req, res, next) {
//   pool.connect(function(err,client,done) {
//     if(err){
//       return console.log('erroe fetching',err);
//     }
//     client.query("DELETE FROM product where id ='"+ req.params.id +"'",function(err, result) {
//       done();
//       if(err){
//         return console.log('err query',err);
//       }
//        res.redirect('./listproduct')
//     });
//   });
//  });

// router.get('/registration', function(req, res, next) {
//   res.render('registration')
//  });

// module.exports = router;
