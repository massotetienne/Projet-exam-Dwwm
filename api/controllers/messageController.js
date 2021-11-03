
const  dateFormat = require  ('dateformat');
const Message = require('../../database/models/message');


module.exports = {

    // Method Get 
    get: async (req, res) => {
        const mail = await Message.find({})
        // console.log(actus)

        res.render("admin",{
            mail
        })
    },

    post: (req, res) => {
        
       
        // console.log(req.body)
        // console.log(req.file)

        Message.create({
            
            ...req.body,
            dateCreateDB: dateFormat(new Date(), "dd/mm/yyyy à HH:MM")
        },
         
         (err) => {
            if (err) console.log(err)
            res.redirect('/tarif')
        })
    },
    deleteOne: async (req, res) => {
        const message = await Message.findById(req.params.id)

        // console.log('ControllerDelete Article')
        // console.log(article)
            Message.deleteOne({
                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id,
                // ici nous avons un callback err
            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (!err) return res.redirect('/admin')
                // Sinon on renvoit l'err
                else res.send(err)
            })
        }
    }
