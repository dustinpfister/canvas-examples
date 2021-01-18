const fs = require('fs'),
path = require('path'),
url = require('url');

module.exports = (req, res, next) => {

    var dir_canvas_example = path.join( req.app.get('dir_forpost'), req.params.exampleName);
    fs.readFile(path.join(dir_canvas_example, 'build/files.txt'), (e, files)=>{

        if(e){
            res.current = {
                success: false,
                javaScriptFiles: ''
            };
        }else{
            res.current = {
                success: true,
                javaScriptFiles: files.toString().split('\n').map((relPath)=>{
                    //return path.resolve(dir_canvas_example, 'build', relPath);
                    return url.resolve('http://localhost:8020/foo/bar/baz/', '..');
                })
            };
        }

        next();
    });

};