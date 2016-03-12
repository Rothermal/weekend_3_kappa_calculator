var buttonArray = [1,2,3,4,5,6,7,8,9,0];
var operatorArray = ['+','add','-','sub', '*','mult','/','div'];
var x = 0;
var y = 0;
var type = "";

$(document).ready(function(){
   init();
   enable();
});

function init (){
    makeCalc();
}

function enable(){
    console.log('add listeners');
    $('.calculator').on('click','.number',insertNumber);
    $('.calculator').on('click','.operator',setOperation);
    $('.calculator').on('click','.decimal',addDecimal);
    $('.calculator').on('click','.clear',resetCalc);
    $('.calculator').on('click','.equals',performCalc);

}
//turn off operator buttons.
function disable(){
    $('.operator').prop('disabled', true);
}

// append the dom with all the divs/ buttons/ fields for calculator.
function makeCalc(){
    $('.calculator').append('<div class="screen well"></div>');

// make integer buttons
    for(var i = 0 ; i < buttonArray.length; i++) {
        $('.calculator').append('<div class="buttons container col-xs-4 "></div>');
        var $el = $('.calculator').children().last();
        $el.data('number', buttonArray[i]);
        $el.append('<button class="btn btn-default number">' + buttonArray[i] + '</button>');
    }
// make math operator buttons

    for( i = 0; i < operatorArray.length; i = i + 2 ) {
        $('.calculator').append('<div class="operation container col-xs-4 "></div>');
        var $ele = $('.calculator').children().last();
        $ele.data('operation', operatorArray[i + 1]);
        $ele.append('<button class="btn btn-default operator">' + operatorArray[i] + '</button>');
    }
// make button for decimal point.

    $('.calculator').append('<div class="operation container col-xs-4 "></div>');
    var  $elem = $('.calculator').children().last();
    $elem.append('<button class="btn btn-default decimal">.</button>');

// make button for equals sign. and reset calculator
    $('.calculator').append('<div class="equal container col-xs-12 "></div>');
    var  $eleme = $('.calculator').children().last();
    $eleme.append('<button class="btn btn-primary clear">clear</button>');
    $eleme.append('<button class="btn btn-success equals">=</button>');

}




// display numbers pressed, on the calculator screen
function insertNumber(){
    var number = $(this).parent().data('number');
    $('.screen').append('<span>'+number+'</span>');
}
// determine math operation
function setOperation(){
    var operation= $(this).parent().data('operation');
        type = operation;
        x = $('.screen').text();
        console.log('x and type set', x , " ", type);
        $('.screen').empty();
    $(this).addClass('selected');
        disable();

}
// adds a decimal point.
function addDecimal(){
    $('.screen').append('<span>.</span>');
}


// clears out calculator and rebuilds it.
function resetCalc (){
    $('.calculator').empty();
    makeCalc();
}

function performCalc (){
    console.log('clicked');
    y = $('.screen').text();
    console.log('x y and type', x ," ",y," ",type);
    $('.screen').empty();
    $.ajax({
       type:'POST',
       url:"/math/"+type,
       data: {x:x,
              y:y
       },
        success:function(response){
        console.log(response);
            $('.screen').append('<span>'+response.answer+'</span>');

        }
    });
}