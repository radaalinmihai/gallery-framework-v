document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('token_album_form'),
        album_shows = document.getElementsByClassName('albums_show')[0];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var tokenInput = this.elements[0].value;
        console.log(tokenInput);
        
        ajax('http://localhost:3000/return_album', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                token: tokenInput
            })
        })
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.warn(err);
        });
    });
});