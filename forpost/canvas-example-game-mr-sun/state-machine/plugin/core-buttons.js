stateMod.load({
    name: 'core-buttons',
    type: 'plugin',
    create: function (sm) {
        console.log('create');
    },
    pointerEvent: function(sm, type, pos, e, state, game) {
        console.log('pointer: ' + type);
    }
});
