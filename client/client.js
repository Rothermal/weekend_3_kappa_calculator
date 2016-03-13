var buttonArray = [1,2,3,4,5,6,7,8,9,0];
var operatorArray = ['+','add','-','sub','*','mult','/','div'];
var x = "";
var y = "";
var type = "";
var answer = null;

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

// disable all buttons until calculator is reset.
function disableAll(){
    $('.operator').prop('disabled', true);
    $('.number').prop('disabled', true);
    $('.decimal').prop('disabled', true);
    $('.equals').prop('disabled', true);
}


////////////////////////////////////////////////////////////////////
// append the dom with all the divs/buttons for calculator.
////////////////////////////////////////////////////////////////////
function makeCalc(){
    $('.calculator').append('<div class="screen well"></div>');

// make integer buttons
    for(var i = 0 ; i < buttonArray.length; i++) {
        $('.calculator').append('<div class="buttons container col-xs-4 "></div>');
        var $el = $('.calculator').children().last();
        $el.data('number', buttonArray[i]);
        $el.append('<button class="btn btn-info number">' + buttonArray[i] + '</button>');
    }
// make math operator buttons

    for( i = 0; i < operatorArray.length; i = i + 2 ) {
        $('.calculator').append('<div class="operation container col-xs-4 "></div>');
        var $ele = $('.calculator').children().last();
        $ele.data('operation', operatorArray[i + 1]);
        $ele.append('<button class="btn btn-warning operator">' + operatorArray[i] + '</button>');
    }
// make button for decimal point.

    $('.calculator').append('<div class="operation container col-xs-4 "></div>');
    var  $elem = $('.calculator').children().last();
    $elem.append('<button class="btn btn-warning decimal">.</button>');

// make button for equals sign. and a clear/reset button
    $('.calculator').append('<div class="equal container col-xs-12 "></div>');
    var  $eleme = $('.calculator').children().last();
    $eleme.append('<button class="btn btn-primary clear">clear</button>');
    $eleme.append('<button class="btn btn-success equals">=</button>');

}
/////////////////////////////////
// end of makeCalc function
/////////////////////////////////

// display the numbers pressed, on the calculator screen.
function insertNumber(){
    var number = $(this).parent().data('number');
    $('.screen').append('<span>'+number+'</span>');
}
// determine math operation and sets x.
function setOperation(){
    var operation = $(this).parent().data('operation');
        type = operation;
        if(x.length !== 0) {
            console.log('must be chaining calculations together x is the previous answer.');
        } else {
        x = $('.screen').text();
        }
        console.log('x = ',x,'type is set to : ',type);
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
    x = "";
    y = "";
    type = "";
    makeCalc();
}

///////////////////////////////////////////////////////////////////////////////////////
// hit equal button, runs the perform calc function, sets y if neccesary,
// checks to make sure x and y and an operator have been set
// then performs ajax call because science, on success checks to make sure answer is valid.
//////////////////////////////////////////////////////////////////////////////////////////
function performCalc (){
    // basicly a check to see if user spamming the equals button and allows calculator to continue to function properly.
    // would go more in depth but i spent a lot of time debugging this. brain hurts now.
    if(answer !== null && $('.operator').hasClass('selected') === false) {
        console.log('y does not change');
    }else {
        y = $('.screen').text();
    }
    console.log('x = ',x,'y = ',y,' and type is ',type);
    $('.screen').empty();

    // check to make sure there are numbers to evaluate.
    if(x.length === 0 || y.length === 0) {
        console.log('need to pick numbers and an operation...try again.');
    } else {

        $.ajax({
        type: 'POST',
        url: "/math/" + type,
        data: {
            x: x,
            y: y
        },
        success: function (response) {
            console.log(response);
            answer = response.answer;
            // if someone divides by 0
            if(answer === null){
                $('.screen').append('<span>Only communists divide by 0</span>');
                disableAll();
            }else {
                $('.screen').append('<span>' + answer + '</span>');
                x = answer;
                $('.operator').prop('disabled', false);
            }
                if($('.operator').hasClass('selected')){
                $('.operator').removeClass('selected');
            }

        }
    });
    }
}
/////////////////////////////////////////////////////////////////
// "this is the end, my only friend, the end" Jim Morrison
/////////////////////////////////////////////////////////////////