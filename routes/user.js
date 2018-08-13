var express = require('express');
var router = express.Router();
var User = require('../lib/user')
var Article = require('../lib/article')

router.get('/:name', function (req, res, next) {
  //检查用户是否存在
  let user_name = req.params.name
  new User().get({ name: user_name }, function (err, users) {
    if (err) throw err
    if (!users[0].name) {
      req.flash('err', '用户不存在！')
      return res.redirect('/')
    }
    //查询并返回该用户的文章
    new Article().getAll({ name: user_name }, function (docs) {
      res.render('user', {
        user: req.session.user,
        title: user_name,
        success: req.flash('success').toString(),
        err: req.flash('err').toString(),
        articles: docs
      })
    })
  })
})
router.get('/:name/:day/:title',function (req,res) {
  new Article().getOne({ name: req.params.name,time:req.params.day,title:req.params.title},function (doc) {
    res.render('article',{
      title: req.params.title,
      articles:doc,
      user:req.session.user,
      success:req.flash('success').toString(),
      err:req.flash('err').toString()
    })
  })
})

module.exports = router;
