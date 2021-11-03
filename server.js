/*
 * App.js
 ******************************/


// Import de module
const
    
    express = require('express'),
    app = express(),
    hbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt'),
    connectFlash = require ('connect-flash'),
    mongoose = require ('mongoose'),
    fileupload = require ('express-fileupload'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo'),
    multer = require ('multer'),
    methodOverride = require('method-override'),
    swaggerUi = require('swagger-ui-express'),
    cookieParser = require('cookie-parser'),
    

    // expressOasGenerator = require('express-oas-generator'),
    port = process.env.PORT || 3000;
    

const{ stripTags, limit,last,limitChar,limitCharacter } = require('./helper/hbs');
const swaggerDocument = require('./api/config/swagger.json')




// ==== dotenv ===== (crypter les clé etc...)
require('dotenv').config()

// Method Overrride
app.use(methodOverride('_method'))

// Cookie-Parser
app.use(cookieParser())



// expressOasGenerator.init(app, {});

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Connecter a MongoDB'))
.catch(err => console.log(err))

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
// 

//==== route ====
app.engine('hbs', hbs({
    helpers: {
        stripTags: stripTags,
        limit: limit,
        last :last,
        limitChar:limitChar,
        limitCharacter:limitCharacter
    },
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.set('view engine', 'hbs');

// ====bodyParser====
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// app.use(fileupload());



// ==== Express====
app.use(express.static('public'));

// Midleware session

app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    res.locals.sess = req.session.sess;
    res.locals.isAdmin = req.session.isAdmin;
    console.log('Sess Locals: ', res.locals.sess)
    console.log("ID Session: " + res.locals.user);
    res.locals.cookie = req.cookies.Cookie;
    next()
})


// Express static permet de diriger un chemin sur un dossier en particulier
// app.use(express.static('public'));



// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
 
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)

// erreur 404

app.use((req, res) => {
    res.render('err404',{
        layout:false
    })
})




// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, () => {
    console.log("le serveur tourne sur le prt: " + port);
});

module.exports = app