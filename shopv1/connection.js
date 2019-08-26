var express = require('express');
var router = express.Router();
var multer  = require('multer')
var pg = require('pg')

var config = {
  user: 'postgres',
  database: 'shop',
  password: '123',
  host: 'localhost',
  port: 5432,
  max: 10,

};

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
  
  module.exports.config = config;
  module.exports.storage = storage;