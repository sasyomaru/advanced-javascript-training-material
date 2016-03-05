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

    function PersonFactory() {}
    PersonFactory.prototype.createPerson = function() {
        return new Person();
    };
    PersonFactory.prototype.giveMeAPerson = function(name) {
        var person = this.createPerson();
        person.setName(name);
        return person;
    };

    function PainterFactory() {
        PersonFactory.call(this);
    }
    PainterFactory.prototype = Object.create(PersonFactory.prototype);
    PainterFactory.prototype.createPerson = function() {
        return new Painter();
    };

    var personFactory = new PersonFactory();
    var ordinaryJack = personFactory.giveMeAPerson('Jack');
    var painterFactory = new PainterFactory();
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

    function CommonDramaFactory() {}
    CommonDramaFactory.prototype.createJack = function() {
        return new Person('Jack');
    };
    CommonDramaFactory.prototype.createRose = function() {
        return new Person('Rose');
    };

    function TitanicFactory() {}
    TitanicFactory.prototype.createJack = function() {
        return new Painter('Jack');
    };
    TitanicFactory.prototype.createRose = function() {
        return new Noble('Rose');
    };

    var commonDramaFactory = new CommonDramaFactory();
    console.log('In a common drama, the lines are ...');
    commonDramaFactory.createJack().speak();
    commonDramaFactory.createRose().speak();

    var titanicFactory = new TitanicFactory();
    console.log('In Titanic, the lines are ...');
    titanicFactory.createJack().speak();
    titanicFactory.createRose().speak();
})();
