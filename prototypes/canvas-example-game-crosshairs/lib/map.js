var mapMod = (function () {

    return {

        create: function () {
            var map = {
                cellSize: 32,
                cellWidth: 32,
                cellHeight: 16,
                cells: []
            };
            var i = 0,
            x,
            y,
            len = map.cellWidth * map.cellHeight;
            while (i < len) {
                map.cells.push({
                    i: i,
                    x: i % map.cellWidth,
                    y: Math.floor(i / map.cellWidth)
                });
                i += 1;
            }
            return map;
        },

        clampOffset: function (map, offset) {
            offset.x = offset.x > 0 ? 0 : offset.x;
            offset.y = offset.y > 0 ? 0 : offset.y;
            offset.x = offset.x < map.cellWidth * map.cellSize * -1 ? map.cellWidth * map.cellSize * -1 : offset.x;
            offset.y = offset.y < map.cellHeight * map.cellSize * -1 ? map.cellHeight * map.cellSize * -1 : offset.y;
        },

        getWithCross: function (map, cross, canvasX, canvasY) {

            var x = canvasX - cross.center.x + Math.abs(cross.offset.x),
            y = canvasY - cross.center.y + Math.abs(cross.offset.y);

            return {
                x: Math.floor(x / map.cellSize),
                y: Math.floor(y / map.cellSize)
            };

        }

    }

}
    ());
