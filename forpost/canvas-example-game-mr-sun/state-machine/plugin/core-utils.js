stateMod.load({
    name: 'core-utils',
    type: 'plugin',
    create: function (sm) {

        // log method
        sm.log = function(mess){
            console.log(mess);
        };

        // log once method set up
        sm.logOnce = (function(){
            var called = false;
            return function(mess){
                if(!called){
                    sm.log(mess);
                    called = true;
                }
            };
        }());

        // get an angle from one point to another
        sm.getAngle = function(fromX, fromY, toX, toY){
            return Math.atan2(fromY - toY, fromX - toX) + Math.PI;
        };

        sm.log('create core-utils');
    }
});
