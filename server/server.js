var express = require('express');
var app = express();
var index = require('./routes/index');
var bodyParser = require('body-parser');
app.use(express.static('server/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use('/',index);

var server = app.listen(3000,function(){
   var port = server.address().port;
    console.log('server up on port : ', port);
});