var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Message = mongoose.model('Message',  {
  msg: String
});

//Parse to response json
app.use(bodyParser.json());

//allow cors
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Aythorization');
  next();
});

//Get request
app.get('/api/message', GetMessages);

//make a post
app.post('/api/message', function(req,res){
  console.log(req.body);

  var message = new Message(req.body);
  message.save();

  res.status(200);
});

function GetMessages(req,res){
  Message.find({}).exec(function(err,result){
    res.send(result);
  });
};

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/test', function(err,db){
  if(!err){
    console.log('We are connected to mongo');
  }
});

//listen the server
var server = app.listen(5000, function(){
  console.log('listening on port ', server.address().port);
});
