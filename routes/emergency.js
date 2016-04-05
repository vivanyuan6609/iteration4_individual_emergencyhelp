var express = require('express');
var router = express.Router();
var dbhandler = new Object();
var sqlite3 = require('sqlite3').verbose();
var dbName = 'ssnoc.dev.db';
var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/', function(req, res, next){
    if (req.session.user != undefined) {
        models.User.findAll({
           where: {
                status: 2
            }
        }).then(function(users){
            console.log(users);
            res.render('emergency', {title: 'SSNoc Public Chatroom', usernow: req.session.user.username, users: users})
        });
    } else {
        res.redirect('/');models.User.find
    }
});


module.exports = router;
