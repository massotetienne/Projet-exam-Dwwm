const User = require('../../database/models/User')

module.exports = {

        get: async (req, res) => {

            res.render("log", {
                errors: req.flash('registerError'),
                data: req.flash('data')[0]
            })
        },
        post: async (req, res) => {
            // constante pour chercher un utilisateur dans la DB
            const userExist = await User.findOne({email: req.body.email})
            // constante b pour BODY car utiliser plusieur fois 
            const b = req.body
            console.log('Controller Create User (Register)')
            console.log(req.body)

            // ici on demarre la boucle en allant chercher dans la DB si l'utilisateur existe deja 
            //  SI=(IF) oui alors rend le message d'erreur (res.render)"vous ete deja inscris"
            // SINON=(ELSE) alors console log "new user" et passe a la suite 

            if (userExist) {
                console.log('user Exist')
                res.render('log', {
                    error: "Vous etes deja inscrit"
                })
            } else {
                console.log('new user OK');
           // ici on verifie que le MDP 1 et le MDP 2 corresponde 
           // SI request.contenue du formulaire.MDP ce qui cible le MDP 
           // alors on comparre les deux MDP (!==)=(ne correspond pas)
           // rend le message derreur "les mots de passe ne correspondent pas"
           // sinon(else)alors console log ok et passe a la suite  
                if (req.body.password !== req.body.confirmpassword) {

                    console.log('error password')
                    res.render('log', {
                        error: "les mots de passe ne correspondent pas"
                    })
                } else {
                    // ON log si la function est OK
                    console.log('password OK')
                    // On demande la function de Mongo pour créé notre utilisateur
                    if (!b.name || !b.email || !b.password) {
                        res.render('log', {
                            error: "Veuillez remplir tous les champ du formulaire d'inscription"
                        })
                    } else {
                        User.create({
                            ...req.body

                        }, (error, user) => {

                            if (error) {

                                const registerError = Object.keys(error.errors).map(key => error.errors[key].message)

                                req.flash('registerError', registerError)
                                req.flash('data', req.body)
                                console.log(error);
                                res.render('log', {
                                    error: "Veuillez remplir tous les champ du formulaire d'inscription"
                                })
                            }
                            res.render('log', {
                                success: 'Nous sommes heureux de vous compter parmis nos membres !'
                            })
                        })
                    }


                }
            }
        }
    }