/**
 * Created by JFCS on 3/11/16.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var math = require('./math');



router.post('/math',math);




router.get('/', function (request,response) {
    response.sendFile(path.join(__dirname,'../public/views/index.html'));
});



module.exports = router;