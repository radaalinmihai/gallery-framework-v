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
                    album_shows.style.display = 'flex';
                    album_shows.innerHTML = res.data.album_name;
                }
            })
            .catch(function (err) {
                if (err) console.warn(err);
            });
    });
});