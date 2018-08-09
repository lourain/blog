
let check = {
    checkLogin: function (req, res, next) {
        if (req.session.user) {
            req.flash('err', '已登录')
            res.redirect('/')
        } else {
            next()
        }
    },
    checkNotLogin: function (req, res, next) {
        if (!req.session.user) {
            req.flash('err', '未登录')
            res.redirect('/login')
        } else {
            next()
        }
    }
}
module.exports = check