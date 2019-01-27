var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var albums = new Schema({
    album_name: { type: String },
    items: { type: Number },
    type: { type: String },
    transition_type: { type: String },
    auto: { type: Boolean },
    auto_interval: { type: Number },
    prev_button: { type: String },
    next_button: { type: String },
    token: { type: String }
});

module.exports = {albums: mongoose.model('albums', albums, 'albums')};