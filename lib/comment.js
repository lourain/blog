var mongo = require('../db').article

class Comment{
    constructor(cmt){
        this.name = cmt.name
        this.time = cmt.time
        this.title = cmt.title
    }
    save(comment,callback){
        let cmt = {
            'name':this.name,
            'time.day':this.time,
            'title':this.title,
        }
        mongo.update(cmt, { $push: { 'comments': comment }},callback)
    }
}


module.exports = Comment

