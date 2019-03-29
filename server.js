var express = require('express'),
    cors = require('cors'),
    http = require('http'),
    https = require('https'),
    fileType = require('file-type'),
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

app.post('/create_album', function (req, res) {
    var data = req.body;
    data.token = random12chars();
    var counted_req = 0;
    var ext_error = 0;

    if(('images' in data))
        var type = 'images';
    else if(('audio' in data))
        var type = 'audio';
    else return res.send({
        success: false,
        message: 'No images/audio files sent!'
    });

    var maximum_req = data[type].length;
    for (var i = 0; i < data[type].length; i++) {
        var client = http;

        var url = new URL(data[type][i]);
        if (url.toString().indexOf('https') == 0)
            client = https;

        client.get(data[type][i], function (response) {
            response.on('data', function (chunk) {
                var imgType = fileType(chunk).mime;
                switch (imgType) {
                    case 'image/jpeg':
                        break;
                    case 'image/png':
                        break;
                    case 'image/gif':
                        break;
                    case 'audio/mpeg':
                        break;
                    default:
                        ext_error = 1;
                        break;
                }

                counted_req++;
                response.destroy();

                if (counted_req == maximum_req) {
                    if(ext_error == 1)
                        return res.send({
                            success: false,
                            message: 'Formats supported are JPG, PNG, GIF and MP3'
                        });
                    var data_model = new models.albums(data);

                    data_model.save(function (err) {
                        if (err && err.name == 'ValidationError') {
                            return res.send({
                                success: false,
                                message: 'All fields with an *(asterisk) must be completed/filled!'
                            });
                        }
                        res.send({
                            success: true,
                            message: 'Album created succesfuly! Here is the token ' + data.token,
                            token: data.token
                        });
                    });
                }
            });
        }).on('error', function (error) {
            return res.send({
                success: false,
                message: error.message
            });
        });
    }
});

app.post('/return_album', function (req, res) {
    models.albums.findOne({ token: req.body.token }, function (err, result) {
        if (err) return res.send({
            success: false,
            message: err.message
        });

        if (result == null) {
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

app.post('/check_token', function (req, res) {
    var token = req.body.token;
    models.albums.find({ token: token }, function (err, response) {
        if (err) {
            return res.send({
                success: false,
                message: err.message
            });
        }

        if (response == null) {
            return res.send({
                success: false,
                message: 'No token found!'
            });
        }

        res.send({
            success: true,
            message: 'Token found!'
        });
    });
});

app.listen(3000, function () {
    console.log('Listening on port 3000');
});