const mongoose = require('mongoose')

const CarrousselShema = new mongoose.Schema({
    title: {
        type: String
    },
    image: [],
    createDate: {
        type: Date,
        default: new Date()
    }

})

const Carroussel = mongoose.model('Carroussel', CarrousselShema)

module.exports = Carroussel