var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/frontend/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/frontend/register.html');
    socket.on('connection', (socket) => {
        console.log('a user connected');
        // urmeaza sa fac ceva cu cacatul asta de socket.io, sa primesc raspuns live or some shit
    });
});

http.listen(3000, (req, res) => {
    console.log('Listening on port 3000');
});