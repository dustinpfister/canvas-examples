var imgLoad = (function () {

    return function (opt) {

        opt = opt || {};
        opt.baseURL = opt.baseURL || '';
        opt.fileType = opt.fileType || '.png';
        opt.fileCount = opt.fileCount || 1;

        var img = new Image(),
        n = 0;

        img.addEventListener('load', function (e) {

            console.log('load event');
            console.log(e);

        });

        img.src = opt.baseURL + n + opt.fileType;

    };

}
    ());
