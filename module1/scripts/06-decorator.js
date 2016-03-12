"use strict";

// Decorator
(function() {
    console.log('-------------------------Example on decorator-------------------------');

    var ordinaryJack = {
        name: 'Jack',
        speak: function() {
            console.log('Hi, my name is ' + this.name + '.');
        }
    };

    function SweetDecorator(person) {
        this.person = person;
    }
    SweetDecorator.prototype.speak = function() {
        console.log('[ Look with love ... ]');
        var args = Array.prototype.slice.call(arguments, 0);
        var returnValue = this.person.speak.apply(this.person, args);
        console.log('You are so beautiful!');
        return returnValue;
    };

    var loverJack = new SweetDecorator(ordinaryJack);

    console.log('An ordinary Jack is speaking ...');
    ordinaryJack.speak();
    console.log('A lover Jack is speaking ...');
    loverJack.speak();
})();
