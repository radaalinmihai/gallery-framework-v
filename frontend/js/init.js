function init (containerID, settings) {
	var container = document.getElementById(containerID); // get container

	var params = {}, mediaQueries = [], k = 0, j, aux;

	if (settings.hasOwnProperty("responsive")) {
		var w = window.innerWidth;

		for (var key in settings.responsive) {
		    mediaQueries[k] = key;
		    mediaQueries[k] = parseInt(mediaQueries[k]);
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

	}
	else params = settings;

	console.log(params);

	switch (params.type) { // check which format is requested
		case "carousel":
			container.className += " carousel-container"; 
			var stage = container.firstElementChild; // get stage
			stage.className += " car-stage";
			var members = stage.children; // get list of elements
			var containerWidth = container.offsetWidth; // width of container at time of init
			var i, itemsPerSlide;


			/* Handling of responsive items per slide */

			if (params.hasOwnProperty("items")) {
				if (params.items != null) {
					itemsPerSlide = params.items;
				}
			}
			else itemsPerSlide = 3; // defaults to 3 items per slide

			var memberWidth = containerWidth / itemsPerSlide;
			for (i = 0; i < members.length; i++) {
				members[i].style.width = memberWidth.toString() + "px";
			}
			var stageWidth = memberWidth * members.length;
			stage.style.width = stageWidth.toString() + "px";

			var navigation = 0;

			if (params.hasOwnProperty("nav")) {
				if (params.nav != null && params.nav.show == true) {
					nav(params.nav, container);
					navigation = 1;
				}
			}

			if (params.hasOwnProperty("transition")) {
				if (params.transition != null) {
					console.log("got here");
					animateTransition(params.transition, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID);
				}
			}

			if (params.hasOwnProperty("fullscreen")) {
				if (params.fullscreen.show == true) fullscreen(params.fullscreen, container, stage);
			}

		break;

		case "grid":
			container.className += " grid-container";
			var members = container.children;

			if (params.hasOwnProperty("itemsPerRow")) {
				if (params.itemsPerRow != null) {
					var perc = 100 / params.itemsPerRow;
				}
			}
			else var perc = 25; // grid defaults to 4 items per row

			for (var i = 0; i < members.length; i++) {
				members[i].style.width = perc.toString() + "%";
			}

		break;

		case "list":
			container.className += " list-container";

	}
}

function error (missingPar) {
	console.log("You have to add the property for " + missingPar + " in order for it to work.");
}

function nav (options, container) {
	var navContainer = document.createElement("div");
	navContainer.className += " carousel-nav";
	container.appendChild(navContainer);

	if (options.hasOwnProperty("prev")) {
		if (options.prev != null) {
			let doc = new DOMParser().parseFromString(options.prev, 'text/html');
			navContainer.appendChild(doc.body.firstChild);
		}
	}

	if (options.hasOwnProperty("next")) {
		if (options.next != null) {
			let doc = new DOMParser().parseFromString(options.next, 'text/html');
			navContainer.appendChild(doc.body.firstChild);
		}
	}
}

function fullscreen (options, container, stage) {
	var butContainer = document.createElement("div");
	butContainer.className += " car-full-buttons";
	container.insertBefore(butContainer, stage);

	if (options.hasOwnProperty("open")) {
		if (options.open != null) {
			let doc = new DOMParser().parseFromString(options.open, 'text/html');
			butContainer.appendChild(doc.body.firstChild);
		}
	}

	if (options.hasOwnProperty("close")) {
		if (options.close != null) {
			let doc = new DOMParser().parseFromString(options.close, 'text/html');
			butContainer.appendChild(doc.body.firstChild);
		}
	}

	var enlarge = butContainer.children[0];
	var close = butContainer.children[1];

	close.style.display = "none";

	function toggleFull () {
		if (container.classList.contains("full-car")) {
			container.classList.remove("full-car");
			close.style.display = "none";
			enlarge.style.display = "inline-block";
		}
		else {
			container.classList.add("full-car");
			close.style.display = "inline-block";
			enlarge.style.display = "none";
		}
	}

	enlarge.onclick = toggleFull;
	close.onclick = toggleFull;
}

function animateTransition(options, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID) {
	if (options.hasOwnProperty("transitionItems")) {
		if (options.transitionItems != null) {
			var transitionItemsNum = options.transitionItems;
		}
	}
	else var transitionItemsNum = 1; // carousel defaults to 1 item per transition

	var mouseover = 1;

	container.onmouseover = function() {
		mouseover = 0;
	}

	container.onmouseout = function() {
		mouseover = 1;
	}

	if (navigation) {
		var prev = container.children[1].children[0];
		var next = container.children[1].children[1];
	}

	stage.style.left = "0px";

	// for (var i = 0; i < stage.children; i++) {
	// 	stage.children[i].ondragstart = function() {
	// 		return false;
	// 	}
	// }

	if (options.hasOwnProperty("transitionType")) {
		var transitionTypePar = options.transitionType;
	}
	else var transitionTypePar = "slide";

	switch (transitionTypePar) {
		case "slide":
			if (navigation) {
				prev.onclick = function() {
					if (parseInt(stage.style.left) != 0) {
						var newSize = parseInt(stage.style.left) + containerWidth;
						stage.style.left = newSize.toString() + "px";
					}
				}
				next.onclick = function() {
					if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
						console.log(transitionItemsNum);
						var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
						stage.style.left = "-" + newSize.toString() + "px";
					}
					else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth)) {
						var newSize = parseInt(stage.style.left) * -1 + containerWidth;
						stage.style.left = "-" + newSize.toString() + "px";
					}
				}

				document.onkeydown = arrowPress;

				function arrowPress(e) {
					if (e.keyCode == '37') {
						if (parseInt(stage.style.left) * -1 != 0) {
							var newSize = (parseInt(stage.style.left) * -1) - containerWidth;
							stage.style.left = "-" + newSize.toString() + "px";
						}
					}
					if (e.keyCode == '39') {
						if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
							var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
							stage.style.left = "-" + newSize.toString() + "px";
						}
						else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth)) {
							var newSize = parseInt(stage.style.left) * -1 + containerWidth;
							stage.style.left = "-" + newSize.toString() + "px";
						}
					}
				}
			}

			if (options.hasOwnProperty("auto")) {
				if (options.auto != null) {
					if (options.auto == true) {
						if (options.hasOwnProperty("autoInterval")) {
							if (options.autoInterval != null) {
								setInterval(function() {
									if (mouseover == 1) {
										if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
											console.log(transitionItemsNum);
											var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
											stage.style.left = "-" + newSize.toString() + "px";
										}
										else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth)) {
											var newSize = parseInt(stage.style.left) * -1 + containerWidth;
											stage.style.left = "-" + newSize.toString() + "px";
										}
									}
								}, options.autoInterval);
							}
						}
						else error("autoInterval");
					}
				}
			}
			else error("auto");

			addDrag(stage, stageWidth, containerWidth, memberWidth);
			addSwipe("item", stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);

		break;

		case "item":

			if (navigation) {
				prev.onclick = function() {
					if (parseInt(stage.style.left) * -1 != 0) {
						console.log("got to nav");
						var newSize = parseInt(stage.style.left) * -1 - (memberWidth * transitionItemsNum);
						stage.style.left = "-" + newSize.toString() + "px";
					}
				}
				next.onclick = function() {
					if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
						var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
						stage.style.left = "-" + newSize.toString() + "px";
					}
					else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth - memberWidth * transitionItemsNum)) {
						var newSize = parseInt(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
						stage.style.left = "-" + newSize.toString() + "px";
					}
				}

				document.onkeydown = arrowPress;

				function arrowPress(e) {
					if (e.keyCode == '37') {
						if (parseInt(stage.style.left) * -1 != 0) {
							var newSize = parseInt(stage.style.left) * -1 - (memberWidth * transitionItemsNum);
							stage.style.left = "-" + newSize.toString() + "px";
						}
					}
					if (e.keyCode == '39') {
						if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
							var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
							stage.style.left = "-" + newSize.toString() + "px";
						}
						else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth - memberWidth * transitionItemsNum)) {
							var newSize = parseInt(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
							console.log(newSize);
							stage.style.left = "-" + newSize.toString() + "px";
						}
					}
				}
			}

			if (options.hasOwnProperty("auto")) {
				if (options.auto != null) {
					if (options.auto == true) {
						if (options.hasOwnProperty("autoInterval")) {
							if (options.autoInterval != null) {
								setInterval(function() {
									if (mouseover == 1) {
										if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
											var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
											stage.style.left = "-" + newSize.toString() + "px";
										}
										else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth - memberWidth * transitionItemsNum)) {
											var newSize = parseInt(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
											stage.style.left = "-" + newSize.toString() + "px";
										}
									}
								}, options.autoInterval);
							}
						}
						else error("autoInterval");
					}
				}
			}
			else error("auto");


			addDrag(stage, stageWidth, containerWidth, memberWidth);
			addSwipe("item", stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);

		break;
	}

}