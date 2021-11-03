// DB
const mongoose = require('mongoose');
const Article = require('../database/models/Article')
const path = require('path')
// Config Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const expect = chai.expect;
const app = require('../server');
let request = require('request');


chai.use(chaiHttp)

describe('CHAI // CONTROLLER //  Carroussel', () => {

    beforeEach((done) => {
      Article.deleteOne({}, (err) => { 
        done();           
      });
    });

    it(' ChaiRouter // Get home', (done) => {
      chai.request(app)
      chai.request('http://localhost:3000')
        .get('/')
        .set('Accept', 'application/json')
        // .expect(200)
        .end((err, res) => {
          // console.log(res)
          if (err) return done(err)
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
    
   

    it(' ChaiRouter // Put carousel', (done) => {
      
      let article = new Article({
            title: 'test Chai Edit'
          }),
          articleEdit = {title: 'test Chai Edit 2'}
      chai.request(app)
        .post('/carroussel/edit/:id' + article.id)
        .send(articleEdit)
        .end((err, res) => {
            res.should.be.a('object');
            done();
        });
    });

    it(' ChaiRouter // Delete carousel', (done) => {
      let article = new Article({
        title: 'test Chai Delete'
      })
      chai.request(app)
        .delete('/carroussel/edit/:id' + article.id)
        .end((err, res) => {
            res.should.be.a('object');
            done();
        });
    });

});