var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var albums = new Schema({
    album_name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
    transition: {
        transitionType: {
            type: String,
            required: true
        },
        auto: {
            type: Boolean,
            required: true
        },
        autoInterval: {
            type: Number
        },
    },
    nav: {
        show: {
            type: Boolean
        },
        prev: {
            type: String
        },
        next: {
            type: String
        }
    },
    fullscreen: {
        show: {
            type: Boolean
        },
        open: {
            type: String
        },
        close: {
            type: String
        }
    },
    lang: {
        next: {
            type: String
        },
        prev: {
            type: String
        },
        lang: {
            type: String
        }
    },
    responsive: { type: Array },
    images: {
        type: Array,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = { albums: mongoose.model('albums', albums, 'albums') };