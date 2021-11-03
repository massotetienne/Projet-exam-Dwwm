// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    actusController = require('./controllers/actusController'),
    contactController = require('./controllers/contactController'),
    gallerieController = require('./controllers/gallerieController'),
    eventController = require('./controllers/eventController'),
    articleController = require('./controllers/articleController'),
    tarifController = require('./controllers/tarifController'),
    logController = require('./controllers/logController'),
    adminController = require('./controllers/adminController'),
    UserCreateController = require('./controllers/UserCreateController'),
    UserLogin = require ('./controllers/UserLogin'),
    Carroussel = require ('./controllers/Carroussel'),
    nodemailerController = require('./controllers/NodeMailerController'),
    cookieController = require ('./controllers/CookiesControlller')
    // UserAuthSucess = require ('../middleware/UserAuthSucess')
// ==========================================================
// ======Middleware=====

//  var UserAuthSucess = require ('../middleware/UserAuthSucess')

// =====USER==== A-FAIRE ==========

router.route("/user/get")
    .get(UserCreateController.get)

router.route("/user/post")
    .post(UserCreateController.post)

router.route("/user/LoginGet")
    .get(UserLogin.get)

router.route("/user/LoginPost")
    .post(UserLogin.post)

router.route("/user/Logout")
    .get(UserLogin.logout)

// ==============================================

//==== Actus ====
const upload = require('./config/multer')
const uploadCarroussel = require('./config/multerCarrousel')





// method get
router.route("/articles/get")
    .get(actusController.get)
// Formulaire de creation d'article
router.route("/articles/post")
    .post(upload.single('image'), actusController.post)
// Delete Article
router.route("/articles/delete/:id")
    .get(actusController.deleteOne)
// Update
router.route("/articles/update/:id")
    .post(upload.single('image'), actusController.update)

// =====================================================

//===== Gallerie =====

      // page article id 
router.route ("/article/:id")
    .get(articleController.get)
    //   ============   //
router.route("/gallerie/get")
    .get(gallerieController.get)
router.route("/gallerie/post")
    .post(upload.single('image'),gallerieController.post)
router.route("/gallerie/delete/:id")
    .get(gallerieController.deleteOne)
router.route("/gallerie/update/:id")
    .post(upload.single('image'), gallerieController.update)

// =====================================================

//===== Event =====

router.route("/event/get")
    .get(eventController.get)
router.route("/event/post")
    .post(upload.single('image'),eventController.post)
router.route("/event/delete/:id")
    .get(eventController.deleteOne)
router.route("/event/update/:id")
    .post(upload.single('image'), eventController.update)

// =====================================================

//===== Croquis =====

router.route("/croquis/get")
    .get(tarifController.get)
router.route("/croquis/post")
    .post(upload.single('image'),tarifController.post)
router.route("/croquis/delete/:id")
    .get(tarifController.deleteOne)
router.route("/croquis/update/:id")
    .post(upload.single('image'), tarifController.update)

// =====================================================

//===== Carroussel =====

router.route("/carroussel/get")
    .get(Carroussel.get)
router.route("/carroussel/post")
    .post(uploadCarroussel.array('imageCarroussel'),Carroussel.post)
router.route("/carroussel/delete/:id")
    .get(Carroussel.deleteOne)

router.route('/carroussel/edit/:id')
  .put(uploadCarroussel.array('image'), Carroussel.put)


// =====================================================

// ===== Nodemailer =====
// email test

router.route('/message/get')
    .get(nodemailerController.get)

router.route('/nodemailerTest')
    .post(nodemailerController.test)

// // email de verification
// router.route('/verification')
//     .post(nodemailerController.sendVerif)

// // Page de vérification
// router.route('/verify/:id')
//     .get(nodemailerController.verifMail)

// =====================================================

const messageController = require ('./controllers/messageController')

//===== Message =====

router.route('/message/get')
    .get(messageController.get)
router.route('/message')
    .post(messageController.post)
router.route('/message/delete/:id')
    .get(messageController.deleteOne)

// =====================================================

//===== Cookies ===== 

// Delete cookie PtiGato & Cookie
router.route('/cookie')
    .post(cookieController.cookie)

// Clear all cookie
router.route('/clearCookie')
    .get(cookieController.clearCookie)

// Create New Cookie
router.route('/newCookie')
    .get(cookieController.newCookie)

// Create New PtiGato
router.route('/newPtiGato')
    .get(cookieController.newPtiGato)
    
// =====================================================

// Mot de passe oublier
router.route('/lostpassword')
    .post(nodemailerController.lostPassword)

// Page de mot de passe oublier
router.route('/lostpassword/:id')
    .get(nodemailerController.editPassword)
//  Mot de passe oublier
    router.route('/editPassword/:id')
        .post(UserLogin.editPasswordPost)
// email de verification
router.route('/verification')
    .post(nodemailerController.sendVerif)
// Page de vérification
router.route('/verify/:id')
    .get(nodemailerController.verifMail)
    .post(UserLogin.verifMailPost)
// =====================================================
// Home

router.route('/')
    .get(homeController.get)

// Actus
router.route('/actus')
    .get(actusController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

// gallerie
router.route('/gallerie')
    .get(gallerieController.get)

// events
router.route('/event')
    .get(eventController.get)

// events
router.route('/article')
    .get(articleController.get)

// events
router.route('/tarif')
    .get(tarifController.get)

// log
router.route('/log')
    .get(logController.get)

 //midleware//
const auth = require ('../middleware/auth')
// admin
router.route('/admin')
    .get(auth.isAdmin,adminController.get)













module.exports = router;