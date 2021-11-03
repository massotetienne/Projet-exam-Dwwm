const Carroussel = require("../../database/models/Carroussel");
const fs = require('fs')
const path = require('path')
module.exports = {

    // Method Get 
    get: async (req, res) => {
        const carroussel = await Carroussel.find({})
        // console.log(actus)

        res.render("/", {
            carroussel,
        })
    },

    post: (req, res) => {
        const arrayCarrousel = []

        req.files.forEach((i) => {
            console.log(i)
            arrayCarrousel.push({
                name: i.originalname,
                path: '/carrousel/' + i.originalname,
                date: Date.now(),
                class: '',
            })
        })

        arrayCarrousel[0].class = 'active'

        // console.log('1')
        // console.log(req.body)
        // console.log('3')
        // console.log(req.files)
        // console.log('4')
        // console.log(arrayCarrousel)

        Carroussel.create({
                title: req.body.title,
                image: arrayCarrousel
            },

            (err) => {
                if (err) console.log(err)
                res.redirect('/admin')
            })

    },
    put: async (req, res) => {
        const carrouselID = await Carroussel.findById(req.params.id)
        // const deleteID = await Carroussel.findOne({title: 'home'})
    
        const arrayCarrousel = []
        console.log('Controller put carrousel')
        // console.log(req.body)
        // console.log(req.params.id)
        console.log(req.body.deleteImg);
        console.log(req.files)

        // Montage du tableau avec req.fiels
        if (req.files) {
            req.files.forEach((i) => {
                console.log(i)
                arrayCarrousel.push({
                    name: i.originalname,
                    path: '/carrousel/' + i.originalname,
                    date: Date.now(),
                    class: '',
                    id: Number
                })
            })
            arrayCarrousel[0].class = 'active'
            arrayCarrousel[0].id = 1
            arrayCarrousel[1].id = 2
            arrayCarrousel[2].id = 3
            console.log(arrayCarrousel)
        }

        // Ajouter image quand le tableau est vide
        if (req.body.addFirstImg) {
            Carroussel.updateOne({
                _id: req.params.id
            }, {
                image: arrayCarrousel
            }, (err) => {
                console.log('nt')
                if (err) console.log(err)
                res.redirect('/admin')
            })
        }

        // En cours (delete One Image)
        // if (req.body.deleteImg) {
        //     console.log(req.body.deleteImg)

        //     console.log('delete single img')
        //     const files = deleteID.image

        //     // boucle de selection de l'objet à supprimer
        //     for (let i = 0; i < files.length; i++) {
        //         const dbFilename = files[i].name
        //         // on ajoute la condition pour que l'élément égale a notre req.body ne sois pas
        //         // re-pusher dans notre tableau que l'on va ensuite inscrir dans la DB
        //         if (dbFilename !== req.body.deleteImg) {
        //             console.log(dbFilename)
        //             // On push les data de notre req.files dans arrayFiles
        //             arrayCarrousel.push({
        //                 name: i.originalname,
        //                 path: '/carrousel/' + i.originalname,
        //                 date: Date.now(),
        //                 class: '',
        //                 id: Number
        //             })
        //         }
        //     }

        //     arrayCarrousel[0].class = 'active'
        //     arrayCarrousel[0].id = 1
        //     arrayCarrousel[1].id = 2
        //     arrayCarrousel[2].id = 3

        //     console.log(arrayCarrousel)

        //     // Carroussel.findByIdAndUpdate(req.params.id, {
        //     //     image: arrayCarrousel
        //     // }, (err, data) => {
        //     //     if(err) console.log(err)
        //     //     console.log(data)
        //     //     res.redirect('/admin')
        //     // })
        // }

        // Rétablir le tableau vide
        if (req.body.deleteImgAll) {
            Carroussel.findByIdAndUpdate(req.params.id, {
                image: []
            }, (err, data) => {
                if (err) console.log(err)
                console.log(data)
                res.redirect('/admin')
            })
        }

    },
    deleteOne: async (req, res, next) => {
        /*
         *  Supprimer notre article
         ***************************/
        const carroussel = await Carroussel.findOne({
            title: 'home'
        })
        const dbCarroussel = await Carroussel.findById(req.params.id),

            query = {
                _id: req.params.id
            },
            files = carroussel.image

        // ici on supprime nos objet de la collection
        Carroussel.deleteOne(
            query,

            // Callback de la fonction mongoose
            (err) => {
                if (err) throw err
                // ici on vient faire une boucle sur les image contenu par l'objet
                for (let i = 0; i < files.length; i++) {
                    if (files) {
                        // ici on supprime toutes les images en relation avec notre objet
                        fs.unlink(path.resolve('/public/carrousel/' + files[i].name), (err) => {
                            if (err) console.log(err)
                        })
                    }
                }
                // puis on redirige
                res.redirect('/')
            })
    },

}