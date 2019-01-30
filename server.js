var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    random12chars = require('./random12chars.js'),
    config = require('./settings/config.js'),
    mongoose = require('mongoose'),
    models = require('./settings/models.js'),
    app = express();

mongoose.connect(config.database, { useNewUrlParser: true })
    .catch(function (err) {
        if (err) return console.warn(err);
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend/', {
    extensions: ['html', 'htm']
}));

app.get('/', function (req, res) {
    res.send('hello');
});

app.post('/create_album', function (req, res) {
    var data = req.body;
    data.token = random12chars();

    var album_model = new models.albums(data);

    album_model.save(function (err) {
        if (err) return console.warn(err);
        console.log(data);
        res.send({
            success: true,
            message: 'Album created! Here is the token key: ' + data.token,
            token: data.token
        });
    });
});

app.post('/return_album', function(req, res) {
    models.albums.findOne({token: req.body.token}, function(err, result) {
        if(err) return res.send({
            success: false,
            message: err
        });
        console.log(result)
        if(result == null) {
            return res.send({
                success: false,
                message: 'No token found'
            });
        }
        res.send({
            success: true,
            data: result
        });
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});