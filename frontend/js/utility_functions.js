function isValid(element) {
    return element.name && element.value;
};

function formToJSON(elements) {
    var images = [];
    return [].reduce.call(elements, function(data, element) {
        if(isValid(element) && element.name !== 'images')
            data[element.name] = parseInt(element.value) ? parseInt(element.value) : element.value.toString();
        else if(isValid(element) && element.name == 'images') {
            images.push(element.value);
            data[element.name] = images;
        }
        return data;
    }, {});
};

module.exports = {
    formToJSON: formToJSON
}