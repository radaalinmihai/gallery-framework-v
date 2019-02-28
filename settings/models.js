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
    transition: [{
        transition_type: {
            type: String,
            required: true
        },
        auto: {
            type: Boolean,
            required: true
        },
        auto_interval: {
            type: Number
        },
    }],
    nav: [{
        show: {
            type: Boolean
        },
        prev: {
            type: String
        },
        next: {
            type: String
        }
    }],
    fullscreen: [{
        show: {
            type: Boolean
        },
        open: {
            type: String
        },
        close: {
            type: String
        }
    }],
    lang: [{
        next: {
            type: String
        },
        prev: {
            type: String
        },
        lang: {
            type: String
        }
    }],
    responsive: [{
        new_breakpoint: { type: String },
        items_per_row: { type: Number },
        items_per_trans: { type: Number },
        auto_responsive: { type: Boolean },
        nav_select: { type: Boolean },
        fullscreen_responsive: { type: Boolean }
    }],
    images: {
        type: Array,
        required: true
    },
    token: {
        type: String
    }
});

module.exports = { albums: mongoose.model('albums', albums, 'albums') };