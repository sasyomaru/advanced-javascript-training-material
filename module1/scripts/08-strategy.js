"use strict";

// Strategy
(function() {
    console.log('-------------------------Example on strategy-------------------------');

    var jack = {
        nextStep: function() {},
        speak: function() {
            console.log('I loves you so much.');
            this.nextStep();
        }
    };

    console.log('Jack speaks without any further movement ...');
    jack.speak();

    console.log('Jack speaks before dancing ...');
    jack.nextStep = function() {
        console.log('[ Dance with Rose ... ]');
    };
    jack.speak();

    console.log('Jack speaks before jumping ...');
    jack.nextStep = function() {
        console.log('[ Jump into sea ... ]');
    };
    jack.speak();
})();
