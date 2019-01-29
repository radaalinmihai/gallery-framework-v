var ajax = require('./ajax.js');
var utility = require('./utility_functions.js');

document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault();
    var form = document.getElementsByClassName('form-styling')[0];
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = utlity.formToJSON(this.elements),
            div_to_write = document.getElementById('writeDataHere');
        console.log(data);
        ajax.post(null, data);
    });
});