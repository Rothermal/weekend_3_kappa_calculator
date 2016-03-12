var express = require ('express');
var router = express.Router();

var add = require('../modules/addition');
var subtract = require('../modules/subtraction');
var multiply = require('../modules/multiplication');
var divide = require('../modules/division');

router.post('/math/add',function (request,response){
    var calcResults = request.body;
    calcResults.type = "+";
    calcResults.answer = add(calcResults.x,calcResults.y);
    response.send(calcResults);
});

router.post('/math/sub',function (request,response){
    var calcResults = request.body;
    calcResults.equals = '=';
    calcResults.type = "-";
    calcResults.answer = subtract(calcResults.x,calcResults.y);
    response.send(calcResults);

});

router.post('/math/mult',function (request,response){
    var calcResults = request.body;
    calcResults.type = "*";
    calcResults.answer = multiply(calcResults.x,calcResults.y);
    response.send(calcResults);

});

router.post('/math/div',function (request,response){
    var calcResults = request.body;
    calcResults.type = "/";
    calcResults.answer = divide(calcResults.x,calcResults.y);
    response.send(calcResults);

});

module.exports = router;