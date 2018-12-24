var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});
app.use('/users', UserController);
app.use(express.static('public'));



module.exports = app;