"use strict";

// An example of there is no block scope
(function() {
    console.log('-------------------------Example on no block scope-------------------------');
    var money = 50;

    // lots of code has been run here

    var imRich = false;
    for(var index = 0; index < 10; index++) {
        // Someone wants to give me money if I don't have any
        var money;
        if (money == null) {
            money = 100000000;
            imRich = true;
        }
    }
    if(imRich) {
        console.log('I am rich!');
    } else {
        console.log('I am still poor!');
    }
})();

// An example of access outer scope by mistake
(function() {
    console.log('-------------------------Example on access outer scope by mistake-------------------------');
    var money = 0;

    function dream() {
        var house = 'Big one';
        money = 10000000;
    }

    dream();
    if (money > 10000) {
        console.log('Dream has come true!');
    }
})();

// An example of same name of variable and move declaration up
(function() {
    console.log('-------------------------Example on move function declaration up-------------------------');
    var myDreamFunction;

    if (myDreamFunction != null) {
        myDreamFunction();
    } else {
        console.log('I am a loser without any dream!');
    }

    function myDreamFunction() {
        console.log('I have a dream!');
    }
})();

// An example of bad result using with
// The following code can't be run in strict mode
//(function() {
//    console.log('-------------------------Example on bad result using with-------------------------');
//    var me = {
//        wallet: {
//            rich: false
//        }
//    };
//
//    with (me.wallet) {
//        me.wallet = {
//            rich: true
//        };
//
//        if(rich) {
//            console.log('I am rich!');
//        } else {
//            console.log('I am still poor!');
//        }
//    }
//})();

// An example of eval
(function(global) {
    console.log('-------------------------Example on eval-------------------------');

    console.log('Running local eval ...');
    (function testLocalEval() {
        var value;
        eval("value='local';");
        console.log('Local is affected: ' + (value === 'local'));
    })();
    console.log('Global is affected: ' + (global.value === 'local'));
    delete global.value;    // In case global is polluted

    console.log('Running local eval with new variable ...');
    (function testLocalEvalWithVar() {
        var value;
        eval("var value='local';");
        console.log('Local is affected: ' + (value === 'local'));
    })();
    console.log('Global is affected: ' + (global.value === 'local'));
    delete global.value;    // In case global is polluted

    console.log('Running global eval ...');
    (function testGlobalEval() {
        var value;
        global.eval("value='local';");
        console.log('Local is affected: ' + (value === 'local'));
    })();
    console.log('Global is affected: ' + (global.value === 'local'));
    delete global.value;    // In case global is polluted

    console.log('Running global eval with new variable ...');
    (function testGlobalEvalWithVar() {
        var value;
        global.eval("var value='local';");
        console.log('Local is affected: ' + (value === 'local'));
    })();
    console.log('Global is affected: ' + (global.value === 'local'));
    delete global.value;    // In case global is polluted
})(window);

// An example of Function
(function(global) {
    console.log('-------------------------Example on Function-------------------------');

    console.log('Running function ...');
    (function testFunction() {
        var value;
        (new Function("value='local';"))();
        console.log('Local is affected: ' + (value === 'local'));
    })();
    console.log('Global is affected: ' + (global.value === 'local'));
    delete global.value;    // In case global is polluted

    console.log('Running function with new variable ...');
    (function testFunctionWithVar() {
        var value;
        (new Function("var value='local';"))();
        console.log('Local is affected: ' + (value === 'local'));
    })();
    console.log('Global is affected: ' + (global.value === 'local'));
    delete global.value;    // In case global is polluted
})(window);
