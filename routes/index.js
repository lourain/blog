var express = require('express');
var router = express.Router();
var article = require('../lib/article')

router.get('/', function (req, res, next) {
  new article().getAll(null,function (err,articles) {
    if(err){
      throw err;
    }
    res.render('index', { title: '这是主页', user: req.session.user,articles:articles ,success: req.flash('success').toString(), err: req.flash('err').toString()});
  })
});

module.exports = router;
