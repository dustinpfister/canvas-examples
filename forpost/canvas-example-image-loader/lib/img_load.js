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
            (function (i, img) {
                img.addEventListener('load', function (e) {
                    count += 1;
                    // call on file load method
                    opt.onFileLoad(count / opt.fileCount, i, img, e);
                    // if last file call on done
                    if (count === opt.fileCount) {
                        opt.onDone(imgArr);
                    }
                });
                img.addEventListener('error', function (e) {
                    opt.onError(e, i, img);
                });
            }
                (i, img));
            imgArr.push(img);
            img.src = opt.baseURL + i + opt.fileType;
            i += 1;
        };
        return imgArr;
    };
}
    ());
