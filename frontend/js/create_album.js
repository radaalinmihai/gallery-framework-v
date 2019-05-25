function create_album(e) {
    e.preventDefault();
    var form = formToJSON(this);
    var error = 0;

    if (typeof form.album_name == "undefined") {
        alert('Give a name to that album!');
        error = 0;
    }
    else if (form.images) {
        if (form.images.length < 0) {
            alert('Give us some images!');
            error = 1;
        }
    } else if (form.audio) {
        if (form.audio.length < 0) {
            alert('Give us some songs!');
            error = 1;
        }
    }

    if(error == 0)
        ajax('https://edociif.netlify.com:3000/create_album', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(form)
        })
            .then(function (res) {
                alert(res.message);
            })
            .catch(function (err) {
                console.warn(err);
            });
}