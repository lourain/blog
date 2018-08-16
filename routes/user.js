var express = require('express');
var router = express.Router();
var User = require('../lib/user')
var Article = require('../lib/article')
var check = require('../lib/check')
var Comment = require('../lib/comment')

router.get('/:name',check.checkNotLogin)
router.get('/:name', function (req, res, next) {
  var page = req.query.p?parseInt(req.query.p):1
  //检查用户是否存在
  let user_name = req.params.name
  new User().get({ name: user_name }, function (err, users) {
    if (err) throw err
    if (!users[0].name) {
      req.flash('err', '用户不存在！')
      return res.redirect('/')
    }
    //查询并返回该用户的文章
    new Article().getFive({ name: user_name },page,function (docs,total) {
      res.render('user', {
        user: req.session.user,
        title: user_name,
        success: req.flash('success').toString(),
        err: req.flash('err').toString(),
        articles: docs,
        page:page,
        isFirstPage:page==1,
        isLastPage: (page - 1) * 5 + docs.length == total 
      })
    })
  })
})

router.get('/:name/:day/:title', check.checkNotLogin)
router.get('/:name/:day/:title',function (req,res) {
  new Article().getOne({ name: req.params.name,'time.day':req.params.day,title:req.params.title},function (doc) {
    res.render('article',{
      title: req.params.title,
      article:doc,
      user:req.session.user,
      success:req.flash('success').toString(),
      err:req.flash('err').toString()
    })
  })
})

//提交评论
router.post('/:name/:day/:title',function (req,res) {
  let date = new Date()
  let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
  let cmt_info = {
    name:req.body.name,
    email:req.body.email,
    website:req.body.website,
    time:time,
    comment: req.body.content
  }
  new Comment({name:req.params.name,time:req.params.day,title:req.params.title}).save(cmt_info,function(err,data){
    if(err){
      req.flash('err','评论失败')
      return res.redirect('back')
    }
    req.flash('success','评论成功')
    res.redirect('back')
  })
})
module.exports = router;
 