const fs = require('fs'),
path = require('path'),
url = require('url');

// parse and return an array of URLS for each javaScript file
var parseJSURLS = (req, files) => {
    return files.toString().split('\n').map((relPath)=>{
        return url.resolve(req.protocol + '://' + req.headers.host +'/js/' + req.params.exampleName + '/build/', relPath);
    });
};

// The middleware function
module.exports = (req, res, next) => {
    var dir_canvas_example = path.join( req.app.get('dir_forpost'), req.params.exampleName),
    exampleName = req.params.exampleName;
    // try to read the files.txt file that should be in a build folder for the example
    fs.readFile(path.join(dir_canvas_example, 'build/files.txt'), (e, files)=>{
        if(e){
            // we do not have a build folder for this example
            res.current = {
                success: false,
                javaScriptFiles: ''
            };
        }else{
            // we have a files.txt in the build folder
            res.current = {
                success: true,
                javaScriptFiles: parseJSURLS(req, files)
            };
        }
        next();
    });
};