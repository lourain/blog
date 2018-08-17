var express = require('express')
var router = express.Router()
var Article = require('../lib/article')

router.get('/',function (req,res) {
    new Article().getTags(function (err,docs) {
        if(err){
            req.flash('err',err)
            return res.redirect('/')
        }
        res.render('tags',{
            title:'标签',
            articles:docs,
            user:req.session.user,
            success:req.flash('success').toString(),
            err:req.flash('err').toString()
        })
    })
})
router.get('/:tag',function (req,res) {
  new Article().getTag('蜗居',function(err,docs){
    if(err){
        req.flash('err',err)
        return res.redirect('/')
    }
    res.render('tag',{
        title:`TAG:${req.params.tag}`,
        articles:docs,
        user:req.session.user,
        success:req.flash('success').toString(),
        err:req.flash('err').toString()
    })
  })  
})
module.exports = router