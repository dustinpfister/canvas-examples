const fs = require('fs'),
path = require('path');

module.exports = (req, res, next) => {

    var files = path.join( req.app.get('dir_forpost'), req.params.exampleName, 'build/files.txt');
    fs.readFile(files, (e, files)=>{

        if(e){
            res.current = {
                success: false,
                filesTXT: ''
            };
        }else{
            res.current = {
                success: true,
                filesTXT: files
            };
        }

        next();
    });
/*
    res.for_post_list = [];
    fs.readdir(req.app.get('dir_forpost'), (e, files) => {
        if(files){
            res.for_post_list = files;
        }
        next();
    });
*/

};