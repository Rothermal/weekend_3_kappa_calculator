var buttonArray = [1,2,3,4,5,6,7,8,9,0,];
var operatorArray = ['+','add','-','sub', '*','mult','/','div'];
var x = 0;
var y = 0;
var type = "";

$(document).ready(function(){
   init();
   enable();
});

function init (){
    console.log("make a calculator.");
    makeCalc();
}

function enable(){
    console.log('add listeners');
    $('.calculator').on('click','.number',insertNumber);
    $('.calculator').on('click','.operator',setOperation);

}
//turn off  buttons.
function disable(){
    //if($('.operator').data('operation') == 'decimal' ){
    //    console.log('must be a decimal');
    //} else {
        $('.operator').prop('disabled', true);
    //}
}

// append the dom with all the divs/ buttons/ fields for calculator.
function makeCalc(){

    $('.calculator').append('<div class="screen well first"></div>');
    //
    //$('.calculator').append('<div class="buttons container "></div>');
    //var $el = $('.calculator').children().last();

    for(var i = 0 ; i < buttonArray.length; i++) {
        $('.calculator').append('<div class="buttons container col-sm-4 "></div>');
        var $el = $('.calculator').children().last();
        $el.data('number', buttonArray[i]);
        $el.append('<button class="btn btn-default number">' + buttonArray[i] + '</button>');
    }

    for( i = 0; i < operatorArray.length; i = i + 2 ){
        $('.calculator').append('<div class="operation container col-sm-4 "></div>');
       var  $ele = $('.calculator').children().last();
        $ele.data('operation', operatorArray[i+1]);
        $ele.append('<button class="btn btn-default operator">' + operatorArray[i] + '</button>');
    }
    $('.calculator').append('<div class="operation container col-sm-4 "></div>');
    var  $elem = $('.calculator').children().last();
    $elem.data('operation', 'decimal');
    $elem.append('<button class="btn btn-default decimal">.</button>');
}

function insertNumber(){

    var number = $(this).parent().data('number');
    console.log(number);
    $('.screen').append('<span>'+number+'</span>');
}

function setOperation(){
    var operation= $(this).parent().data('operation');
    if( operation == "decimal"){
        $('.screen').append('<span>'+"."+'</span>');
    } else {
        type = operation;
        x = $('.screen').text();
        x = parseFloat(x);
        console.log('x and type set', x , " ", type);
        $('.screen').empty();
        disable();
    }

    console.log(operation);

}