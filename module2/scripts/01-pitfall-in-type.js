"use strict";

// No explicit type
(function() {
    console.log('-------------------------Example on implicit type-------------------------');

    console.log('JavaScript has no integer, so 5 / 2 = ' + (5 / 2));

    console.log('JavaScript will make number integer for bit operation, so 5.4 | 6 = ' + (5.4 | 6));

    var sumResult;
    var array = [3, 9, 5];
    for(var i in array) {
        if (!sumResult) {
            sumResult = i;
        } else {
            sumResult = sumResult + i;
        }
    }
    console.log('As array is actually object and all keys are in type of string, the sum result is actually: ' + sumResult);

    var arrayForTypeTesting = ['value'];
    console.log('Type of [] is: ' + typeof arrayForTypeTesting);
    console.log('But Array.isArray([]) is: ' + Array.isArray(arrayForTypeTesting));

    var addResult = 1 + 2 + '3';
    var anotherAddResult = '3' + 1 + 2;
    console.log('1 + 2 + "3" is: ' + (1 + 2 + '3'));
    console.log('"3" + 1 + 2 is: ' + ('3' + 1 + 2));
})();

// == vs. ===
(function() {
    console.log('-------------------------Example on == and ===-------------------------');
    console.log('false == "false": ' + (false == 'false'));
    console.log('false == "0": ' + (false == '0'));
    console.log('0 == "": ' + (0 == ''));
    console.log('0 == "0": ' + (0 == '0'));
})();
