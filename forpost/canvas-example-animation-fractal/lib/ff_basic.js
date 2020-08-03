var FF = function (opt) {
    var api = {};
    opt = opt || {};
    api.ani = {};
    api.forFrame = opt.forFrame || function () {};
    var setMainPerAndBias = function (api) {
        api.per = api.frameIndex / api.maxFrame;
        api.bias = 1 - Math.abs(0.5 - api.per) / 0.5;
    };
    var forFrame = function (frameIndex, maxFrame) {
        api.frameIndex = frameIndex;
        api.maxFrame = maxFrame;
        setMainPerAndBias(api);
        api.forFrame.call(api, api, frameIndex, maxFrame);
        return api.ani;
    };
    return function (frame, maxFrame) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 50 : maxFrame;
        frame = frame > maxFrame ? frame % maxFrame : frame;
        frame = frame < 0 ? maxFrame - Math.abs(frame) % maxFrame : frame;
        forFrame(frame, maxFrame);
        return api.ani;
    };
};
