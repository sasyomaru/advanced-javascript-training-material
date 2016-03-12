"use strict";

// Proxy
(function() {
    console.log('-------------------------Example on proxy-------------------------');

    var rose = {
        speak: function() {
            console.log('Rose loves you so much.');
        }
    };

    function BadMessager(source) {
        this.source = source;
    }
    BadMessager.prototype.speak = function() {
        if (Math.random() < 0.5) {
            console.log('Rose hates you!');
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            var returnValue = this.source.speak.apply(this.source, args);
            return returnValue;
        }
    };

    var cal = new BadMessager(rose);
    console.log('Cal delivers 10 messages ...');
    for(var index = 0; index < 10; index++) {
        cal.speak();
    }
})();
