(function () {
    // TITLE STATE
    stateMachine.load({
        key: 'title',
        init: function (sm) {

        },
        trans: function (sm, secs) {

        },
        update: function (sm, secs) {},
        draw: function (sm, ctx, canvas) {
            draw.background(ctx, canvas, sm.background);
        },
        click: function (sm, pos, e) {
         
        }
    });
}());
