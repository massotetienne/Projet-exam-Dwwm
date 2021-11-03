const mongoose = require ('mongoose')

const CroquisShema = new mongoose.Schema({
    
    author:String,
    image:String,
    createDate: {
        type:Date,
        default : new Date()
    },
    dateCreateDB: {
        type: String}
})

const Croquis = mongoose.model('Croquis',CroquisShema)

module.exports = Croquis