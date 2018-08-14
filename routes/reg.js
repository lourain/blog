var express = require('express');
var router = express.Router();

var crypto = require('crypto')
var User = require('../lib/user')
var check = require('../lib/check')

router.get('/', check.checkLogin)
router.get('/', function (req, res, next) {
    res.render('reg', { title: '注册', user: req.session.user, success: req.flash('success').toString(), err: req.flash('err').toString()});
});
router.post('/', function (req, res, next) {
    var name = req.body.name,
        password = req.body.password,
        passwordRepeat = req.body.passwordRepeat,
        email = req.body.email
    //检验两次密码是否一致
    if (password !== passwordRepeat) {
        req.flash('info', '两次输入的密码不一致！')
        return res.redirect('/reg')
    }
    //生成密码的md5
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex')
    let newuser = new User({
        name: name,
        password: password,
        email: email
    })
    newuser.get({ name: name }, function (err, user) {
        if (err) {
            req.flash('err', err)
            return res.redirect('/reg')
        }
        if (user[0]) {
            req.flash('err', '用户已存在！')
            return res.redirect('/reg')
        }
        //如果不存在则新增用户
        newuser.save(function (err, user) {
            if (err) {
                req.flash('err', err)
                return res.redirect('/reg')
            }
            req.session.user = user
            req.flash('success', '注册成功！')
            res.redirect('/')
        })

    })


})

module.exports = router;