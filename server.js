var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('Hello');
});

http.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
});