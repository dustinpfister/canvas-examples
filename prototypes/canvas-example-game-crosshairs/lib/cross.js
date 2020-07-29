var crossMod = (function () {
    return {
        create: function (canvas) {
            return {
                userDown: false,
                radiusInner: canvas.height / 3,
                radiusOutter: canvas.height / 2,
                center: {
                    x: canvas.width / 2,
                    y: canvas.height / 2
                },
                crosshairs: {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    radius: 16
                },
                offset: {
                    x: 0,
                    y: 0
                }
            };

        }
    }
}
    ());
