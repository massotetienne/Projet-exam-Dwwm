const mongoose = require ('mongoose')

const GallerieShema = new mongoose.Schema({
    
    title:String,
    author:String,
    content:String,
    image:String,
    createDate: {
        type:Date,
        default : new Date()
    },
    dateCreateDB: {
        type: String}
})

const Gallerie = mongoose.model('Gallerie',GallerieShema)

module.exports = Gallerie