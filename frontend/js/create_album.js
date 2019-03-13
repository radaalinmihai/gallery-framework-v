document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementsByClassName('form-styling')[0];
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = formToJSON(this);
        if(data != false) {
            ajax('http://localhost:3000/create_album', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (err) {
                    if (err) console.warn(err);
                });
        } else
            alert('FBI!!!');
    });
});