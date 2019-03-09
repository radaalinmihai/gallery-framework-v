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