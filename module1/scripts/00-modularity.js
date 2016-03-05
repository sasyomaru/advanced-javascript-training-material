"use strict";

// An simple IIFE (immediately-invoked functional expression)
(function() {
    console.log('-------------------------Example on IIFE-------------------------');
    var variableWithinIIFE = {};
    console.log('Can access variable within IIFE: ' +
        (variableWithinIIFE !== undefined));
})();

// This will cause error as variableWithinIIFE can't be accessed out of IIFE.
// console.log('Can access variable out of IIFE: ' +
//     (variableWithinIIFE !== undefined));

// An example of module made using IIFE
(function() {
    console.log('-------------------------Example on module made using IIFE-------------------------');
    var module = (function() {
        var privateField = 0;

        function privateMethod() {
            console.log('Can access private field within private method: ' +
                (privateField !== undefined));
        }

        function publicIncrementValue() {
            console.log('Can access private field within public method: ' +
                (privateField !== undefined));
            privateField++;
        }
        function publicGetValue() {
            console.log('"getValue" will call private method');
            privateMethod();
            return privateField;
        }

        return {
            incrementValue: publicIncrementValue,
            getValue: publicGetValue
        };
    })();

    console.log('Calling addValue ...');
    module.incrementValue();
    console.log('Calling getValue ...');
    var value = module.getValue();
    console.log('Value after increment is: ' + value);
})();
