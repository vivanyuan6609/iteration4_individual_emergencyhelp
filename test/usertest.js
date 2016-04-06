var request = require('supertest')
  , express = require('express')
  , assert = require('assert'),
  models = require('../models');;

var app = require('../app');

describe('Join Community API', function(){

    it('can login', function(done){
        var user = {
          "username": "test_user",
          "password": "1234567"
        };
        request(app).post('/users/login')
        .send(user)
        .expect(302, done); // The correct code is "redirect"
    });
});

describe ('set status', function(){
    var Cookies = null;
    it('login before set status', function(done){
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

    it('set status', function(done){
      var user = {
        "status": 1,
        "location": "shanghai"
      };
      var req = request(app).post('/users/status');
      req.cookies = Cookies;
      req
      .send(user)
      .expect(302, done); // The correct code is "redirect"
     });
     it('get metod to set status', function(done){
       var user = {
         "status": 1,
         "location": "shanghai"
       };
       var req = request(app).get('/users/status');
       req.cookies = Cookies;
       req
       .send(user)
       .expect(200, done); // The correct code is "render"
      });
});


describe('Join Community DB', function(){

    it('can join DB', function(done){
      models.User.findOrCreate({
          where: {username: 'yuanyuan'},
          defaults: {password: '123456'}
      }).spread(function(user, created){
        assert.equal('123456', user.password);
        done();
      });
    });

    it('set status DB',function(done) {
        models.User.findOne({where: {username: 'yuanyuan'}}).then(function(user){
          assert.notEqual(user, null);
          // console.log(user);
          user.status = 1;
          user.location = 'tokyo';
          user.save()
          .then(function(user){
            // console.log(user);
            assert.equal(user.status, 1);
            done();
          });
        });
    });
});
describe('User login',function(){
  it('logout success', function(done){
  request(app).get('/users/login').expect(200, done);
  });
});
describe('User logout',function() {
    describe('Getlogout if login ', function () {
        var Cookies = null;
        it('login before', function (done) {
            var user = {
                "username": "test_user",
                "password": "1234567",
                
            };
            request(app).post('/users/login')
                .send(user)
                .expect(302) // The correct code is "redirect"
                .end(function (err, res) {
                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    console.log(Cookies);
                    done();
                });
        });
        it('logout  success', function (done) {
            var user = {
                "status": 1,
                "location": "shanghai",
                "loggedin": "1"
            };
            var req = request(app).get('/users/status');
            req.cookies = Cookies;
            req
                .send(user)
                .expect(200, done); // The correct code is "render"
        });
    });
});
