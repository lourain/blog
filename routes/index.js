var express = require('express');
var router = express.Router();
var article = require('../lib/article')

router.get('/', function (req, res, next) {
  var page = req.query.p ? parseInt(req.query.p) : 1;

  new article().getFive(null, page, function (articles, total) {
    res.render('index', {
      title: '这是主页',
      user: req.session.user,
      articles: articles,
      err: req.flash('err').toString(),
      success: req.flash('success').toString(),
      page:page,
      isFirstPage: page == 1 ? true : false,
      isLastPage: articles.length + (page - 1) * 5 == total
    });
  })
});

module.exports = router;
