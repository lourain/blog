var express = require('express')
var router = express.Router()
var Article = require('../lib/article')
router.get('/',function (req,res) {
    new Article().search(req.query.keyword,function (err,articles) {
        if(err){
            req.flash('err',err)
            return res.redirect('/')
        }
        res.render('search',{
            title:'SEARCH:' + req.query.keyword,
            articles:articles,
            user:req.session.user,
            err:req.flash('err').toString(),
            success:req.flash('success').toString()
        })
    })
})

module.exports = router