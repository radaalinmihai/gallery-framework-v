function portofolio (containerID, settings) {
	var container = document.getElementById(containerID); // get container

	// Sort responsive settings from highest to lowest so that they're applied accordingly
	var params = {}, mediaQueries = [], k = 0, j, tokenGenerated, materials;

	if (settings.hasOwnProperty("token") && settings.token != null) {
            ajax("http://localhost:3000/return_album", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    token: settings.token
                })
            })
                .then(function(response) {
                    tokenGenerated = 1;
                    params = response.data;
                    materials = response.data.images;
                    executeSwitch();
                })
                .catch(function(error) {
                    if(error) {
                        console.log(error);
                    }
        });
	}
	else {
        if (settings.hasOwnProperty("responsive")) {
            params = sortQueries(settings);
        }
        else params = settings;

        executeSwitch();
	}

    window.onresize = function(event) {
        if (settings.type == "carousel" || settings.type == "grid") {
            if (settings.type == "carousel") {

                if (settings.hasOwnProperty("fullscreen") && settings.fullscreen.show == true) {
                    container.removeChild(container.children[0]);
                }

                if (settings.hasOwnProperty("nav") && settings.nav.show == true) {
                    container.removeChild(container.children[1]);
                    container.removeChild(container.children[1]);
                }

            }

            portofolio(containerID, settings);
        }
    };

	function executeSwitch() {

        switch (params.type) { // check which format is requested
            case "carousel":

                if (tokenGenerated) {

                    var div = document.createElement("div");

                    for (var i = 0; i < materials.length; i++) {
                        var kidDiv = document.createElement("div");
                        var img = document.createElement("img");

                        kidDiv.setAttribute("class", "member");
                        img.setAttribute("src", materials[i]);

                        kidDiv.appendChild(img);
                        div.appendChild(kidDiv);
                    }

                    container.appendChild(div);

                }

                var stage = container.firstElementChild, // get stage (second container)
                    members = stage.children, // get list of elements
                    containerWidth = 100, // width of container at time of init (for assigning appropriate responsive widths to elements)
                    i, itemsPerSlide;

                if (params.transition == null) {
                    params.transition = {
                        loop : true,
                        gestures : true,
                        auto : false
                    }
                }


                // Give appropriate classes to both containers
                stage.classList.add("car-stage");
                container.classList.add("carousel-container");

                // Checking how many items per slide and assigning appropriate individual widths
                if (params.hasOwnProperty("items") && params.items != null) {
                    itemsPerSlide = params.items;
                }
                else itemsPerSlide = 3; // defaults to 3 items per slide

                var memberWidth = containerWidth / itemsPerSlide;
                for (i = 0; i < members.length; i++) {
                    members[i].style.width = memberWidth.toString() + "%";
                    if (params.transition.gestures) {
                        members[i].classList.add("no-drag");
                    }
                }

                // Clone items for loop
                if (params.transition.loop && members[0].classList.contains("clone") == false) {
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
                stage.style.width = stageWidth.toString() + "%";


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
                var members = container.children, genHeight;

                if (params.hasOwnProperty("itemsPerRow")) {
                    if (params.itemsPerRow != null) {
                        var perc = 100 / params.itemsPerRow;
                    }
                }
                else var perc = 25; // grid defaults to 4 items per row

                for (var i = 0; i < members.length; i++) {
                    if (i == 0 || (i + 1) % params.itemsPerRow == 1) {
                        genHeight = window.getComputedStyle(members[i].children[0]).getPropertyValue("height");
                    }
                    members[i].style.width = perc.toString() + "%";
                    members[i].classList.add("vid-grid-member");
                }

                if (params.hasOwnProperty("fullscreen") && params.fullscreen == true) fullscreenGrid(container, params);
                if (params.hasOwnProperty("swap") && params.swap == true) dragNDrop(container, params);
                if (params.hasOwnProperty("resize") && params.resize == true) adjustSize(container, params);

                break;

            case "list":
                container.classList.add("list-container");

                break;

            case "audio":

                var audioHTML = "<div class='audio_wrapper'><p class='song_name'></p><div class='player'><button class='play_button'><i class='material-icons'>play_circle_outline</i></button><button class='resume_button'><i class='material-icons'>pause_circle_outline</i></button><button class='previous_song'><i class='material-icons'>skip_previous</i></button><button class='next_song'><i class='material-icons'>skip_next</i></button><div class='progress'><div class='current_progress'></div></div><div class='volume_controls'><input class='volume' type='range' min='0' max='1' step='any'><button class='volume_button'><i class='material-icons'>volume_up</i></button></div></div></div>";
                let doc = new DOMParser().parseFromString(audioHTML, 'text/html');
                container.appendChild(doc.body.firstChild);
                audioPlayer(params.songs);

        }

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
		stage.style.left = "-" + containerWidth + "%";
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

	if (options.hasOwnProperty("auto") && options.auto != null) {
		if (options.auto) {
			if (options.hasOwnProperty("autoInterval") == false || options.autoInterval == null) {
				options.autoInterval = 1500; // Interval defaults to 1.5 seconds
			}
			setInterval(function() {
				if (mouseover == 1) {
					moveUp(transitionTypePar, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
				}
			}, options.autoInterval);
		}
	}

	if (gestures) {
		addDrag(stage, stageWidth, containerWidth, memberWidth, options.loop);
		addSwipe("item", stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop);
	}
}