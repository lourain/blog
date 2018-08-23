var mongo = require('../db').article
class Article {
    constructor(art) {
        art = art || {}
        this.name = art.name,
            this.title = art.title,
            this.tags = art.tags,
            this.head = art.head || ''
        this.content = art.content,
            this.comments = art.comments,
            this.pv = 0
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
            tags: this.tags,
            head: this.head,
            content: this.content,
            comments: this.comment
        }
        let instance = new mongo(arts)
        instance.save(function (err, arts) {
            return callback && callback(err, arts)
        })
    }
    getAll(condition, callback) {
        mongo.find(condition, function (err, docs) {
            if (err) throw err
            
            callback && callback(docs)
        })
    }
    getOne(condition, callback) {
        mongo.findOne(condition, function (err, doc) {
            if (err) throw err
            if (!doc) throw new Error('doc为null')
            if (doc) {
                //pv功能
                mongo.updateOne(condition, { $inc: { pv: 1 } }, function (err) {
                    if (err) throw err
                    callback && callback(doc)
                })
            }
        })
    }
    getFive(condition, page, callback) {
        mongo.countDocuments(condition, function (err, total) {
            mongo.find(condition)
                .skip((page - 1) * 5)
                .limit(5)
                .sort({ time: -1 })
                .exec(function (err, docs) {
                    if (err) throw err
                    callback && callback(docs, total)
                })
        })
    }
    update(condition, doc, callback) {
        mongo.updateOne(condition, doc, callback)
    }
    remove(condition, callback) {
        mongo.deleteOne(condition, callback)
    }
    getArchive(callback) {
        mongo.find(null, {
            name: 1,
            time: 1,
            title: 1
        })
            .sort({ time: -1 })
            .exec(callback)
    }
    getTags(callback) {
        mongo.distinct("tags", callback)
    }
    getTag(tag, callback) {
        mongo.find({ tags: tag }, { time: 1, name: 1, title: 1 })
            .sort({ time: 1 })
            .exec(callback)
    }
    search(keyword, callback) {
        var pattern = new RegExp(keyword, 'i')
        mongo.find({ title: pattern }, { name: 1, time: 1, title: 1 })
            .sort({ time: -1 })
            .exec(callback)
    }
}

module.exports = Article