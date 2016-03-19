"use strict";

(function() {
    console.log('-------------------------Example on performance tuning-------------------------');
    function A50square() {
        var totalCount = 50;
        for(var index = 0; index < totalCount; index++) {
            for(var index2 = 0; index2 < totalCount; index2++) {
            }
        }
    }
    function A10square() {
        var totalCount = 10;
        for(var index = 0; index < totalCount; index++) {
            for(var index2 = 0; index2 < totalCount; index2++) {
            }
        }
    }
    function A500square() {
        var totalCount = 500;
        for(var index = 0; index < totalCount; index++) {
            for(var index2 = 0; index2 < totalCount; index2++) {
            }
        }
    }
    function A5000square() {
        var totalCount = 5000;
        for(var index = 0; index < totalCount; index++) {
            for(var index2 = 0; index2 < totalCount; index2++) {
            }
        }
    }
    var functionArrays = [A500square, A10square, A50square, A5000square];
    var functionTitles = ['500', '10', '50', '5000'];
    var totalFunctionRuns = 30;
    for(var index = 0; index < totalFunctionRuns; index++) {
        var funcIndex = Math.floor(Math.random() * functionArrays.length);
        console.log('Start function: ' + functionTitles[funcIndex]);
        functionArrays[funcIndex]();
        console.log('Finish function run: ' + (index + 1));
    }
    console.log('All functions finish successfully!');
})();
