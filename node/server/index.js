const express = require('express'),
path = require('path');

let app = express();

// set paths
app.set('dir_server', __dirname);
app.set('dir_views', path.join(__dirname, 'views'));
app.set('dir_middleware', path.join(__dirname, 'middleware'));
app.set('dir_root', path.resolve(__dirname, '../..') );
app.set('dir_forpost', path.resolve(app.get('dir_root'), 'forpost'));

// view is ejs
app.set('views', app.get('dir_views'));
app.set('view engine', 'ejs');

// set up forpost folder as a public folder
//app.use('/js', express.static(app.get('dir_forpost') ) )
app.use('/js', express.static( app.get('dir_forpost'), {index: false, extensions: ['js'], immutable: true, maxAge: 0 } )  );


app.get('/', [
    require( path.join(app.get('dir_middleware'), 'get-forpost-list.js') ),
    (req, res)=>{
        res.render('index', {
            dir_root: app.get('dir_root'),
            dir_forpost: app.get('dir_forpost'),
            for_post_list: res.for_post_list
        });
    }
]);

// current version of a canvas example
app.get('/current/:exampleName', [
    require( path.join(app.get('dir_middleware'), 'get-current-data.js') ),
    (req, res)=>{
        res.render('current', {
            exampleName: req.params.exampleName,
            current: res.current
        });
    }
]);

let port = process.argv[2] || 8080;
app.listen(port, () => {
    console.log('server started on port: ' + port);
});