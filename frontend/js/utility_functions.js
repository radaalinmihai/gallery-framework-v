function isValid(element) {
    return element.name && element.value;
};

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
                switch(item.name) {
                    case 'items':
                        data[item.name] = item.value;
                        break;
                    case 'fullscreen_grid':
                        data[item.name] = item.value;
                        break;
                    case 'format_grid':
                        data[item.name] = item.value;
                        break;
                    case 'images':
                        if(!('images' in data))
                            data[item.name] = [];
                        data[item.name].push(item.value);
                        break;
                    case 'album_name':
                        data[item.name] = item.value;
                        break;
                }
            } else if (form[0].value == 'audio') {
                if(isValid(item))
                    if(item.name == 'images') {
                        if(!('audio' in data))
                            data.audio = [];
                        data.audio.push(item.value);
                    }
            }
        }
    }
    console.log(data);
    if(typeof data['album_name'] == 'undefined')
        return false;
    else
        return data;
};