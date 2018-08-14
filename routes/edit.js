var express = require('express')
var router = express.Router()
var check = require('../lib/check')
var Article = require('../lib/article')

router.get('/:name/:day/:title', check.checkNotLogin)
router.get('/:name/:day/:title', function (req, res, next) {
    new Article().getOne({ name: req.params.name, 'time.day': req.params.day, title: req.params.title }, function (doc) {
        res.render('edit', {
            title: '编辑',
            success: req.flash('success').toString(),
            err: req.flash('err').toString(),
            doc: doc,
            user: req.session.user,
        })
    })
})
//修改文章
router.post('/:name/:day/:title', function (req, res) {
    let url = encodeURI(`/user/${req.params.name}/${req.params.day}/${req.params.title}`)
    new Article().update({ name: req.params.name, 'time.day': req.params.day, title: req.params.title }, { content: req.body.content },function(err){
        if(err){
            req.flash('err','修改出错！')
            return res.redirect(url)
        }
        req.flash('success','修改成功')
        res.redirect(url)
    })
})

module.exports = router