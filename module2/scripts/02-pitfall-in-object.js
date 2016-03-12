"use strict";

// An example of array or function as object
(function() {
    console.log('-------------------------Example on array-object and function-object-------------------------');
    var arr = ['Big', 'Medium', 'Small'];
    arr.joinWithComma = function joinWithComma() {
        return this.join(',');
    }
    console.log('Calling a new function on array ...');
    console.log('Join Big, Medium and Small with comma and you\'ll get: ' + arr.joinWithComma());

    function speakSomething() {
        console.log('I can speak: ' + Array.prototype.join.apply(arguments));
    }
    speakSomething.speakHappily = function speakHappily() {
        console.log('I am very happy!');
        this.apply(null, Array.prototype.slice.call(arguments, 0));
    }
    console.log('Calling a new function on function ...');
    speakSomething.speakHappily('English', 'Chinese');
})();

// Don't forget this when accessing properties
(function() {
    console.log('-------------------------Example on using this-------------------------');
    var prop = 'Property not in object';

    function MyClass() {
        this.prop = 'Property in object';
    }
    MyClass.prototype.markImportant = function() {
        // This line misses "this" when accessing property
        prop += '!';
    };

    var obj = new MyClass();
    obj.markImportant();
    obj.markImportant();
    obj.markImportant();
    console.log('The value for property in object is: ' + obj.prop);
    console.log('The value for property not in object is: ' + prop);
})();

// An example of iterate keys
(function() {
    console.log('-------------------------Example on iterate keys-------------------------');
    var baseObj = { keyInBaseObject: 'valueInBaseObject' };
    Object.defineProperty(baseObj, 'nonEnumerableFieldInBaseObj', {
        value: 'nonEnumerableValueInChildObject',
        writable: true
    });
    var childObj = Object.create(baseObj);
    childObj.keyInChildObj = 'valueInChildObject';
    Object.defineProperty(childObj, 'nonEnumerableFieldInChildObj', {
        value: 'nonEnumerableValueInChildObject',
        writable: true
    });

    console.log('Keys found via Object.keys ... ');
    console.log(Object.keys(childObj));

    console.log('Keys found via getOwnPropertyNames ...');
    console.log(Object.getOwnPropertyNames(childObj));

    console.log('Keys found via (for ... in) ...');
    var keysFromForIn = [];
    for(var key in childObj) {
        keysFromForIn.push(key);
    }
    console.log(keysFromForIn);
})();
