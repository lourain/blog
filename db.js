const mongoose = require('mongoose');
const db = mongoose.connection
mongoose.connect('mongodb://122.152.219.175:27017', { useNewUrlParser: true,poolSize:20,dbName:'myblog' });
db.on('error',function (err) {
    console.error(err);
})
db.on('open',function () {
    console.log('connect success');
})
//定义一个schema
const Schema = mongoose.Schema
const users = new Schema({
    name: String,
    password: String,
    email: String,
    head:String
})
const article = new Schema({
    name:String,
    title: String,
    tags:Array,
    content: String,
    time: Object,
    comments:Array,
    pv:Number,
    head: String,
})
const MyModel = {
    users:mongoose.model('users', users),
    article: mongoose.model('articles', article)
}
module.exports = MyModel
