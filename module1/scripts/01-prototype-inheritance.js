"use strict";

// Person has a name and can say something

// No reuse construction
(function() {
    console.log('-------------------------Example on no reuse-------------------------');

    // The speak function is written twice
    var jack = {
        name: 'Jack',
        speak: function() {
            console.log('Hi, my name is ' + this.name + '.');
        }
    };
    var rose = {
        name: 'Rose',
        speak: function() {
            console.log('Hi, my name is ' + this.name + '.');
        }
    };

    console.log('Jack is speaking ...');
    jack.speak();
    console.log('Rose is speaking ...');
    rose.speak();
})();

// Reuse by declaring once and referencing it
(function() {
    console.log('-------------------------Example on reusing method-------------------------');

    // The speak function is written only once
    function personSpeak() {
        console.log('Hi, my name is ' + this.name + '.');
    }
    var jack = {
        name: 'Jack',
        speak: personSpeak
    };
    var rose = {
        name: 'Rose',
        speak: personSpeak
    };

    console.log('Jack is speaking ...');
    jack.speak();
    console.log('Rose is speaking ...');
    rose.speak();
})();

// Reuse by object based prototype
(function() {
    console.log('-------------------------Example on object based prototype-------------------------');

    var jack = {
        name: 'Jack',
        speak: function() {
            console.log('Hi, my name is ' + this.name + '.');
        }
    };
    var rose = Object.create(jack);
    rose.name = 'Rose';

    console.log('Jack is speaking ...');
    jack.speak();
    console.log('Rose is speaking ...');
    rose.speak();
})();

// Prototype can be changed after relationship is setup
(function() {
    console.log('-------------------------Example on changing prototype after setting up relationship-------------------------');

    var jack = {
        name: 'Jack',
        speak: function() {
            console.log('Hi, my name is ' + this.name + '.');
        }
    };
    var rose = Object.create(jack);
    rose.name = 'Rose';

    console.log('Jack is speaking ...');
    jack.speak();
    console.log('Rose is speaking ...');
    rose.speak();

    jack.stand = function() {
        console.log(this.name + ' is standing ...');
    };
    rose.stand();
})();

// Reuse by constructor
(function() {
    console.log('-------------------------Example on constructor-------------------------');

    function Person(name) {
        this.name = name;
        this.speak = function() {
            console.log('Hi, my name is ' + this.name + '.');
        };
    }
    var jack = new Person('Jack');
    var rose = new Person('Rose');

    console.log('Jack is speaking ...');
    jack.speak();
    console.log('Rose is speaking ...');
    rose.speak();
})();

// Reuse by class based prototype
(function() {
    console.log('-------------------------Example on class based prototype-------------------------');

    function Person(name) {
        this.name = name;
    }
    Person.prototype.speak = function() {
        console.log('Hi, my name is ' + this.name);
    };
    var jack = new Person('Jack');
    var rose = new Person('Rose');

    console.log('Jack is a person: ' + (jack instanceof Person));
    console.log('Jack is speaking ...');
    jack.speak();
    console.log('Rose is a person: ' + (rose instanceof Person));
    console.log('Rose is speaking ...');
    rose.speak();
})();

// Class inheritance
(function() {
    console.log('-------------------------Example on class inheritance-------------------------');

    function Person(name) {
        this.name = name;
    }
    Person.prototype.speak = function() {
        console.log('Hi, my name is ' + this.name + '.');
    };

    function Painter(name) {
        Person.call(this, name);
    }
    Painter.prototype = Object.create(Person.prototype);
    Painter.prototype.paint = function() {
        console.log(this.name + ' is painting ...');
    };

    function Noble(name) {
        Person.call(this, name);
    }
    Noble.prototype = Object.create(Person.prototype);
    Noble.prototype.speak = function() {
        console.log(this.name + ' is speaking in a noble way ...');
    };
    var jack = new Painter('Jack');
    var rose = new Noble('Rose');

    console.log('Jack is a person: ' + (jack instanceof Person));
    console.log('Jack is a painter: ' + (jack instanceof Painter));
    console.log('Jack is a noble: ' + (jack instanceof Noble));
    jack.paint();
    console.log('Jack is speaking ...');
    jack.speak();

    console.log('Rose is a person: ' + (rose instanceof Person));
    console.log('Rose is a painter: ' + (rose instanceof Painter));
    console.log('Rose is a noble: ' + (rose instanceof Noble));
    console.log('Rose is speaking ...');
    rose.speak();
})();
