module.exports = {
    // Method clearCookie (reset les cookie)
    clearCookie: (req, res) => {
      console.log(req.body)
      // Destruction de notre session
      req.session.destroy(() => {
        // Clear de l'ensemble de nos cookies
        res.clearCookie(`Session`)
        res.clearCookie(`ptiGato`)
        res.clearCookie(`Cookie`)
        // Notre redirection
        res.render('home', {
          clearCookie: 'Vous avez supprimer vos cookie, (sauf le cookie Session que vous avez renouvelez)'
        })
        res.redirect('/')
      })
    },
    // Method newCookie (Ajoute le cookie Cookie)
    newCookie: async (req, res, next) => {
      console.log('test nouveau cookie')
      // Ici on créé un cookie: Cookie avec c'est parametre
      res.cookie('Cookie', {
        domain: '.coucou',
        path: req.url,
        secure: true,
        resave: false
      })
      // res.render('home', {
      //   newCookie: 'Un nouveau cookie "Cookie" vous à été assigné',
      //   CCookie: 'cookie "cookie"'
      // })
      // Notre redirection
      res.redirect('/')
    },
    // Method newCookie (Ajoute le cookie PtiGato)
    newPtiGato: async (req, res, next) => {
      // Le cookie est valable pendant 10s 
      // Temps exprimer en milisecond 
      // Recharger la page et le cookie n'est plus actif
      res.cookie('ptiGato', 'ptiGato', {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 10000
      })
      // res.render('home', {
      //   newPtiGato: 'Un nouveau cookie "ptiGato" vous à été assigné',
      //   CPtiGato: 'cookie "ptiGato"'
      // })
      res.redirect('/')
    },
    // Method clearOneCookie (clear un cookie tous seul)
    cookie: (req, res, next) => {
      console.log(req.body)
  
      // Ici on recupère le req.body.clearCookie de notre formulaire /cookie
      // selon le bouton selectionner notre req.body.??? sera modifier et donc respectera notre condition
      if (req.body.clearCookie) {
  
        console.log('1')
        res.clearCookie(`Cookie`)
        // res.render('home', {
        //   clearCookieCookie: 'Vous avez supprimer le cookie "Cookie" !'
        // })
        res.redirect('/')
  
        // Ici on recupère le req.body.clearPtiGato de notre formulaire /cookie
      } else if (req.body.clearPtiGato) {
  
        console.log('2')
          res.clearCookie(`ptiGato`)
          // res.render('home', {
          //   clearCookiePtiGato: 'Vous avez supprimer le cookie "ptiGato" !'
          // })
          res.redirect('/')
  
      } else {
        console.log('3')
        next()
      }
    },
  }