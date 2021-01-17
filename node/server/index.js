const express = require('express'),
path = require('path');

let app = express();

// set paths
app.set('dir_views', path.join(__dirname, 'views'));

// view is ejs
app.set('views', app.get('dir_views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', {});
});

let port = process.argv[2] || 8080;
app.listen(port, () => {
    console.log('server started on port: ' + port);
});