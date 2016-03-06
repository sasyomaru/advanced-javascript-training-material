"use strict";

// Observer
(function() {
    console.log('-------------------------Example on observer-------------------------');

    function EventEmitter() {
        this.handlers = [];
    }
    EventEmitter.prototype.subscribe = function(handler) {
        this.handlers.push(handler);
    };
    EventEmitter.prototype.unsubscribe = function(handler) {
        for(var index = this.handlers.length - 1; index >= 0; index--) {
            if(this.handlers[index] === handler) {
                this.handlers.splice(index, 1);
            }
        }
    };
    EventEmitter.prototype.fire = function(args) {
        this.handlers.forEach(function triggerHandler(handler) {
            handler(args);
        });
    };

    var enemyComeEvent = new EventEmitter();
    function mrPing(message) {
        console.log('Mr Ping heard "' + message + '", and he wants to run away.');
    }
    enemyComeEvent.subscribe(mrPing);
    enemyComeEvent.subscribe(function po(message) {
        console.log('Po heard "' + message + '", and he wants to fight back.');
    });
    console.log('Enemies are coming ...');
    enemyComeEvent.fire('lots of enemies come');

    enemyComeEvent.unsubscribe(mrPing);
    console.log('After Mr Ping left, when enemies are coming ...');
    enemyComeEvent.fire('lots of enemies come');
})();
