"use strict";

// An example of module
(function() {
    console.log('-------------------------Example on module-------------------------');
    var wallet = (function() {
        var myMoney = 0;

        function privateCheckMoney() {
            console.log('Can access private field within private method: ' +
                (myMoney !== undefined));
        }

        return {
            incrementMoney: function incrementMoney() {
                console.log('Can access private field within public method: ' +
                    (myMoney !== undefined));
                myMoney++;
            },
            countMoney: function countMoney() {
                console.log('"countMoney" will call private method');
                privateCheckMoney();
                return myMoney;
            },
            name: 'Cucci',
            readName: function() {
                console.log('Can access public field with public method: ' +
                    (this.name !== undefined));
                console.log('Name of wallet: ' + this.name);
            }
        };
    })();

    console.log('Calling addValue ...');
    wallet.incrementMoney();
    console.log('Calling countMoney ...');
    var value = wallet.countMoney();
    console.log('Value after increment is: ' + value);
    console.log('Calling readName ...');
    wallet.readName();
})();
