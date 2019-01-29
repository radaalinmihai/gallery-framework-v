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