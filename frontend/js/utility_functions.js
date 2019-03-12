function isValid(element) {
    return element.name && element.value;
};


/*


data = {
    nume: valoare,
    type: valoare,
    transition: {
        transition_type: valoare
    }
}


*/

function formToJSON(form) {
    var form = form.elements;
    var data = {};
    data[form[0].name] = form[0].value;
    for (var i = 0; i < form.length; i++) {
        var item = form.item(i);

        if (isValid(item)) {
            if (form[0].value == 'carousel') {
                switch (item.parentNode.parentNode.parentNode.id) {
                    case 'transition':
                        if (!('transition' in data))
                            data['transition'] = {};
                        data['transition'][item.name] = item.value;
                        break;
                    case 'navigation':
                        if (!('nav' in data))
                            data['nav'] = {};
                        data['nav'][item.name] = item.value;
                        break;
                    case 'fullscreen':
                        if (!('fullscreen' in data))
                            data['fullscreen'] = {};
                        data['fullscreen'][item.name] = item.value;
                        break;
                    case 'breakpoint':
                        case 'responsive-settings':
                            if (!('responsive' in data))
                                data['responsive'] = {};
                            data['responsive'][item.name] = item.value;
                            break;
                    default:
                        if(item.name == 'images') {
                            if(!('images' in data))
                                data['images'] = [];
                            data['images'].push(item.value);
                        } else
                            data[item.name] = item.value;
                        break;
                }
            } else if (form[0].value == 'grid') {

            } else if (form[0].value == 'audio') {

            } else {

            }
        }
    }

    return data;
};

module.exports = {
    formToJSON: formToJSON
}