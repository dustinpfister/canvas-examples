var cross = (function () {
    return {
        create: function (canvas) {

            return {
                userDown: false,
                center: {
                    x: canvas.width / 2,
                    y: canvas.height / 2
                },
                crosshairs: {
                    x: canvas.width / 2,
                    y: canvas.width / 2
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
