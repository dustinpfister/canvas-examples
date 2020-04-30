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
        imgArr = [],
        i = 0,
        count = 0;
        while (i < opt.fileCount) {
            img = new Image();
            (function (i) {
                img.addEventListener('load', function (e) {
                    count += 1;
                    opt.onFileLoad(count / opt.fileCount, i, img, e);
                    if (count === opt.fileCount) {
                        opt.onDone(imgArr);
                    }
                });
            }
                (i));
            imgArr.push(img);
            img.src = opt.baseURL + i + opt.fileType;
            i += 1;
        };
        return imgArr;
    };

}
    ());
