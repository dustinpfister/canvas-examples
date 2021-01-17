const fs = require('fs');

module.exports = (req, res, next) => {

    res.for_post_list = [];
    fs.readdir(req.app.get('dir_forpost'), (e, files) => {
        if(files){
            res.for_post_list = files;
        }
        next();
    });
};