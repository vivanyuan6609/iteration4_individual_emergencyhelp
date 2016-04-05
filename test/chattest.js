var request = require('supertest')
  , express = require('express')
  , assert = require('assert'),
  moment = require('moment')
  models = require('../models');
var app = require('../app');

describe ('create new post', function(){
it('can creat new post', function(done){
  models.Post.create({
      content: 'HelloWorld',
      timestamp: moment().format('MMMM Do, h:mm:ss a'),
      UserId: 1
  }).then(function(post){
    assert.equal('HelloWorld', post.content);
    done();
  // The correct code is "redirect"
  });
    });
  it('get chat history', function(done){
        models.Post.findAll({include: {model: models.User, as: 'User'}}).then(function(post){
      assert.equal('hello', post[0].content);
      done();
    });
  });
});
describe ('create new post', function(){
it('can creat new post', function(done){
  models.Post.create({
      content: "Hi yuanyuan",
      timestamp: moment().format('MMMM Do, h:mm:ss a'),
      UserId: 2
  }).then(function(post){
    assert.equal('Hi yuanyuan',post.content);
    // The correct code is "redirect"
    done();
    });
  });
});

describe ('chat with someone', function(){
  it('post chat with someone success', function(done){
    models.Chat.create({
        content: 'Test Hello',
        timestamp: moment().format('MMMM Do, h:mm:ss a'),
        from_user: 1,
        to_user: 2
    }).then(function(chat){
        assert.equal('Test Hello',chat.content);
        done();
    });
  });

  it('get chat with someone success', function(done){
    models.Chat.findAll({
         $or: [{$and: [{from_user: 1, to_user: 2}]}, {$and: [{from_user: 2, to_user: 1}]}],
         include: {model: models.User, as: "User"}
    }).then(function(chat){
          assert.equal('Test Hello', chat[0].content);
          done();
    });
  });
});
