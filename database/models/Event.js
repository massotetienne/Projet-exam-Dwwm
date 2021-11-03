const mongoose = require ('mongoose')

const EventShema = new mongoose.Schema({
    
    title:String,
    content:String,
    author:String,
    image:String,
    link:String,
    createDate: {
        type:Date,
        default : new Date()
    },
    dateCreateDB: {
        type: String}
})

const Event = mongoose.model('Event',EventShema)

module.exports = Event