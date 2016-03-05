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

// An example of module made using IIFE
(function() {
    console.log('-------------------------Example on module made using IIFE-------------------------');
    var wallet = (function() {
        var myMoney = 0;

        function privateCheckMoney() {
            console.log('Can access private field within private method: ' +
                (myMoney !== undefined));
        }

        function publicIncrementMoney() {
            console.log('Can access private field within public method: ' +
                (myMoney !== undefined));
            myMoney++;
        }
        function publicCountMoney() {
            console.log('"countMoney" will call private method');
            privateCheckMoney();
            return myMoney;
        }

        return {
            incrementMoney: publicIncrementMoney,
            countMoney: publicCountMoney
        };
    })();

    console.log('Calling addValue ...');
    wallet.incrementMoney();
    console.log('Calling countMoney ...');
    var value = wallet.countMoney();
    console.log('Value after increment is: ' + value);
})();
