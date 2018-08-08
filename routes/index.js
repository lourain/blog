var express = require('express');
var router = express.Router();
// var crypto = require('crypto')
// var User = require('../models/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '这是主页' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { title: '登录' });
});

  
module.exports = router;
