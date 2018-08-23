var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var User = require('../lib/user')
var check = require('../lib/check')


router.get('/', check.checkLogin)
router.get('/', function (req, res, next) {
    res.render('login', { title: '这是主页', user: req.session.user, success: req.flash('success').toString(), err: req.flash('err').toString() });
});

router.post('/', function (req, res) {
    //查询mongo是否有此用户
    var name = req.body.name,
        password = req.body.password

    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex')
    let loginUser = new User({
        name: name,
        password: password
    })
    loginUser.get({ 'name': name }, function (err, user) {
        if (err) {
            req.flash('err', err)
            return res.redirect('/login')
        }
        if (!user[0].name) {
            req.flash('err', '该用户不存在！')
            return res.redirect('/login')
        }
        if (password !== user[0].password) {
            req.flash('err', '密码错误')
            return res.redirect('/login')
        }
        //正确登录
        req.session.user = loginUser
        req.flash('success', '登录成功')
        res.redirect('/')

    })
    //查询密码是否正确
})

module.exports = router;