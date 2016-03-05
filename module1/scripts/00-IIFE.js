"use strict";

// An simple IIFE (immediately-invoked functional expression)
(function() {
    console.log('-------------------------Example on IIFE-------------------------');
    var myMoney = 20;
    console.log('Can access myMoney within IIFE: ' +
        (myMoney !== undefined));
})();

// This will cause error as myMoney can't be accessed out of IIFE.
// console.log('Can access myMoney out of IIFE: ' +
//     (myMoney !== undefined));
