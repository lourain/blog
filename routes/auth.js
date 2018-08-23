var express = require('express')
var router=  express.Router()

var configGithub = {
    clientID: '30f9f05961cc67a0a7ba',
    clientSecret: '69ec464fb064dc5f44c1053059e628c8b738aad4',
    callbackURL: "http://localhost:3000/auth/github/callback"
}



module.exports = router