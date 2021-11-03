const mongoose = require ('mongoose')

const ArticleShema = new mongoose.Schema({
    
    title:String,
    content:String,
    author:String,
    image:String,
    createDate: {
        type:Date,
        default : new Date()
    },
    dateCreateDB: {
        type: String}
})

const Article = mongoose.model('Article',ArticleShema)

module.exports = Article