const request = require('supertest');
const app = require('../server');
const path = require('path');
const assert = require('assert');

describe('SUPERTEST // "/actus"', function() {

  it('Get Home (Page actus)', (done) => {
    request(app)
      .get('/articles/get')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err){
          console.log("error");
          done(err);
        }
        else {
            // console.log(res.header);
            // console.log(res)
            done();
        }
      })
  });

  it('Get Article // (Page Article)', (done) => {
    request(app)
      .get('/articles/get')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err){
          console.log("error");
          done(err);
        }
        else {
            // console.log(res);
            done();
        }
      })
  });

//   it("Post Image // ", (done) => {
    
//     request(app)
//       .post("/articles/post")
//       .field("Content-Type", "multipart/form-data")
//       .field("title", "SuperTest")
//       .attach("imgArticle", path.resolve(__dirname, 
// "../public/articles/caligari.jpg"))
//       .end(function(err, res) {
//         if (err) {
//           throw err;
//         }
//         done();
//       });
//   });

})

