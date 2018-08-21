const mongo = require('../db').users
const crypt = require('crypto') 
class User {
    constructor(user) {
        user = user || {}
        this.name = user.name
        this.password = user.password
        this.email = user.email
    }
    save(callback) {
        var md5 = crypt.createHash('md5')
        var md5_email = md5.update(this.email.toLowerCase()).digest('hex')
        var head = `http://www.gravatar.com/avatar/${md5_email}?s=20&d=identicon`
        let user = {
            name: this.name,
            password: this.password,
            email: this.email,
            head:head
        }
        const instance = new mongo(user)
        instance.save(function (err) {
            return callback && callback(err, user)
        })
    }
    get(condition, callback) {
        mongo.find(condition, callback)
    }
}
module.exports = User