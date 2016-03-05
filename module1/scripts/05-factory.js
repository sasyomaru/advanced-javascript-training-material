"use strict";

// Factory Method
(function() {
    console.log('-------------------------Example on factory method-------------------------');

    function Person() {
        this.name = '';
    }
    Person.prototype.setName = function(name) {
        this.name = name;
    };
    Person.prototype.speak = function personSpeak() {
        console.log('Hi, my name is ' + this.name + '.');
    };

    function Painter() {
        Person.call(this);
    }
    Painter.prototype = Object.create(Person.prototype);
    Painter.prototype.speak = function() {
        console.log('Hi, I\'m a painter. My name is ' + this.name + '.');
    };

    var personFactory = {
        createPerson: function() {
            return new Person();
        },
        giveMeAPerson: function(name) {
            var person = this.createPerson();
            person.setName(name);
            return person;
        }
    };

    var painterFactory = Object.create(personFactory);
    painterFactory.createPerson = function() {
        return new Painter();
    };

    var ordinaryJack = personFactory.giveMeAPerson('Jack');
    var painterJack = painterFactory.giveMeAPerson('Jack');

    console.log('An ordinary Jack is speaking ...');
    ordinaryJack.speak();
    console.log('A painter Jack is speaking ...');
    painterJack.speak();
})();

// Abstract Factory
(function() {
    console.log('-------------------------Example on factory method-------------------------');

    function Person(name) {
        this.name = name;
    }
    Person.prototype.speak = function personSpeak() {
        console.log('Hi, my name is ' + this.name + '.');
    };

    function Painter(name) {
        Person.call(this, name);
    }
    Painter.prototype = Object.create(Person.prototype);
    Painter.prototype.speak = function() {
        console.log('Hi, I\'m a painter. My name is ' + this.name + '.');
    };

    function Noble(name) {
        Person.call(this, name);
    }
    Noble.prototype = Object.create(Person.prototype);
    Noble.prototype.speak = function() {
        console.log('Hi, I\'m a noble. My name is ' + this.name + '.');
    };

    var commonDrama = {
        createJack: function() {
            return new Person('Jack');
        },
        createRose: function() {
            return new Person('Rose');
        }
    };
    var titanic = {
        createJack: function() {
            return new Painter('Jack');
        },
        createRose: function() {
            return new Noble('Rose');
        }
    };

    console.log('In a common drama, the lines are ...');
    commonDrama.createJack().speak();
    commonDrama.createRose().speak();

    console.log('In Titanic, the lines are ...');
    titanic.createJack().speak();
    titanic.createRose().speak();
})();
