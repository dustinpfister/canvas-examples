var FF = function (opt) {

    var api = {};
    opt = opt || {};
    api.ani = {};
    api.forFrame = opt.forFrame || function () {};

    // set the main percent and bias values for api
    var setMainPerAndBias = function (api) {
        api.per = api.frameIndex / api.maxFrame;
        api.bias = 1 - Math.abs(0.5 - api.per) / 0.5;
    };

    // private forFrame method
    var forFrame = function (frameIndex, maxFrame) {
        // set api frame index and max frame
        api.frameIndex = frameIndex;
        api.maxFrame = maxFrame;
        // set main percent done and bias value
        setMainPerAndBias(api);
        // call api forFrame with current api state
        api.forFrame.call(api, api, frameIndex, maxFrame);
        // return just the ani object
        return api.ani;
    };

    // public method used to set by frameIndex
    // over max Frames
    return function (frame, maxFrame) {
        // defaults if undefined for frame index and max frame
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 50 : maxFrame;
        // wrap frame index
        frame = frame > maxFrame ? frame % maxFrame : frame;
        frame = frame < 0 ? maxFrame - Math.abs(frame) % maxFrame : frame;
        // call forFrame with parsed frame and maxFrame
        forFrame(frame, maxFrame);
        // return just the animation object
        return api.ani;
    };
};
