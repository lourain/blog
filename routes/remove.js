var express = require('express')
var router = express.Router()
var check = require('../lib/check')
var Article = require('../lib/article')

//删除文章
router.get('/:name/:day/:title', function (req, res) {
    let url = encodeURI(`/user/${req.params.name}/${req.params.day}/${req.params.title}`)
    new Article().remove({ name: req.params.name, 'time.day': req.params.day, title: req.params.title }, function (err) {
        if (err) {
            req.flash('err', '删除出错了')
            return res.redirect(url)
        }
        req.flash('success', "删除成功")
        res.redirect('/')
    })
})



module.exports = router
