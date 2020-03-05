var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/**
 * 中间件
 */
const { authorizeMiddleware } = require('./middleware/auth.js')

const loginRouter = require('./routes/login');
const userRooter = require('./routes/user');
const bookRouter = require('./routes/book');
const commentRouter = require('./routes/comment');
const orderRouter = require('./routes/order');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login', authorizeMiddleware, loginRouter);
app.use('/api/user', userRooter);
app.use('/api/book', bookRouter);
app.use('/api/comment', commentRouter);
app.use('/api/order', orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
