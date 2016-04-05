var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var socketio = require('socket.io');
var passport = require('passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var chats = require('./routes/chats');
var announcement = require('./routes/announcement');
var search = require('./routes/search');
var emergency = require('./routes/emergency');
var help = require('./routes/help');

var app = express();
var io = socketio();
app.io = io;

io.on('connection', function (socket) {
    socket.on('UrgentHelp',function(data){
      console.log(data.status);
      
   socket.broadcast.emit('UrgentHelp',data);
  });
    socket.on('sendChat', function(msg){
      console.log('yuanyuan smart');
      io.emit('sendChat', msg);
    });
    socket.on('Help',function(data){
    console.log(data.status);

    socket.broadcast.emit('Help',data);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false
}));
app.use(session({secret: 'maytheforcebewithyou'}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/chats', chats);
app.use('/announcement', announcement);
app.use('/search', search);
app.use('/emergency',emergency);
app.use('/help',help);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: "Error Occurs",
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
