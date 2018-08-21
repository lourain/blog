var mongo = require('../db').article
var markdown = require('markdown').markdown
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
            docs.forEach(doc => {
                doc.content = markdown.toHTML(doc.content)
            });
            callback && callback(docs)
        })
    }
    getOne(condition, callback) {
        mongo.findOne(condition, function (err, doc) {
            if (err) throw err
            if (!doc) throw new Error('doc为null')
            doc.content = markdown.toHTML(doc.content)
            doc.comments.forEach(comment => {
                comment.comment = markdown.toHTML(comment.comment)
            });
            if (doc) {
                //pv功能
                mongo.update(condition, { $inc: { pv: 1 } }, function (err) {
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
                    docs.forEach(function (doc) {
                        doc.content = markdown.toHTML(doc.content)
                    })
                    callback && callback(docs, total)
                })
        })
    }
    update(condition, doc, callback) {
        mongo.update(condition, doc, callback)
    }
    remove(condition, callback) {
        mongo.remove(condition, callback)
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
    reprint(reprint_from,reprint_to,callback) {
        //找到呗装载得文章得原文档
        mongo.findOne({
            name: reprint_from.name,
            "time.day": reprint_from.day,
            title: reprint_from.title
        }, function (err, doc) {
            if (err) throw err
            var date = new Date()
            let time = {
                date: date,
                year: date.getFullYear(),
                month: `${date.getFullYear()}-${date.getMonth() + 1}`,
                day: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                minute: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
            }
            delete doc._id//注意要删除原来得_id

            doc.name = reprint_to.name;
            doc.head = reprint_to.head;
            doc.time = time;
            doc.title = (doc.title.search(/转载/) > -1 ? doc.title : "[转载]" + doc.title);
            doc.comment = [];
            doc.reprint_info = { reprint_from: reprint_from }
            doc.pv = 0
        })
        //更新呗转载得原文档得reprint_info 内得reprint_to
        mongo.update({
            name: reprint_from.name,
            'time.day': reprint_from.day,
            title: reprint_from.title
        }, {
                $push: {
                    "reprint_info.reprint_to":{
                        name:doc.name,
                        day:time.day,
                        title:doc.title

                    }
                }
            },function (err) {
                if (err) throw err
            })
         mongo.insertMany(doc,function (err,data) {
             if(err) throw err
             callback && callback(data[0])
         })
    }
}

module.exports = Article