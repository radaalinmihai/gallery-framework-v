var m = require('./ajax.js'),
    utility = require('./utility_functions.js');

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementsByClassName('form-styling')[0].querySelector('form');

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
                if(res.success) {
                    console.log(res.data)
                }
            })
            .catch(function (err) {
                if (err) console.warn(err);
            });
    });
});