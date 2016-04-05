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

describe('User get emergency_status',function(){
    it(' get annnouncement success', function(done){
        request(app).get('/emergency/').expect(302, done);
    });
});

describe (' emergency_statuse test', function(){
    it('mergency_statuse ', function(done) {
        models.User.create({
            username: "yuanyuan",
            password: "123456",
            status: 2,
            location: "shanghai",
            
        }).then(function (emergency) {
            assert.equal('2', emergency.status);
            // The correct code is "redirect"
            done();
        });
    });});
describe('get method to set emergency_status',function(done){
    var Cookies = null;
    it('login before post announcement', function(done){
        var user = {
            "username": "test_user",
            "password": "1234567",
            "status" :"2"
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
    it ('get method to set emergency_status',function(done){
        request(app).get('/emergency/').expect(302, done);
    });
});
