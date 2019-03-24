function isValid(element) {
    return element.name && element.value;
};

function urlParamsParser(url) {
    var data = {};
    var paramPos = url.indexOf('token=');
    var paramValue = url.substring(paramPos + 6, url.length);
    
    if(paramPos == -1)
        data['token'] = null;
    else
        data['token'] = paramValue;

    return data;
};

function formToJSON(form) {
    var data = {};
    data.type = document.querySelector('input[name="type"]').value;

    for(var i = 0; i < form.elements.length; i++) {
        var item = form.elements[i];
        if(isValid(item)) {
            if(data.type == 'carousel') {
                switch(item.parentNode.parentNode.parentNode.id) {
                    case 'transition':
                        if(!('transition' in data))
                            data['transition'] = {};
                        data.transition[item.name] = item.value;
                        break;
                    case 'navigation':
                        if(!('navigation' in data))
                            data['nav'] = {};
                        data.nav[item.name] = item.value;
                        break;
                    case 'fullscreen':
                        if(!('fullscreen' in data))
                            data['fullscreen'] = {};
                        data.fullscreen[item.name] = item.value;
                        break;
                    case 'responsive-settings':
                        if (!('responsive' in data))
                            data['responsive'] = {};
                        data['responsive'][item.name] = item.value;
                        break;
                    default:
                    if(item.name == 'images') {
                        if(!('images' in data))
                            data['images'] = [];
                        if(('images' in data))
                            data.images.push(item.value);
                    } else
                        data[item.name] = item.value;
                    break;
                }
            } else if(data.type == 'audio') {
                if(item.name == 'images') {
                    if(!('audio' in data))
                        data.audio = [];
                    data['audio'].push(item.value);
                }
            } else
                data[item.name] = item.value;
        }
    }
    return data;
};