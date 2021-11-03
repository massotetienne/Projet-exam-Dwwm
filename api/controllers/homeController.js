const Article = require('../../database/models/Article')
const Carroussel = require('../../database/models/Carroussel')
const  dateFormat = require  ('dateformat')
const now = new Date();

module.exports = {
    
    get: async (req, res) => {
        const actus = await Article.find({})
        const carroussel = await Carroussel.findOne({title: 'home'})


        console.log('Home Page')

        res.render('home',{
            actus,carroussel
        })
    }
}