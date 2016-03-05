"use strict";

// Execution context is created each time a function is created
(function() {
    console.log('-------------------------Example on execution context creation-------------------------');
    function createWallet() {
        var money = 0;
        return {
            increment: function increment() {
                money++;
            },
            count: function count() {
                return money;
            }
        };
    }
    var myWallet = createWallet();
    var myFriendWallet = createWallet();
    for(var index = 0; index < 10; index++) {
        myFriendWallet.increment();
    }
    console.log('After 10 times of increment ...');
    console.log('Money in my friend\'s wallet: ' +
                    myFriendWallet.count());
    console.log('Money in my wallet: ' + myWallet.count());
})();
