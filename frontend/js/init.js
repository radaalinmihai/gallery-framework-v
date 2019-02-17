function portofolio (containerID, settings) {
	var container = document.getElementById(containerID); // get container

	// Sort responsive settings from highest to lowest so that they're applied accordingly
	var params = {}, mediaQueries = [], k = 0, j, aux;

	if (settings.hasOwnProperty("responsive")) {
		params = sortQueries(settings);
	}
	else params = settings;

	switch (params.type) { // check which format is requested
		case "carousel":

			var stage = container.firstElementChild, // get stage (second container)
						members = stage.children, // get list of elements
						containerWidth = container.offsetWidth, // width of container at time of init (for assigning appropriate responsive widths to elements)
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
				if (params.transition.gestures) {
					members[i].classList.add("no-drag");
				}
			}

			// Clone items for loop
			if (settings.transition.loop) {
				var k = 0;
				for (i = 0; i < itemsPerSlide; i++) {
					var frontClone = members[k].cloneNode([true]);
					var backClone = members[members.length - k - 1].cloneNode([true]);
					frontClone.classList.add("clone");
					backClone.classList.add("clone");
					k += 2;
					
					stage.appendChild(frontClone);

					stage.insertBefore(backClone, members[0]);
				}
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
					animateTransition(params.transition, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID, params.transition.gestures);
				}
			}


			// Creating fullscreen buttons and allowing fullscreen functionality
			if (params.hasOwnProperty("fullscreen")) {
				if (params.fullscreen.show == true) fullscreen(params.fullscreen, container, stage);
			}

			// Calling speech to text function
			if (params.hasOwnProperty("speech") && params.speech == true) {
				if (params.hasOwnProperty("lang")) {
					var lang = params.lang;
				}
				else {
					var lang = {
						next:"Next",
						prev:"Back",
						code:"en-US"
					}
				}

				if (params.transition.hasOwnProperty("transitionType")) {
					var transitionTypePar = params.transition.transitionType;
				}
				else var transitionTypePar = "slide";

				if (params.transition.hasOwnProperty("transitionItems")) {
					if (params.transition.transitionItems != null) {
						var transitionItemsNum = params.transition.transitionItems;
					}
				}
				else var transitionItemsNum = 1; // carousel defaults to 1 item per transition

				speechRec(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, params.transition.loop, lang);
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

			var carContainer = document.createElement("div");
			var stage = document.createElement("div");

			carContainer.setAttribute("id", "photo-carousel-1");
			carContainer.classList.add("full-car");
			// carContainer.style.display = "none";
			carContainer.style.visibility = "hidden";
			carContainer.style.zIndex = "10000000";
			carContainer.appendChild(stage);

			for (i = 0; i < members.length; i++) {
				var member = document.createElement("div");
				var img = document.createElement("img");
				img.setAttribute("src", members[i].children[0].getAttribute("src"));
				member.appendChild(img);
				member.classList.add("member");
				member.classList.add("img-member");
				stage.appendChild(member);
			}

			container.appendChild(carContainer);

			portofolio("photo-carousel-1", {
				type:"carousel",
				items:1,
				transition:{
					transitionType:"slide"
				},
				nav : {
					show: true,
					prev: "<i class='material-icons'>chevron_left</i>",
				 	next: "<i class='material-icons'>chevron_right</i>"
				}
			});

			var stageWidth = carContainer.offsetWidth;

			var i = document.createElement("i");
			var closeDiv = document.createElement("div");
			
			i.setAttribute("class", "material-icons");
			i.innerText = "close";
			closeDiv.setAttribute("class", "close-fullscreen-grid");

			closeDiv.appendChild(i);

			carContainer.insertBefore(closeDiv, carContainer.childNodes[0]);

			closeDiv.addEventListener("click", function() {
				this.parentNode.style.display = "none";
			});

			function getIndex(ele) {
				var k = 0;

				while (ele.parentNode.children[k] != ele) k++;

				return k;
			}

			function addEvent(ele) {
				ele.onclick = function () {
					this.parentNode.lastChild.childNodes[1].style.left = "-" + stageWidth * getIndex(ele) + "px";
					this.parentNode.lastChild.style.visibility = "visible";
					this.parentNode.lastChild.style.display = "flex";
				}
			}

			for (var i = 0; i < members.length - 1; i++) {
				addEvent(members[i]);
			}

		break;

		case "list":
			container.classList.add("list-container");

		break;

		case "audio":

			var audioHTML = "<div class='audio_wrapper'><p class='song_name'></p><div class='player'><button class='play_button'><i class='material-icons'>play_circle_outline</i></button><button class='resume_button'><i class='material-icons'>pause_circle_outline</i></button><button class='previous_song'><i class='material-icons'>skip_previous</i></button><button class='next_song'><i class='material-icons'>skip_next</i></button><div class='progress'><div class='current_progress'></div></div><div class='volume_controls'><input class='volume' type='range' min='0' max='1' step='any'><button class='volume_button'><i class='material-icons'>volume_up</i></button></div></div></div>";
			let doc = new DOMParser().parseFromString(audioHTML, 'text/html');
			container.appendChild(doc.body.firstChild);
			audioPlayer(['apologize.mp3', 'ceva.mp3']);

	}
}

function animateTransition(options, stage, stageWidth, containerWidth, memberWidth, container, navigation, containerID, gestures) {
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

	if (options.loop == true) {
		stage.style.left = "-" + containerWidth + "px";
	}
	else {
		stage.style.left = "0px";
		// stage.nextSibling.nextSibling.children[0].style.visibility = "hidden";
	}
	

	if (options.hasOwnProperty("transitionType")) {
		var transitionTypePar = options.transitionType;
	}
	else var transitionTypePar = "slide";

	if (navigation) {
		var prev = container.children[1];
		var next = container.children[2];

		prev.onclick = function() {
			moveDown(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
		}
		next.onclick = function() {
			moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
		}
		document.onkeydown = arrowPress;
		function arrowPress(e) {
			if (e.keyCode == '37') {
				moveDown(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
			}
			if (e.keyCode == '39') {
				moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
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
								moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
							}
						}, options.autoInterval);
					}
				}
				else error("autoInterval");
			}
		}
	}

	if (gestures) {
		addDrag(stage, stageWidth, containerWidth, memberWidth, options.loop);
		addSwipe("item", stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
	}
}