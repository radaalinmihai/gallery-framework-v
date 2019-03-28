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