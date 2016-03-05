"use strict";

// Singleton design pattern
(function() {
    console.log('-------------------------Example on singleton-------------------------');
    var Sun = (function() {
        var sunInstance;

        function createInstance() {
            return {
                shiningCount: 0,
                shine: function() {
                    console.log('Sun is shining ...');
                    this.shiningCount++;
                },
                getShiningCount: function() {
                    return this.shiningCount;
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
    sun.shine();
    console.log('Count in the other sun: ' + anotherSun.getShiningCount());
})();

// Singleton by overriding new operator
(function() {
    console.log('-------------------------Example on singleton by overriding new-------------------------');
    var Sun = (function() {
        var sunInstance;

        function createInstance() {
            return {
                shiningCount: 0,
                shine: function() {
                    console.log('Sun is shining ...');
                    this.shiningCount++;
                },
                getShiningCount: function() {
                    return this.shiningCount;
                }
            };
        }

        return function() {
            if (!sunInstance) {
                sunInstance = createInstance();
            }
            return sunInstance;
        };
    })();

    var sun = new Sun();
    var anotherSun = new Sun();
    console.log('Are there two suns: ' + (sun !== anotherSun));
    sun.shine();
    sun.shine();
    console.log('Count in the other sun: ' + anotherSun.getShiningCount());
})();
