var express = require('express')
var router = express.Router()
var Article = require('../lib/article')

router.get('/',function (req,res,next) {
    new Article().getArchive(function (err,article) {
        if(err){
            req.flash('err',err)
            return res.redirect('/')
        }
        res.render('archive',{
            title:'存档',
            articles:article,
            user:req.session.user,
            success:req.flash('success').toString(),
            err:req.flash('err').toString()
        })
    })
})

module.exports = router