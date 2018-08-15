var mongo = require('../db').article

class Comment{
    constructor(cmt){
        this.name = cmt.name
        this.time = cmt.time
        this.title = cmt.title
        // this.comment = cmt.comment || []
    }
    save(comment,callback){
        let cmt = {
            'name':this.name,
            'time.day':this.time,
            'title':this.title,
            // 'comment':this.comment
        }
        // let query = Object.assign(cmt)
        // delete query.comment
        mongo.update(cmt, { $push: { 'comments': comment }},callback)
    }
}


module.exports = Comment

