const Article = require('../../database/models/Article')
const fs = require('fs')
const  dateFormat = require  ('dateformat')
const now = new Date();

module.exports = {

    // Method Get 
    get: async (req, res) => {
        const actus = await Article.find({})
        // console.log(actus)

        res.render("actus", {
            actus,    
        })
    },

    post: (req, res) => {
        
        const image = req.file.originalname;
       
        // console.log(req.body)
        // console.log(req.file)

        Article.create({
            
            ...req.body,
            image: `/articles/${image}`,
            name: image,
            dateCreateDB: dateFormat(new Date(), "dd/mm/yyyy à HH:MM")
        },
         
         (err) => {
            if (err) console.log(err)
            res.redirect('/actus')
        })
    },

    deleteOne: async (req, res) => {
        const article = await Article.findById(req.params.id)

        // console.log('ControllerDelete Article')
        // console.log(article)


        fs.unlink('./public' + article.image, (err) => {
            if (err) console.log(err)
            console.log('Mon Image est supprimer !')
            // Method DeleteOne
            // Fonction de suppression de un Articles rechercher par son _id
            Article.deleteOne({
                // On va venir chercher parmis tout les _id celui égale à notre req.params (id recupéré dans l'URL)
                _id: req.params.id,
                // ici nous avons un callback err
            }, (err) => {
                // Si nous avons pas d'erreur alors on redirige
                if (!err) return res.redirect('/actus')
                // Sinon on renvoit l'err
                else res.send(err)
            })
        })

    },
    update: async (req, res) => {

        const q = req.params.id
        const image = req.file.originalname
        const f = req.file
        // console.log(req.body)
        // console.log(req.file)

        if (f) {

          
            const article = await Article.findById(req.params.id);

            fs.unlink('public' + article.image, (err) => {
                if (err) console.log(err)
                console.log('Mon Image est supprimer !')
               

                    Article.findByIdAndUpdate(q, {
                        ...req.body,
                        image: `/articles/${image}`,
                        name: image,
                        dateCreateDB: dateFormat(now, "dd/mm/yyyy à HH:MM")
                    }, (error, post) => {
                        if (err) console.log(err);
                        res.redirect('/actus')

                    })
            
            })
                } else {


                Article.findByIdAndUpdate(q, {


                ...req.body,
                image: `/articles/${image}`,
                name: image
            }, (err) => {
                if (err) console.log(err)
                res.redirect('/actus')
            })


             }
            }
        }
    