(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function postReq(elementToWriteResponse, dataToSend, url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            switch (xhr.status) {
                case 400:
                    console.log('Bad request');
                    break;
                case 404:
                    console.log('File not found');
                    break;
                case 500:
                    console.log('Internal server error');
                    break;
                case 503:
                    console.log('Service not available');
                    break;
                default:
                    console.log(JSON.parse(this.responseText));
                    break;
            }
        }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(dataToSend));
}

module.exports = {
    post: postReq
};
},{}],2:[function(require,module,exports){
function isValid(element) {
    return element.name && element.value;
};

function formToJSON(elements) {
    return [].reduce.call(elements, function(data, element) {
        if(isValid(element))
            data[element.name] = parseInt(element.value) ? parseInt(element.value) : element.value.toString();
        return data;
    }, {});
};

module.exports = {
    formToJSON: formToJSON,
    isValid: isValid
}
},{}],3:[function(require,module,exports){
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
},{"./ajax.js":1,"./utility_functions.js":2}]},{},[3]);
