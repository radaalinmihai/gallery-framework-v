function sortQueries (settings) {
	var params = {}, mediaQueries = [], k = 0, j, aux;

	var w = window.innerWidth;

	for (var key in settings.responsive) {
	    mediaQueries[k] = key;
	    mediaQueries[k] = parseFloat(mediaQueries[k]);
	    k++;
	}

	for (i = 0; i < k - 1; i++) {
		for (j = i+1; j < k; j++)
			if (mediaQueries[i] < mediaQueries[j]) {
				aux = mediaQueries[i];
				mediaQueries[i] = mediaQueries[j];
				mediaQueries[j] = aux;
			}
	}

	var ok = 0, res = -1;

	for (i = 0; i < k; i++) {
		if (w < mediaQueries[i]) {
			res = mediaQueries[i];
		}
	}

	if (res != -1) {
		for (var key in settings.responsive[res]) {
			params[key] = settings.responsive[res][key];
		}
	}
	
	for (var key in settings) {
		if (key != "responsive") {
			if (params.hasOwnProperty(key)) {
				for (var opt in settings[key]) {
					if (!(params[key].hasOwnProperty(opt))) {
						params[key][opt] = settings[key][opt];
					}
				}
			}
			else {
				params[key] = settings[key];
			}
		}
	}

	return params;
}