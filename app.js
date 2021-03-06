var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session') 
var logger = require('morgan');
var flash = require('connect-flash')



var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var regRouter = require('./routes/reg.js');
var userRouter = require('./routes/user');
var logoutRouter = require('./routes/logout');
var postRouter = require('./routes/post');
var uploadRouter = require('./routes/upload')
var editRouter = require('./routes/edit')
var removeRouter = require('./routes/remove')
var archiveRouter = require('./routes/archive')
var tagsRouter = require('./routes/tags')
var searchRouter = require('./routes/search')
var authRouter = require('./routes/auth')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'node-blog',resave:true,saveUninitialized:true,name:'sess_id'}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash())

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/logout', logoutRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/upload', uploadRouter)
app.use('/edit', editRouter)
app.use('/remove', removeRouter)
app.use('/archive', archiveRouter)
app.use('/tags', tagsRouter)
app.use('/search', searchRouter)
app.use('/auth', authRouter)

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 13142668233
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
