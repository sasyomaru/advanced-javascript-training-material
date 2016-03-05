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

// Use strategy as parameter
(function() {
    console.log('-------------------------Example on strategy as parameter-------------------------');

    var candidates = [{ name: 'Jack', charm: 100, money: 10 }, { name: 'Cal', charm: 40, money: 1000 }];

    var rosePriority = candidates.sort(function(one, another) {
        return one.charm - another.charm;
    });
    console.log('Rose chooses: ' + rosePriority[rosePriority.length - 1].name);

    var anotherNobleGirlPriority = candidates.sort(function(one, another) {
        return one.money - another.money;
    });
    console.log('Another noble girl chooses: ' + anotherNobleGirlPriority[anotherNobleGirlPriority.length - 1].name);

    var analyzerPriority = candidates.sort(function(one, another) {
        var oneValue = one.money * 0.3 + one.charm * 0.7;
        var anotherValue = another.money * 0.3 + another.charm * 0.7;
        return oneValue - anotherValue;
    });
    console.log('An analyzer chooses: ' + analyzerPriority[analyzerPriority.length - 1].name);
})();
