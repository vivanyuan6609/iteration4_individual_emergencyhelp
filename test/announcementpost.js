var request = require('supertest')
  , express = require('express')
  , assert = require('assert'),
  moment = require('moment')
  models = require('../models');
var app = require('../app');
var responserequire = require('response.require');
var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');
/*var req = {};
var next = {};
var res = {
  viewName: ""
  , data : {}
  , render: function(view, viewData) {
      this.viewName = view;
      this.data = viewData;
  }
};*/


describe (' announcement test', function(){
it('can creat new announcement post', function(done){
  models.Announcement.create({
      content: "Hi yuanyuan",
      location: "shanghai",
      timestamp: moment().format('MMMM Do, h:mm:ss a'),
      UserId: 2
  }).then(function(chat){
    assert.equal('Hi yuanyuan',chat.content);
    // The correct code is "redirect"
    done();
    });
  });


describe('User get announcement',function(){
  it(' get annnouncement success', function(done){
  request(app).get('/announcement/').expect(302, done);
});
});

describe ('post announcement', function(){
    var Cookies = null;
    it('login before post announcement', function(done){
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
});
it('user post announcement',function(done){
 var Announcement = {
   content: "Hi yuanyuan",
   location: "shanghai",
   timestamp: moment().format('MMMM Do, h:mm:ss a'),
   UserId: 2
 };
   var req = request(app).get('/announcement/');
   req
   .send(Announcement)
   .expect(302, done); // The correct code is "redirect"
   });
});
describe('get method to post announcement',function(done){
      var Cookies = null;
      it('login before post announcement', function(done){
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
    it ('get method to post announcement',function(done){
      request(app).get('/announcement/').expect(302, done);
    });
  });
