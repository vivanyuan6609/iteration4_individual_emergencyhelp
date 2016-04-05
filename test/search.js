var express = require('express');
var router = express.Router();
var dbhandler = new Object();
var sqlite3 = require('sqlite3').verbose();
var dbName = 'ssnoc.dev.db';
var app = require('../app');
var search = require('../routes');
var request = require('supertest')
  , assert = require('assert'),
  models = require('../models');
const SELECT_USER_FOR_SEARCH = "SELECT status, loggedin, username FROM Users WHERE ";
const USER_ORDER_CLAUSE = "ORDER BY loggedin DESC, username COLLATE NOCASE ASC";
const SELECT_ANNOUNCE_FOR_SEARCH = "SELECT content, username, timestamp, a.location FROM Announcements a LEFT JOIN Users u ON a.UserId = u.id WHERE ";
const ANNOUNCE_ORDER_CLAUSE = "ORDER BY timestamp DESC";
const SELECT_MESSAGE_FOR_SEARCH = "SELECT content, username, timestamp FROM Posts p LEFT JOIN Users u ON p.UserId = u.id WHERE ";
const SELECT_PRIVATE_MESSAGE_FOR_SEARCH = "SELECT content, username, timestamp FROM Chats c LEFT JOIN Users u ON c.from_user = u.id WHERE ";
describe('Get search before  login ',function(){
it('success', function(done) {
  request(app).get('/search').expect(302, done);
  })
 });



describe('Search after login', function() {

  it('get search success', function(done){
    var User = {
      "username": "test_user",
      "password": "1234567",
      "status":"shanghai"
    };
    var req = request(app).get('/search');
    req
    .send(User)
    .expect(302, done); // The correct code is "redirect"
   });

it('search by name',function(done){
     var User = {
       "username": "test_user",
       "password": "1234567",
       "status":"shanghai"
     };
  request(app).get('/search').expect(302, done);
});
});
