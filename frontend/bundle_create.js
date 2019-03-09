(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function ajax(url, properties) {
    return new Promise(function(resolve, reject) {
        var majax = new XMLHttpRequest();

        majax.onreadystatechange = function () {
            if (majax.readyState == 4) {
                switch (majax.status) {
                    case 400:
                        reject('Bad request');
                        break;
                    case 404:
                        reject('File not found');
                        break;
                    case 500:
                        reject('Internal server error');
                        break;
                    case 503:
                        reject('Service not available');
                        break;
                    default:
                        resolve(JSON.parse(this.responseText));
                        break;
                }
            }
        };
        if(properties.hasOwnProperty('method'))
            majax.open(properties.method, url, true);
        else
            reject("Method can't be empty");
        if(properties.hasOwnProperty('headers')) {
            for(var key in properties.headers)
                majax.setRequestHeader(key, properties.headers[key]);
        }
        if(properties.hasOwnProperty('data') && properties.method.toUpperCase() === 'POST')
            majax.send(properties.data);
        else
            majax.send();
    });
}

module.exports = {
    ajax: ajax
};
},{}],2:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function() {
    var m = require('./ajax.js');
    var utility = require('./utility_functions.js');
    
    var form = document.getElementsByClassName('form-styling')[0];
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = utility.formToJSON(this);
        /*m.ajax('http://localhost:3000/create_album', {
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
            });*/
    });
});
},{"./ajax.js":1,"./utility_functions.js":3}],3:[function(require,module,exports){
function isValid(element) {
    return element.name && element.value;
};

function formToJSON(form) {
    var form = form.elements;
    var data = {};
    var transition = {};
    var nav = {};
    var fullscreen = {};
    var responsive = {};

    for(var i in form) {
        var item = form.item(i);
        if(isValid(item)) {
            console.log(item.parentNode.parentNode.parentNode.id, item.name);
            switch(item.parentNode.parentNode.parentNode.id) {
                case 'transition':
                    transition[item.name] = item.value;
                    break;
                case 'navigation':
                    nav[item.name] = item.value;
                    break;
                case 'fullscreen':
                    fullscreen[item.name] = item.value;
                    break;
                case 'responsive':
                    responsive[item.name] = item.value;
                    break;
                default:
                    data[item.name] = item.value;
                    break;
            }
        }
    }

    data['transition'] = transition;
    data['nav'] = nav;
    data['fullscreen'] = fullscreen;
    data['responsive'] = responsive;

    console.log(data);
};

module.exports = {
    formToJSON: formToJSON
}
},{}]},{},[2]);
