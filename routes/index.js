var express = require('express');
var router = express.Router();
var article = require('../lib/article')

router.get('/', function (req, res, next) {
  new article().getAll(null, function (articles) {
    res.render('index', {
      title: '这是主页',
      user: req.session.user,
      articles: articles, 
      err: req.flash('err').toString(),
      success:req.flash('success').toString()
    });
  })
});

module.exports = router;
