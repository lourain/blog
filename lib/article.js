var mongo = require('../db').article
var markdown = require('markdown').markdown
class Article {
    constructor(art) {
        art = art || {}
        this.name = art && art.name,    
            this.title = art && art.title,
            this.content = art && art.content
    }
    save(callback) {
        let date = new Date()
        let time = {
            date: date,
            year: date.getFullYear(),
            month: `${date.getFullYear()}-${date.getMonth() + 1}`,
            day: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            minute: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
        }
        var arts = {
            name: this.name,
            time: time,
            title: this.title,
            content: this.content
        }
        let instance = new mongo(arts)
        instance.save(function (err, arts) {
            return callback && callback(err, arts)
        })
    }
    getAll(condition, callback) {
        mongo.find(condition, function (err, docs) {
            if (err) throw err
            docs.forEach(doc => {
                doc.content = markdown.toHTML(doc.content)
            });
            callback && callback(docs)
        })
    }
    getOne(condition, callback) {
        mongo.findOne(condition, function (err, doc) {
            if (err) throw err
            if(!doc) throw new Error('doc为null')
            doc.content = markdown.toHTML(doc.content)
            callback && callback(doc)
        })
    }
    update(condition, doc, callback){
        mongo.update(condition,doc,callback)
    }
    remove(condition, callback){
        mongo.remove(condition,callback)
    }

}

module.exports = Article