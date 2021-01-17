const express = require('express'),
path = require('path');

let app = express();

// view is ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', {});
});

let port = process.argv[2] || 8080;
app.listen(port, () => {
    console.log('server started on port: ' + port);
});