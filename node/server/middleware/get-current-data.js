const fs = require('fs'),
path = require('path'),
url = require('url');

var parseJSURLS = (req, files) => {
    return files.toString().split('\n').map((relPath)=>{
        return url.resolve(req.protocol + '://' + req.headers.host +'/js/' + req.params.exampleName + '/build/', relPath);
    });
};

module.exports = (req, res, next) => {

    var dir_canvas_example = path.join( req.app.get('dir_forpost'), req.params.exampleName),
    exampleName = req.params.exampleName;

    fs.readFile(path.join(dir_canvas_example, 'build/files.txt'), (e, files)=>{

        if(e){
            res.current = {
                success: false,
                javaScriptFiles: ''
            };
        }else{
            res.current = {
                success: true,
                javaScriptFiles: parseJSURLS(req, files)
            };
        }

        next();
    });

};