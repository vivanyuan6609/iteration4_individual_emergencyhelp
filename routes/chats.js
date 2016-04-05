var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET chat history. */
router.get('/', function(req, res, next){
    if (req.session.user != undefined) {
        models.Post.findAll({include: {model: models.User, as: 'User'}}).then(function(posts){
            res.render('chats', {title: 'SSNoc Public Chatroom', action: "/chats", usernow: req.session.user.username, posts: posts})
        });
    } else {
        res.redirect('/');
    }
});

/* POST create new post. */
router.post('/', function(req, res, next){
    models.Post.create({
        content: req.body.content,
        timestamp: moment().format('MMMM Do, h:mm:ss a'),
        UserId: req.session.user.id
    }).then(function(){
        res.redirect('/chats');
    });
});

router.param("toId", function(req, res, next, value){
    models.User.find({
        where: {id: value}
    }).then(function(user){
        req.to_user = user;
        next();
    });
});

/* GET chat with someone */
router.get('/to/:toId', function(req, res, next){
    fromId = req.session.user.id
    toId = req.params.toId
    models.Chat.findAll({
       $or: [{$and: [{from_user: fromId, to_user: toId}]}, {$and: [{from_user: toId, to_user: fromId}]}],
       include: {model: models.User, as: "User"}
    }).then(function(posts){
        res.render('chats', {title: 'SSNoc Public Chatroom', action: "/chats/to/"+toId, usernow: req.session.user.username, posts: posts, to_user: req.to_user})
    });
});

/* POST chat with someone */
router.post('/to/:toId', function(req, res, next){
    fromId = req.session.user.id
    toId = req.params.toId
    models.Chat.create({
        content: req.body.content,
        timestamp: moment().format('MMMM Do, h:mm:ss a'),
        from_user: fromId,
        to_user: toId
    }).then(function(chat){
        res.redirect('/chats/to/'+chat.to_user);
   });
});

module.exports = router;