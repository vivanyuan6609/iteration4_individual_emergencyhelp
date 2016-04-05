
var request = require('supertest')
  , express = require('express');

var app = require('../app');

describe('Index Page', function() {
  it('Ping index page', function(done) {
    request(app).get('/').expect(200, done);
  })
});
describe('Main Page', function() {
  it('Ping Main page', function(done) {
    request(app).get('/main/').expect(302, done);
  })
});


describe('Get homepage if login ',function(){
  var Cookies = null;
  it('login before', function(done){
      var user = {
        "username": "test_user",
        "password": "1234567"
      };
      request(app).post('/users/login')
      .send(user)
      .expect(302) // The correct code is "redirect"
      .end(function(err, res) {
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        console.log(Cookies);
        done();
      });
  });
  it('get homepages success', function(done){
    var user = {
      "status": 1,
      "location": "shanghai"
    };
    var req = request(app).get('/');
    req.cookies = Cookies;
    req
    .send(user)
    .expect(302, done); // The correct code is "redirect"
   });
   it('get chathistory success', function(done){
     var user = {
       "status": 1,
       "location": "shanghai"
     };
     var req = request(app).get('/main/');
     req.cookies = Cookies;
     req
     .send(user)
     .expect(200, done); // The correct code is "redirect"
    });
});
