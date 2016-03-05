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
        this.person.speak();
        console.log('You are so beautiful!');
    };

    var loverJack = new SweetDecorator(ordinaryJack);

    console.log('An ordinary Jack is speaking ...');
    ordinaryJack.speak();
    console.log('A lover Jack is speaking ...');
    loverJack.speak();
})();
