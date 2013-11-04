
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');
var parseString = require('xml2js').parseString;

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res){
  var nonce = req.query.nonce;
  var signature = req.query.signature;
  var echostr = req.query.echostr;
  var timestamp = req.query.timestamp;

  console.log(req.query.nonce);
  res.send(req.query.echostr);
});

app.post('/', function(req,res){
  console.log(req.rawBody.toString());

  parseString(req.rawBody, function (err, result) {
   console.dir(result);

  console.log(result.xml.FromUserName[0]);
  console.log(result.xml.MsgType[0]);
  console.log(result["xml"]["Content"][0]);

  if(result["xml"]["Content"][0].indexOf("空气") != -1 ||
     result["xml"]["Content"][0].indexOf("质量") != -1) {
  console.log('Yes!');
}

  });

  res.send('ok');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
