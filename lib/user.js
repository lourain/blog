const mongo = require('../db').users

class User {
    constructor(user) {
        user = user || {}
        this.name = user.name
        this.password = user.password
        this.email = user.email
    }
    save(callback) {
        let user = {
            name: this.name,
            password: this.password,
            email: this.email
        }
        const instance = new mongo(user)
        instance.save(function (err) {
            return callback && callback(err,user)
        })
    }
    get(condition, callback) {
        mongo.find(condition, callback)
    }
}
module.exports = User