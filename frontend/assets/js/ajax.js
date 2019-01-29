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