var express = require('express')
var router = express.Router()
var check = require('../lib/check')

router.get('/',check.checkNotLogin)
router.get('/',function (req,res,next) {
    res.render('post',{title:'发表',user:req.session.user,success:req.flash('success').toString(),err:req.flash('err').toString()})
})
router.post('/',function (req,res,next) {
    
})
module.exports = router