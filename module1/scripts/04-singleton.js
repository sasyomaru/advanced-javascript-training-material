"use strict";

// Singleton design pattern
(function() {
    console.log('-------------------------Example on singleton-------------------------');
    var Sun = (function() {
        var sunInstance;

        function createInstance() {
            return {
                shine: function shine() {
                    console.log('Sun is shining ...');
                }
            };
        }

        return {
            getInstance: function getInstance() {
                if (!sunInstance) {
                    sunInstance = createInstance();
                }
                return sunInstance;
            }
        };
    })();

    var sun = Sun.getInstance();
    var anotherSun = Sun.getInstance();
    console.log('Are there two suns: ' + (sun !== anotherSun));
    sun.shine();
})();
