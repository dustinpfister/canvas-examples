stateMod.load({
    name: 'core-utils',
    type: 'plugin',
    create: function (sm) {
        sm.log = function(mess){
            console.log(mess);
        };

        sm.log('create core-utils');
    }
});
