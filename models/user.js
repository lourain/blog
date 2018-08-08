const mongo = require('../db')

class User {
    constructor(user) {
        this.name = user.name
        this.password = user.password
        this.email = user.email
    }
    save() {
        let user = {
            name:this.name,
            password:this.password,
            email:this.email
        }
        const instance = new mongo(user)
        instance.save(err=>{
            if(!err)console.log('success!');
        })
    }
    get(condition) {
    mongo.find(condition,function (err,data) {
            if(err) throw err;
            console.log(data);
        })
    }
}
module.exports = User