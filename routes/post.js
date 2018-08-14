var express = require('express')
var router = express.Router()
var check = require('../lib/check')
var article = require('../lib/article')

router.get('/', check.checkNotLogin)
router.get('/', function (req, res, next) {
    res.render('post', { title: '发表', user: req.session.user, success: req.flash('success').toString(), err: req.flash('err').toString() })
})
router.post('/', function (req, res, next) {
    var name = req.session.user.name,
        title = req.body.title,
        content = req.body.content;

    let newArticle = new article({
        name: name,
        title: title,
        content: content
    })
    newArticle.save(function (err) {
        if (err) throw err
        req.flash('success', '发表成功！')
        res.redirect('/')
    })
})

module.exports = router