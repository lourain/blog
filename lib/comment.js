var mongo = require('../db').article

class Comment{
    constructor(cmt){
        this.name = cmt && cmt.name
        this.day = cmt && cmt.day
        this.title = cmt && cmt.title
        this.comment = cmt && cmt.comment
    }
    save(callback){
        let cmt = {
            'name':this.name,
            'time.day':this.day,
            'title':this.title,
            'comment':this.comment
        }
        let query = Object.assign(cmt)
        delete query.comment
        mongo.update(query,{comment:cmt.comment},callback)
    }
}


module.exports = Comment

