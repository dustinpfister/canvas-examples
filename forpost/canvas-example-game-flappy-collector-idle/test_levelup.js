
var berryNextLevelSet = function (bird) {
    var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
    bird.berriesNextLevel = e >= 6 ? Math.pow(2, bird.berryLevel + 5) : 64;
};

var berryLevelCheck = function (bird) {
    var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
    berryNextLevelSet(bird);
    bird.berryLevel = e >= 6 ? e - 4 : 1;
    berryNextLevelSet(bird);
};

var bird = {
    berryLevel:1,
    berriesCollected: 128
};

berryLevelCheck(bird);

console.log(bird);
