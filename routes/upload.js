var express = require('express')
var router = express.Router()
var check = require('../lib/check')
var multer = require('multer')
var path = require('path')
var fs = require('fs')

var dest_path = path.join(__dirname, '../', '/public/images')

//上传配置
var upload = multer({
    dest: dest_path,
    rename: function (fieldname, filename) {
        return filename;
    }
})
//重命名上传文件
function rename(oldpath,newname) {
    fs.rename(oldpath,newname,err=>{
        if(err)  throw err
        console.log('rename success!');
    })
}
router.get('/',check.checkNotLogin)
router.get('/', function (req,res,next) {
    res.render('upload',{title:"文件上传",user:req.session.user,success:req.flash('success').toString(),err:req.flash('err').toString()})
})
router.post('/', upload.any(),function (req,res) {
    console.log(req.files);
    rename(`${dest_path}\\${req.files[0].filename}`,`${dest_path}\\${req.files[0].originalname}`)
    req.flash('success','上传成功')
    res.redirect('/upload')
})

module.exports = router 