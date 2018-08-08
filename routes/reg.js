var express = require('express');
var router = express.Router();

// var crypto = require('crypto')
// var User = require('../models/user')


router.get('/', function (req, res, next) {
    res.render('reg', { title: '注册' });
});
router.post('/', function (req, res, next) {
    let name = req.body.name,
    password = req.body.password,
    email = req.body.email
})

module.exports = router;