const express = require('express');

let app = express();

app.get('/', (req, res)=>{
    res.send('foo');
});

let port = process.argv[2] || 8080;
app.listen(port, () => {
    console.log('server started on port: ' + port);
});