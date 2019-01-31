var m = require('./ajax.js'),
    utility = require('./utility_functions.js');

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementsByClassName('form-styling')[0].querySelector('form'),
        album_shows = document.getElementsByClassName('albums_show')[0];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var formToken = utility.formToJSON(this.elements);
        m.ajax('http://localhost:3000/return_album', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formToken)
        })
            .then(function (res) {
                if(res.success === true) {
                    var album = res.data;
                    album_shows.style.display = 'flex';
                    album_shows.innerHTML = '<h1>' + album.album_name + '</h1>' +
                        '<div id="carousel1">'+
                        '<div>' +
                        '</div>' +
                        '</div>';
                    var carousel_kid = document.getElementById('carousel1').children[0];
                    for(var i = 0; i < album.images.length; i++) {
                        carousel_kid.innerHTML = carousel_kid.innerHTML + '<div class="member">' +
                            '<img src="' + album.images[i] + '" /></div>';
                    }
                    init('carousel1', {
                        type: album.type,
                        items: album.items,
                        transition: {
                            transitionType: album.transition_type,
                            transitionItems: album.transition_items,
                            auto: album.auto
                        }
                    });
                }
            })
            .catch(function (err) {
                if (err) console.warn(err);
            });
    });
});