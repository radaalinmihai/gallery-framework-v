function init (containerID, params) {
	switch (params.type) { // check which format is requested
		case "carousel":
			var container = document.getElementById(containerID); // get container
			container.className += " carousel-container"; 
			var stage = container.firstElementChild; // get stage
			var members = document.getElementsByClassName("member"); // get list of elements
			stage.className += " car-stage";
			var containerWidth = container.offsetWidth; // width of container at time of init
			var i;

			if (params.hasOwnProperty("items")) {
				if (params.items != null) {
					var itemsPerSlide = params.items;
				}
			}
			else var itemsPerSlide = 3; // carousel defaults to 3 items per slide

			var memberWidth = containerWidth / itemsPerSlide;
			for (i = 0; i < members.length; i++) {
				members[i].style.width = memberWidth.toString() + "px";
			}
			var stageWidth = containerWidth * (members.length / itemsPerSlide);
			stage.style.width = stageWidth.toString() + "px";

			if (params.hasOwnProperty("transition")) {
				if (params.transition != null) {
					animateTransition(params.transition, stage, stageWidth, containerWidth, memberWidth, container);
				}
				else animateTransition("slide", stage, stageWidth, containerWidth, memberWidth, container); // defaults to slide
			}
	}
}

function error (missingPar) {
	console.log("You have to add the property for " + missingPar + " in order for it to work.");
}

function animateTransition(options, stage, stageWidth, containerWidth, memberWidth, container) {
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
	var prev = document.getElementById("nav-prev");
	var next = document.getElementById("nav-next");
	var transformSize = 0;

	switch (options.transitionType) {
		case "slide":

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

			if (options.hasOwnProperty("auto")) {
				if (options.auto != null) {
					if (options.auto == "true") {
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

			prev.onclick = function() {
				if (transformSize != 0) {
					transformSize -= memberWidth * transitionItemsNum;
					stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
				}
			}
			next.onclick = function() {
				if (transformSize < (stageWidth - containerWidth)) {
					transformSize += memberWidth * transitionItemsNum;
					stage.style.transform = "translateX(-" + transformSize.toString() + "px)";
				}
			}

			if (options.hasOwnProperty("auto")) {
				if (options.auto != null) {
					if (options.auto == "true") {
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
    	items:4, 
    	type:"carousel", 
    	transition:{
    		transitionType:"item", 
    		auto:"true", 
    		autoInterval:1500, 
    		transitionItemsNum: 1
    	}
    });
}, false);