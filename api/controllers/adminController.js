const Article = require('../../database/models/Article')
const Gallerie = require('../../database/models/Gallerie')
const Event = require ('../../database/models/Event')
const Croquis = require('../../database/models/Croquis')
const Carroussel = require('../../database/models/Carroussel')
const Message = require('../../database/models/message')

module.exports = {

    get: async(req, res) => {
        const dbArticle = await Article.find({})
        const dbGallerie = await Gallerie.find({})
        const dbEvent = await Event.find({})
        const dbCroquis = await Croquis.find({})
        const dbCarroussel = await Carroussel.find({})
        const dbMessage = await Message.find({})
        res.render('admin', {
            layout: 'adminLayout',
            articles: dbArticle,
            galleries: dbGallerie,
            event : dbEvent,
            croquis :dbCroquis,
            carroussel : dbCarroussel,
            message :dbMessage
        })

    }
}