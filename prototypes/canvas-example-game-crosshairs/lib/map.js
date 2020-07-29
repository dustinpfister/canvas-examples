var mapMod = (function () {

    return {

        create: function () {

            var map = {
                cellSize: 32,
                cellWidth: 120,
                cellHeight: 120,
                cells: []
            };

            var i = 0,
            x,
            y,
            len = map.celWidth * map.cellHeight;
            while (i < len) {
                cells.push({
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth)
                });
                i += 1;
            }

            return map;

        };

    }

}
    ());
