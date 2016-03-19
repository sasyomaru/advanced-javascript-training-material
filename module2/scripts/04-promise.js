"use strict";

(function() {
    function getValuePromise(time, value) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(value);
            }, time);
        });
    }

    function getValuePromiseWithLog(time, value) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                console.log('Value is ready: ' + value);
                resolve(value);
            }, time);
        });
    }

    function getErrorPromise(time, error) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                reject(error);
            }, time);
        });
    }

    // Basic promise workflow
    (function() {
        console.log('-------------------------Example on basic promise workflow-------------------------');
        function callTakeOutService() {
            return getValuePromise(500, 'noodle');
        }

        var toReturn = callTakeOutService().then(function(lunch) {
            console.log('Get lunch which is: ' + lunch);
        });
        console.log('Continue work without waiting for service!');
        return toReturn;
    })().then(function() {
        // Sequential workflow

        console.log('-------------------------Example on sequential workflow-------------------------');
        var toReturn = getValuePromise(500, 'noodle').then(function(lunch) {
            console.log('First thing for lunch is: ' + lunch);
            return getValuePromise(500, 'rice');
        }).then(function(lunch) {
            console.log('Second thing for lunch is: ' + lunch);
            return getValuePromise(500, 'bread');
        }).then(function(lunch) {
            console.log('Third thing for lunch is: ' + lunch);
            console.log('All things have been delivered!');
        });
        console.log('Continue work without waiting for service!');
        return toReturn;
    }).then(function() {
        // Parallel workflow

        console.log('-------------------------Example on parallel workflow-------------------------');
        var toReturn = Promise.all([
            getValuePromise(500, 'noodle'),
            getValuePromise(1500, 'rice'),
            getValuePromise(1000, 'bread')
        ]).then(function(items) {
            if (items.length === 1) {
                console.log('Get ' + items.length + ' item for lunch: ' + items[0]);
            } else {
                console.log('Get ' + items.length + ' items for lunch: ' + items.join(','));
            }
            console.log('All things have been delivered!');
        });
        console.log('Continue work without waiting for service!');
        return toReturn;
    }).then(function() {
        // Exception handling

        console.log('-------------------------Example on exception handling-------------------------');
        
        return Promise.all([
            getErrorPromise(500, new Error('Error happens in take out service')).then(function(lunch) {
                console.log('Get lunch which is: ' + lunch);
            }).catch(function errorHandler(error) {
                console.log('Error caught: ' + error.toString());
            }),
            getValuePromise(500, 'noodle').then(function(lunch) {
                console.log('Get lunch which is: ' + lunch);
                throw new Error('Error happens after getting lunch!');
            }).catch(function errorHandler(error) {
                console.log('Error caught: ' + error.toString());
            })
        ]);
    }).then(function() {
        // Stack example

        console.log('-------------------------Example on stack in promise handler-------------------------');

        function a() {
            return getValuePromise(500, 'noodle').then(function handler(lunch) {
                console.log('Get lunch which is: ' + lunch);
            });
        }
        function b() { return a(); }
        function c() { return b(); }
        function d() { return c(); }
        function e() { return d(); }
        function f() { return e(); }
        return f();
    }).then(function() {
        // Sequential workflow

        console.log('-------------------------Example on sequential workflow-------------------------');
        var toReturn = getValuePromise(500, 'noodle').then(function(lunch) {
            console.log('First thing for lunch is: ' + lunch);
            getValuePromiseWithLog(1000, 'rice');
        }).then(function(lunch) {
            console.log('Second thing for lunch is: ' + lunch);
            return getValuePromise(500, 'bread');
        }).then(function(lunch) {
            console.log('Third thing for lunch is: ' + lunch);
            console.log('All things have been delivered!');
        });
        return toReturn;
    });
})();
