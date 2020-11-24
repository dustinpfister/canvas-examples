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

        sm.log('create core-utils');
    }
});
