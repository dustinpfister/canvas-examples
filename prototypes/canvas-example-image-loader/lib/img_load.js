var imgLoad = (function () {

    return function (opt) {

        opt = opt || {};
        opt.baseURL = opt.baseURL || '';
        opt.fileType = opt.fileType || '.png';
        opt.fileCount = opt.fileCount || 1;
        opt.onFileLoad = opt.onFileLoad || function () {};
        opt.onDone = opt.onDone || function () {};
        opt.onError = opt.onError || function () {};

        var img,
        i = 0,
        count = 0;

        img = new Image();
        img.addEventListener('load', function (e) {
            count += 1;
            opt.onFileLoad(count / opt.fileCount, i, img, e);
            if (count === opt.fileCount) {
                opt.onDone();
            }
        });
        img.src = opt.baseURL + i + opt.fileType;

    };

}
    ());
