const User = require('../database/models/User')

module.exports = {
    // Middleware authentifié
    // isUser: (req, res, next) => {
    //     // Connecte l'utilisateur dans la base de donné
    //     User.findById(req.session.userId, (err, user) => {
    //         console.log('middleware');
    //         // Si il n'est pas inscrit (ne figure pas dans la base de données)
    //         if (err || !user) return res.redirect('/')
    //         // Poursuivre
    //         else next()
    //     })
    // },
    // Middleware isAdmin
    isAdmin: (req, res, next) => {
        // Connecte l'utilisateur dans la base de donné
        User.findById(req.session.userId, (err, user) => {
            // Si il n'est pas Admin alors rediriger sur la page home
            if (!user || err || !user.isAdmin) return res.redirect('/')
            // Poursuivre
            else next()
        })
    }
}