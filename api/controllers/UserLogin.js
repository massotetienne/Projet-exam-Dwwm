const bcrypt = require('bcrypt')
const User = require('../../database/models/User')

module.exports = {

    get: (req, res) => {
        res.render('log')
    },
    post: (req, res) => {

        const {
            email,
            password
        } = req.body;
        const sess = req.session;
        const isAdmin = req.session.isAdmin;
        
        User.findOne({
            email
        }, (error, user) => {
            if (user) {
                console.log(user.name);
                console.log(user.isAdmin);
                bcrypt.compare(password, user.password, (error, same) => {
                    if (!same) {
                        res.render('log', {
                            errorLogin: "une erreur est survenue veuillez verifier vos identifiant et mots de passe"
                        })

                    } else {

                        req.session.userId = user._id
                        req.session.sess = {
                            name: user.name,
                            email: user.email,
                            status: user.status,
                            isAdmin: user.isAdmin
                        }
                        // res.redirect('/')
                        if (user.isAdmin === true) {
                            console.log("je suis admin");
                            sess.isAdmin = user.isAdmin

                        }
                        res.render('log', {
                            success: "Bienvenue : " + user.name 
                            
                        })
                    }
                })
            }
        })
    },    
     // Créer un nouveau mot de passe pour l'user
    editPasswordPost: async (req, res) => {
       const user = await User.find({
           // Retrouver un user par son email
           email: req.body.email
       })

       if (!user) {
           console.log("L'utilisateur n'exite pas")
           res.redirect('/')
       } else {
           // Mettre controller pour éditer l'utilisateur
           bcrypt.hash(req.body.password, 10, (error, encrypted) => {
               User.findOneAndUpdate({
                   email: req.body.email
               }, {
                   password: encrypted
               }, (err) => {
                   if (err) console.log(err)

                   console.log(req.body)
                   res.redirect('/')
               })
           })
       }
   },
   verifMailPost: async (req, res) => {
    const user = await User.findById(req.params.id)

    console.log('Verified post controller');

    if (user) {
        User.findByIdAndUpdate(req.params.id, {
            isVerified: true
        }, (err, data) => {
            if (err) console.log(err)
            req.session.isVerified = true
            res.redirect('/')
        })
    } else res.redirect('/')
},
    logout: (req, res) => {

        req.session.destroy(() => {
            res.clearCookie('cookie-sess')
            console.log(req.session)
            res.redirect('/')
        })
    }
}