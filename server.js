var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/frontend/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/create_album', function(req, res) {
    res.sendFile(__dirname + '/frontend/create_album.html');
});

app.listen(3000, function(req, res) {
    console.log('Listening on port 3000');
});