// // Import de Mongoose
// const mongoose = require('mongoose');


// mongoose.Promise = global.Promise;

// // Config Mongoose
// mongoose.connect('mongodb+srv://squallou:mdp2m3rd3!@cluster0.bm3we.mongodb.net/caligari?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// // Connexion de Mongoose
// mongoose.connection
//   .once('open', (done) => console.log('mongoose connected!'))
//   .on('error', (error) => {
//     console.warn('Error : ', error);
//   });

// // Supprime le contenu de article
// beforeEach((done) => {
//   mongoose.connection.collections.articles.drop(() => {
//     done();
//   });
// });