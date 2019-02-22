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
    var data = req.body,
        duplicates = false;
    data.token = random12chars();

    if(data.images) {
        for(var i = 0; i < data.images.length; i++) {
            if(data.images[i] == data.images[i + 1] && data.images[i + 1] !== undefined)
                duplicates = true;
        }

        if(duplicates == false) {
            var data_model = new models.albums(data);

            data_model.save(function(err) {
                if(err && err.name == 'ValidationError') {
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
        } else {
            res.send({
                success: false,
                message: 'Duplicates found!'
            });
        }
    } else {
        res.send({
            success: false,
            message: 'No images were sent'
        });
    }
});

app.post('/return_album', function(req, res) {
    models.albums.findOne({token: req.body.token}, function(err, result) {
        if(err) return res.send({
            success: false,
            message: err
        });

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