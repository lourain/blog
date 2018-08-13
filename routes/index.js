var express = require('express');
var router = express.Router();
var article = require('../lib/article')
var markdown = require('markdown').markdown
router.get('/', function (req, res, next) {
  new article().getAll(null, function (err, articles) {
    if (err) {
      throw err;
    }
    articles.forEach(article => {
      article.content = markdown.toHTML(article.content)
    });
    res.render('index', { title: '这是主页', user: req.session.user, articles: articles, success: req.flash('success').toString(), err: req.flash('err').toString() });
  })
});

module.exports = router;
