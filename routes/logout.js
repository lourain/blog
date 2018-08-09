var express = require('express')
var router = express.Router()
var check = require('../lib/check')

router.get('/',check.checkNotLogin)
router.get('/',function (req,res) {
    req.session.user = null
    req.flash('success','登出成功')
    res.redirect('/')
})

module.exports = router