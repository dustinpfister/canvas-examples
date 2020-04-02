var solarMod = (function () {

    return {

        create: function () {

            var container = document.getElementById('gamearea') || document.body,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

            canvas.width = 640;
            canvas.height = 480;

            var worlds = [];

            worlds.push(worldMod.create());

            return {
                canvas: canvas,
                ctx: ctx,
                currentWorld: 0,
                worlds: worlds
            };

        },

        update: function () {}

    }

}
    ())
