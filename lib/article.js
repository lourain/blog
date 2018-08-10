var mongo = require('../db').article

class Article {
    constructor(art){
        this.name = art && art.name,
        this.titile = art && art.title,
        this.content = art && art.content
    }
    save(callback){
        let date = new Date()
        let time = {
            date:date,
            year:date.getFullYear(),
            month: `${date.getFullYear()}-${date.getMonth()+1}`,
            day: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            minute: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()<10?0+date.getMinutes():date.getMinutes()}`
        }

        var arts = {
            name:this.name,
            time:time,
            title:this.title,
            content:this.content
        }
       
        let instance = new mongo(arts)
        instance.save(function (err,arts) {
            return callback && callback(err,arts)
        })
    }
    get(condition,callback){
        mongo.find(condition,callback)
    }
}

module.exports = Article