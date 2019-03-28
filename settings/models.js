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
        required: function() {
            return this.type == 'carousel' || this.type == 'grid';
        }
    },
    transition: {
        transition_type: {
            type: String,
            required: function () {
                return this.type == 'carousel';
            }
        },
        auto: {
            type: Boolean,
            required: function () {
                return this.type == 'carousel';
            }
        },
        auto_interval: {
            type: Number
        },
        gestures: {
            type: Boolean,
            required: function () {
                return this.type == 'carousel'
            }
        }
    },
    nav: {
        show: {
            type: Boolean,
            required: function () {
                return this.type == 'carousel'
            }
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
    responsive: {
        new_breakpoint: { type: String },
        items_per_row: { type: Number },
        items_per_trans: { type: Number },
        auto_responsive: { type: Boolean },
        nav_select: { type: Boolean },
        fullscreen_responsive: { type: Boolean }
    },
    images: {
        type: Array,
        required: function () {
            return this.type == 'carousel' || this.type == 'grid';
        }
    },
    audio: {
        type: Array,
        required: function () {
            return this.type == 'audio';
        }
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = { albums: mongoose.model('albums', albums, 'albums') };