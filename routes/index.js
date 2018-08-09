var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  res.render('index', { title: '这是主页', user: req.session.user, success: req.flash('success').toString(), err: req.flash('err').toString()});
});

module.exports = router;
