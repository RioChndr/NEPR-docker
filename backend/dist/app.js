var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// get config vars
dotenv.config();
app.use('/', indexRouter);
app.use('/users', usersRouter);
module.exports = app;
//# sourceMappingURL=app.js.map