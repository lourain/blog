var express = require('express')
var router = express.Router()
var check = require('../lib/check')
var multer = require('multer')
//上传配置
var upload = multer({
    dest: './public/images',
    rename: function (fieldname, filename) {
        return filename;
    }
})
router.get('/',check.checkNotLogin)
router.get('/', upload.array('img', 5),function (req,res,next) {

    res.render('upload',{title:"文件上传",user:req.session.user,success:req.flash('success').toString(),err:req.flash('err').toString()})
})

module.exports = router