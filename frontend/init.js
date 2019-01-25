function init (containerID, params) {
	switch (params.type) { // check which format is asked
		case "carousel":
			var members = document.getElementsByClassName("member"); // get list of elements
			var container = document.getElementById(containerID); // get container
			container.className += " carousel-container"; 
			var stage = container.firstElementChild; // get stage
			stage.className += " car-stage";
			var containerWidth = container.offsetWidth; // width of container at time of init
			var i;

			if (params.hasOwnProperty("items")) {
				if (params.items != null) {
				}
			}

			var memberWidth = containerWidth / params.items;
			for (i = 0; i < members.length; i++) {
				members[i].style.width = memberWidth.toString() + "px";
			}
			var stageWidth = containerWidth * (members.length / params.items);
			stage.style.width = stageWidth.toString() + "px";

			if ()
			function slideAnim() { // move an entire slide at once
				stage.style.transform = "translateX(0px)";
				var prev = document.getElementById("nav-prev");
				var next = document.getElementById("nav-next");
				var transformSize = 0;

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
			}

			slideAnim();

			break;
	}
}
	
document.addEventListener('DOMContentLoaded', function() {
    init("carousel1", {items:3, type:"carousel"});
}, false);