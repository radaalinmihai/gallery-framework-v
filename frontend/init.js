function init (containerID, params) {
	var container = document.getElementById(containerID); // get container

	switch (params.type) { // check which format is requested
		case "carousel":
			container.className += " carousel-container"; 
			var stage = container.firstElementChild; // get stage
			stage.className += " car-stage";
			var members = stage.children; // get list of elements
			var containerWidth = container.offsetWidth; // width of container at time of init
			var i;

			if (params.hasOwnProperty("items")) {
				if (params.items != null) {
					var itemsPerSlide = params.items;
				}
			}
			else var itemsPerSlide = 3; // defaults to 3 items per slide

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
					animateTransition(params.transition, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID);
				}
				else animateTransition("slide", stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID); // defaults to slide
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

function animateTransition(options, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID) {
	console.log(container.offsetWidth);
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

	stage.style.transform = "translateX(0px)";
	var prev = container.children[1].children[0];
	var next = container.children[1].children[1];
	var transformSize = 0;

	switch (options.transitionType) {
		case "slide":
			if (navigation == 1) {
				prev.onclick = function() {
					if (transformSize != 0) {
						transformSize -= containerWidth;
						stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
					}
				}
				next.onclick = function() {
					if (transformSize < (stageWidth - containerWidth)) {
						transformSize += containerWidth;
						stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
					}
				}

				document.onkeydown = arrowPress;

				function arrowPress(e) {
					if (e.keyCode == '37') {
						if (transformSize != 0) {
							transformSize -= containerWidth;
							stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
						}
					}
					if (e.keyCode == '39') {
						if (transformSize < (stageWidth - containerWidth)) {
							transformSize += containerWidth;
							stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
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
										if (transformSize < (stageWidth - containerWidth)) {
											transformSize += containerWidth;
											stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
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

		break;

		case "item":

			if (navigation == 1) {
				prev.onclick = function() {
					if (transformSize != 0) {
						transformSize -= memberWidth * transitionItemsNum;
						stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
						console.log(transformSize);
					}
				}
				next.onclick = function() {
					if (transformSize < (stageWidth - containerWidth)) {
						transformSize += memberWidth * transitionItemsNum;
						stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
						console.log(transformSize);
					}
				}

				document.onkeydown = arrowPress;

				function arrowPress(e) {
					if (e.keyCode == '37') {
						if (transformSize != 0) {
							transformSize -= memberWidth * transitionItemsNum;
							stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
						}
					}
					if (e.keyCode == '39') {
						if (transformSize < (stageWidth - containerWidth)) {
							transformSize += memberWidth * transitionItemsNum;
							stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
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
										if (transformSize < (stageWidth - containerWidth)) {
											transformSize += memberWidth * transitionItemsNum;
											stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
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

		break;
	}
}
	
document.addEventListener('DOMContentLoaded', function() {

    init("carousel1", {
    	type:"carousel",
    	items:4,
    	transition:{
    		transitionType:"item",
    		transitionItems:1,
    		auto:true,
    		autoInterval:1500
    	},
    	nav:{
    		show:true,
    		prev:"<i class='material-icons' id='nav-prev'>chevron_left</i>",
            next:"<i class='material-icons' id='nav-next'>chevron_right</i>"
    	}
    });

    init("carousel2", {
    	type:"carousel",
    	items:4,
    	transition:{
    		transitionType:"item",
    		transitionItems:1,
    		auto:true,
    		autoInterval:2000
    	},
    	nav:{
    		show:true,
    		prev:"<i class='material-icons' id='nav-prev'>chevron_left</i>",
            next:"<i class='material-icons' id='nav-next'>chevron_right</i>"
    	}
    });

}, false);