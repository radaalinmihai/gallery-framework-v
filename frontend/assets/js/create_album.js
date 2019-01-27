function postReq(elementToWriteResponse, dataToSend) {
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
    xhr.open('POST', 'http://localhost:3000/create_album', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(dataToSend));
}

function isValid(element) {
    return element.name && element.value;
}

function formToJSON(elements) {
    return [].reduce.call(elements, function(data, element) {
        if(isValid(element))
            data[element.name] = parseInt(element.value) ? parseInt(element.value) : element.value.toString();
        return data;
    }, {});
};

document.addEventListener('DOMContentLoaded', function(e) {
    e.preventDefault();
    var form = document.getElementsByClassName('form-styling')[0];
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = formToJSON(this.elements),
            div_to_write = document.getElementById('writeDataHere');
        console.log(data);
        postReq(null, data);
    });
});