var ajax = require('./ajax.js'),
    utility = require('./utility_functions.js');

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementsByClassName('form-styling')[0].querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var formToken = utility.formToJSON(this.elements);
        ajax.post(null, formToken, 'http://localhost:3000/return_album');
    });
});