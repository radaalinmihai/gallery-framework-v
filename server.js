var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var random12chars = require('./random12chars.js');
var config = require('./config.js');
var mongoose = require('mongoose');
var models = require('./models.js');

mongoose.connect(config.database, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/frontend/', {
    extensions: ['html', 'htm']
}));

app.get('/', function(req, res) {
    res.send('hello');
});

app.post('/create_album', function(req, res) {
    var data = req.body;
    data.token = random12chars();
    var data_to_db = new models.albums(data);
    console.log(data);
    data_to_db.save(function(err) {
        if(err) return console.warn(err);
        res.send({
            success: true,
            message: 'Album created succesfuly!'
        });
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});