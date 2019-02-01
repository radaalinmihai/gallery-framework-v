function init (containerID, settings) {
	var container = document.getElementById(containerID); // get container

	var params = {}, mediaQueries = [], k = 0, j, aux;

	if (settings.hasOwnProperty("responsive")) {
		params = sortQueries(settings);
	}
	else params = settings;

	switch (params.type) { // check which format is requested
		case "carousel":

			var stage = container.firstElementChild, // get stage (second container)
						members = stage.children, // get list of elements
						containerWidth = container.offsetWidth, // width of container at time of init
						i, itemsPerSlide;


			// Give appropriate classes to both containers			
			stage.classList.add("car-stage");
			container.classList.add("carousel-container"); 


			// Checking how many items per slide and assigning appropriate individual widths
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


			// Generating navigation buttons
			var navigation = 0;

			if (params.hasOwnProperty("nav")) {
				if (params.nav != null && params.nav.show == true) {
					nav(params.nav, container);
					navigation = 1;
				}
			}


			// Calling transition function to make carousel transitions and gestures work
			if (params.hasOwnProperty("transition")) {
				if (params.transition != null) {
					console.log("got here");
					animateTransition(params.transition, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID);
				}
			}


			// Creating fullscreen buttons and allowing fullscreen functionality
			if (params.hasOwnProperty("fullscreen")) {
				if (params.fullscreen.show == true) fullscreen(params.fullscreen, container, stage);
			}

		break;

		case "grid":
			container.classList.add("grid-container");
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
			container.classList.add("list-container");

	}
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

	if (options.hasOwnProperty("transitionType")) {
		var transitionTypePar = options.transitionType;
	}
	else var transitionTypePar = "slide";

	if (navigation) {
		prev.onclick = function() {
			moveDown(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);
		}
		next.onclick = function() {
			moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);
		}
		document.onkeydown = arrowPress;
		function arrowPress(e) {
			if (e.keyCode == '37') {
				moveDown(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);
			}
			if (e.keyCode == '39') {
				moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);
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
								moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);
							}
						}, options.autoInterval);
					}
				}
				else error("autoInterval");
			}
		}
	}

	addDrag(stage, stageWidth, containerWidth, memberWidth);
	addSwipe("item", stage, stageWidth, containerWidth, memberWidth, transitionItemsNum);
}