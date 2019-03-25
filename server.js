var express = require('express'),
    cors = require('cors'),
    http = require('http'),
    https = require('https'),
    imageType = require('image-type'),
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
    var maximum_req = data.images.length;

    if (data.images) {
        for (var i = 0; i < data.images.length; i++) {
            var client = http;

            var url = new URL(data.images[i]);
            if (url.toString().indexOf('https') == 0)
                client = https;

            client.get(data.images[i], function (response) {
                response.on('data', function (chunk) {
                    var imgType = imageType(chunk).mime;
                    switch (imgType) {
                        case 'image/jpeg':
                            break;
                        case 'image/png':
                            break;
                        case 'image/gif':
                            break;
                        default:
                            return res.send({
                                success: false,
                                message: "Only JPG/JPEG, PNG and GIF formats are supported!"
                            });
                    }

                    counted_req++;
                    response.destroy();

                    if (counted_req == maximum_req) {

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

    } else {
        res.send({
            success: false,
            message: 'No images were sent'
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

app.post('/check_token', function(req, res) {
    var token = req.body.token;
    models.albums.find({ token: token }, function(err, response) {
        if(err) {
            return res.send({
                success: false,
                message: err.message
            });
        }

        if(response == null) {
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