var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var albums = new Schema({
    album_name: { type: String, required: true },
    images: { type: Array, required: true },
    items: { type: Number, required: true },
    type: { type: String, required: true },
    transition_type: { type: String, required: true },
    auto: { type: Boolean, required: true },
    auto_interval: { type: Number },
    prev_button: { type: String },
    next_button: { type: String },
    token: { type: String }
});

module.exports = { albums: mongoose.model('albums', albums, 'albums') };