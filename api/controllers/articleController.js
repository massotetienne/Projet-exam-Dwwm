const Gallerie = require('../../database/models/Gallerie')

module.exports = {
    get: (req, res) => {
        Gallerie
            .findById(req.params.id)
            // .populate('comment')
            .exec((err, data) => {
                if(err) console.log(err)
                console.log(data)
                res.render('article', {
                    articleID: data
                })
            })
    }
}