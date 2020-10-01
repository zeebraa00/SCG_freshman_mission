const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment-timezone');
const compression = require('compression')
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html", require("ejs").renderFile);

// morgan setup
app.enable('trust proxy');
logger.token('User', (req, res) => {
  return !req.session
    ? 'Source'
    : req.session.user_id == undefined
    ? 'Guest'
    : req.session.user_id;
});
logger.token('Date', (req, res, tz) => {
  return moment()
    .tz(tz)
    .format('YYYY-MM-DD HH:mm:ss Z');
});
logger.format(
  'zebra',
  ':User :remote-addr [:Date[Asia/Seoul]] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent" - :response-time ms',
);

app.use(logger(app.get('env') === 'development' ? 'dev' : 'zebra'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "zebra",
  resave: true,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000
  }
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    title: "error",
    result: err.message
  });
});

module.exports = app;