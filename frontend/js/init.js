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

            case "audio":

                var audioHTML = "<div class='audio_wrapper'><p class='song_name'></p><div class='player'><button class='play_button'><i class='material-icons'>play_circle_outline</i></button><button class='resume_button'><i class='material-icons'>pause_circle_outline</i></button><button class='previous_song'><i class='material-icons'>skip_previous</i></button><button class='next_song'><i class='material-icons'>skip_next</i></button><div class='progress'><div class='current_progress'></div></div><div class='volume_controls'><input class='volume' type='range' min='0' max='1' step='any'><button class='volume_button'><i class='material-icons'>volume_up</i></button></div></div></div>";
                let doc = new DOMParser().parseFromString(audioHTML, 'text/html');
                container.appendChild(doc.body.firstChild);
                audioPlayer(params.songs);

        }

	}
}

// Main function is over here

// Functionality functions start here

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
		addSwipe("item", stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, options.loop, transitionTypePar);
	}
}

function audioPlayer (songs) {
    var audio_source = document.createElement('audio'),
        play_button = document.getElementsByClassName('play_button')[0],
        resume_button = document.getElementsByClassName('resume_button')[0],
        current_progress = document.getElementsByClassName('current_progress')[0],
        progress = document.getElementsByClassName('progress')[0],
        player = document.getElementsByClassName('player')[0],
        volume = document.getElementsByClassName('volume')[0],
        next_song = document.getElementsByClassName('next_song')[0],
        prev_song = document.getElementsByClassName('previous_song')[0],
        volume_button = document.getElementsByClassName('volume_button')[0],
        song_name_div = document.getElementsByClassName('song_name')[0],
        index_songs = 0;

    if(navigator.userAgent.indexOf('Edge') >= 0)
        progress.style.borderRadius = 0;

    var audio_playlist = songs;
    audio_source.src = audio_playlist[index_songs];
    audio_source.load();
    song_name_div.innerHTML = '<strong>Current song: </strong>' + audio_playlist[index_songs];

    progress.style.height = player.offsetHeight + 'px';
    volume.value = audio_source.volume;

    play_button.onclick = function () {
        audio_source.play();
    };

    resume_button.onclick = function () {
        audio_source.pause();
    };

    volume.oninput = function () {
        audio_source.volume = volume.value;
    };

    volume_button.onclick = function () {
        audio_source.muted = !audio_source.muted;
    };

    /* DRAGGING PROGRESS BAR */

    var selected = null, // Object of the element to be moved
        x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
        x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

    // Will be called when user starts dragging an element
    function _drag_init(elem) {
        // Store the object of the element which needs to be moved
        selected = elem;
    }

    // Will be called when user dragging an element
    function _move_elem(e) {
        x_pos = document.all ? window.event.clientX : e.pageX;
        if (selected !== null) {
            var x = e.offsetX / selected.offsetWidth;
            audio_source.currentTime = Math.abs(audio_source.duration * x);
        }
    }

    // Destroy the object when we are done
    function _destroy() {
        selected = null;
    }

    progress.onmousemove = _move_elem;
    progress.onmouseup = _destroy;

    progress.onclick = function (e) {
        var x = e.offsetX / this.offsetWidth;
        audio_source.currentTime = Math.abs(audio_source.duration * x);
        console.log(Math.abs(audio_source.duration * x));
    };

    progress.onmousedown = function(e) {
        _drag_init(this);
        var x = e.offsetX / selected.offsetWidth;
        audio_source.currentTime = Math.abs(audio_source.duration * x);
    }

    /* END OF DRAGGING */

    audio_source.addEventListener('timeupdate', function () {
        var currentTime = this.currentTime,
            duration = this.duration;

        current_progress.style.width = Math.abs((100 / duration) * currentTime) + "%";
    });

    audio_source.addEventListener('pause', function () {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
    });

    audio_source.addEventListener('volumechange', function () {
        volume.value = this.volume;
        if (this.volume == 0 || audio_source.muted == true) {
            volume_button.querySelector('i').innerText = 'volume_off';
            volume.value = 0;
        } else {
            volume_button.querySelector('i').innerText = 'volume_up';
        }
    });

    audio_source.addEventListener('play', function () {
        resume_button.style.display = 'inline-block';
        play_button.style.display = 'none';
    });

    audio_source.addEventListener('ended', function () {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
        skip(true, false);
    });

    next_song.addEventListener('click', function() {
        skip(true, false);
    });

    prev_song.addEventListener('click', function() {
        skip(false, true);
    });

    function skip(next, prev) {
        if(next) {
            if(index_songs < audio_playlist.length - 1)
                index_songs++;
            else
                index_songs = 0;
        } else if(prev) {
            if(index_songs > 0)
                index_songs--;
            else
                index_songs = audio_playlist.length - 1;
        }
        changeSource(audio_playlist[index_songs]);
        song_name_div.innerHTML = '<strong>Current song: </strong>' + audio_playlist[index_songs];
    }

    function resetAudio() {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
        if(audio_source.currentTime > 0)
            audio_source.currentTime = 0;
    }

    function changeSource(src) {
        resetAudio();
        audio_source.src = src;
        audio_source.load();
        audio_source.play();
    }
}

function roundUp (numToRound, multiple) {
    return multiple * Math.round(numToRound/multiple);
}

function addSwipe (type, el, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop, transitionTypePar) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 100, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 400, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for swipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe me
                console.log("SWIPE");
                console.log(distX < 0);
                if (distX > 0) {
                    moveDown(transitionTypePar, el, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
                }
                else {
                    moveUp(transitionTypePar, el, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
                }
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        e.preventDefault();
    }, false)

}

function addDrag (el, stageWidth, containerWidth, memberWidth, loop) {

    var selected = null, // Object of the element to be moved
        x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
        x_elem = 0, y_elem = 0, initial, initialLeft, moved = 0; // Stores top, left values (edge) of the element

    // Will be called when user starts dragging an element
    function _drag_init(elem) {
        // Store the object of the element which needs to be moved
        selected = elem;
        initialLeft = parseFloat(el.style.left) * -1;
        x_elem = x_pos - selected.offsetLeft;
    }

    // Will be called when user dragging an element
    function _move_elem(e) {
        x_pos = document.all ? window.event.clientX : e.pageX;
        if (selected !== null) {
            moved = 1;
            if (loop) {
                if (x_pos < initial && parseFloat(el.style.left) * -1 < (stageWidth - containerWidth * 2)) {
                    var calc = Math.abs(initial - x_pos) * 100 / el.parentNode.offsetWidth;
                    el.style.left = "-" + ((initialLeft + calc)) + "%";
                }
                else if (x_pos > initial && parseFloat(el.style.left) * -1 > containerWidth) {
                    var calc = Math.abs(initial - x_pos) * 100 / el.parentNode.offsetWidth;
                    el.style.left = "-" + ((initialLeft - calc)) + "%";
                }
            }
            else if (x_pos < initial && parseFloat(el.style.left) * -1 < (stageWidth - containerWidth)) {
                var calc = Math.abs(initial - x_pos) * 100 / el.parentNode.offsetWidth;
                el.style.left = "-" + ((initialLeft + calc)) + "%";
            }
            else if (x_pos > initial) {
                var calc = Math.abs(initial - x_pos) * 100 / el.parentNode.offsetWidth;
                el.style.left = "-" + ((initialLeft - calc)) + "%";
            }
        }
    }

    // Destroy the object when we are done
    function slide_destroy() {
        selected = null;
        el.style.transition = "all 0.2s ease-in-out";
        el.style.cursor = "default";
        if (parseFloat(el.style.left) * -1 < (stageWidth - containerWidth) && moved == 1) {
            el.style.left = "-" + roundUp(parseFloat(el.style.left) * -1, memberWidth).toString() + "%";
        }
        moved = 0;
    }

    // Bind the functions...
    el.onmousedown = function (e) {
        _drag_init(this);
        el.style.transition = "none";
        initial = document.all ? window.event.clientX : e.pageX;
        el.style.cursor = "grab";
        return false;
    }

    el.onmousemove = _move_elem;
    el.onmouseup = slide_destroy;
    el.onmouseleave = slide_destroy;

}

function moveUp (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop) {

    switch (type) {
        case "slide":

            if (loop && parseFloat(stage.style.left) * -1 >= (stageWidth - containerWidth * 2)) {
                if (parseFloat(stage.style.left) * -1 >= (stageWidth - containerWidth * 2)) {
                    var newSize = stageWidth - containerWidth;
                    stage.style.left = "-" + newSize.toString() + "%";
                    setTimeout(function() {
                        stage.style.transition = "none";
                        stage.style.left = "-" + containerWidth + "%";
                    }, 210);
                    setTimeout(function() {
                        stage.style.transition = "all 0.2s ease-in-out";
                    }, 220);
                }
                else {
                    var newSize = parseFloat(stage.style.left) * -1 + containerWidth;
                    stage.style.left = "-" + newSize.toString() + "%";
                    setTimeout(function() {
                        stage.style.transition = "none";
                        stage.style.left = "-" + containerWidth + "%";
                    }, 210);
                    setTimeout(function() {
                        stage.style.transition = "all 0.2s ease-in-out";
                    }, 220);
                }
            }
            else if (parseFloat(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth)) {
                var newSize = parseFloat(stage.style.left) * -1 + (stageWidth - containerWidth - parseFloat(stage.style.left) * -1);
                stage.style.left = "-" + newSize.toString() + "%";
            }
            else if (parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth)) {
                var newSize = parseFloat(stage.style.left) * -1 + containerWidth;
                stage.style.left = "-" + newSize.toString() + "%";
            }

            // if (!loop) {
            // 	if (parseFloat(stage.style.left) * -1 >= stageWidth - containerWidth) {
            // 		stage.nextSibling.nextSibling.children[1].style.visibility = "hidden";
            // 		stage.nextSibling.nextSibling.children[1].children[0].style.visibility = "hidden";
            // 	}
            // 	else {
            // 		stage.nextSibling.nextSibling.children[0].style.visibility = "visible";
            // 		stage.nextSibling.nextSibling.children[0].children[0].style.visibility = "visible";
            // 	}
            // }

            break;

        case "item":

            if (loop && parseFloat(stage.style.left) * - 1 >= (stageWidth - containerWidth * 2)) {

                if (parseFloat(stage.style.left) * - 1 > (stageWidth - containerWidth * 2)) {
                    var available = stageWidth - containerWidth - parseFloat(stage.style.left) * -1 / memberWidth;
                    if (available < transitionItemsNum) {
                        var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * available);
                        stage.style.left = "-" + newSize.toString() + "%";
                        setTimeout(function() {
                            stage.style.transition = "none";
                            stage.style.left = "-" + containerWidth + "%";
                        }, 200);
                        setTimeout(function() {
                            stage.style.transition = "all 0.2s ease-in-out";
                        }, 220);
                    }
                    else {
                        var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
                        stage.style.left = "-" + newSize.toString() + "%";
                        setTimeout(function() {
                            stage.style.transition = "none";
                            if (parseFloat(stage.style.left) * -1 == stageWidth - containerWidth) {
                                stage.style.left = "-" + containerWidth + "%";
                            }
                            else {
                                var available = stageWidth - containerWidth - parseFloat(stage.style.left) * -1;
                                stage.style.left = "-" + (containerWidth - available) + "%";
                            }
                        }, 200);
                        setTimeout(function() {
                            stage.style.transition = "all 0.2s ease-in-out";
                        }, 220);
                    }
                }
                else {
                    var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
                    stage.style.left = "-" + newSize.toString() + "%";
                    setTimeout(function() {
                        stage.style.transition = "none";
                        stage.style.left = "-" + (containerWidth - memberWidth * (containerWidth / memberWidth - transitionItemsNum)) + "%";
                    }, 200);
                    setTimeout(function() {
                        stage.style.transition = "all 0.2s ease-in-out";
                    }, 220);
                }

            }
            else if (parseFloat(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
                var newSize = parseFloat(stage.style.left) * -1 + (stageWidth - containerWidth - parseFloat(stage.style.left) * -1);
                stage.style.left = "-" + newSize.toString() + "%";
            }
            else if (parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth - memberWidth * transitionItemsNum)) {
                var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
                stage.style.left = "-" + newSize.toString() + "%";
            }

        // if (!loop) {
        // 	if (parseFloat(stage.style.left) * -1 >= stageWidth - containerWidth) {
        // 		stage.nextSibling.nextSibling.children[1].style.visibility = "hidden";
        // 		stage.nextSibling.nextSibling.children[1].children[0].style.visibility = "hidden";
        // 	}
        // 	else {
        // 		stage.nextSibling.nextSibling.children[0].style.visibility = "visible";
        // 		stage.nextSibling.nextSibling.children[0].children[0].style.visibility = "visible";
        // 	}
        // }

    }

}

function moveDown (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop) {
    switch (type) {
        case "slide":

            if (loop && parseFloat(stage.style.left) * -1 <= containerWidth) {
                if (parseFloat(stage.style.left) * -1 < containerWidth) {
                    stage.style.left = "0px";
                    setTimeout(function() {
                        stage.style.transition = "none";
                        stage.style.left = "-" + (stageWidth - containerWidth * 2) + "%";
                    }, 210);
                    setTimeout(function() {
                        stage.style.transition = "all 0.2s ease-in-out";
                    }, 220);
                }
                else {
                    var newSize = parseFloat(stage.style.left) + containerWidth;
                    stage.style.left = newSize.toString() + "%";
                    setTimeout(function() {
                        stage.style.transition = "none";
                        stage.style.left = "-" + (stageWidth - containerWidth * 2) + "%";
                    }, 210);
                    setTimeout(function() {
                        stage.style.transition = "all 0.2s ease-in-out";
                    }, 220);
                }
            }
            else if (parseFloat(stage.style.left) * -1 > 0 && parseFloat(stage.style.left) * -1 < containerWidth) {
                stage.style.left = "0px";
            }
            else if (parseFloat(stage.style.left) != 0) {
                var newSize = parseFloat(stage.style.left) + containerWidth;
                stage.style.left = newSize.toString() + "%";
            }

            // if (!loop) {
            // 	if (parseFloat(stage.style.left) * -1 == 0) {
            // 		stage.nextSibling.nextSibling.children[0].style.visibility = "hidden";
            // 		stage.nextSibling.nextSibling.children[0].children[0].style.visibility = "hidden";
            // 	}
            // 	else {
            // 		stage.nextSibling.nextSibling.children[1].style.visibility = "visible";
            // 		stage.nextSibling.nextSibling.children[1].children[0].style.visibility = "visible";
            // 	}
            // }

            break;

        case "item":

            if (loop && parseInt(stage.style.left) * -1 <= containerWidth) {
                if (parseInt(stage.style.left) * -1 < containerWidth){
                    var available = Math.ceil((parseInt(stage.style.left) * -1) / memberWidth);
                    if (available < transitionItemsNum) {
                        var newSize = parseFloat(stage.style.left) + memberWidth * available;
                        stage.style.left = newSize.toString() + "%";
                        setTimeout(function() {
                            stage.style.transition = "none";
                            stage.style.left = "-" + (stageWidth - containerWidth * 2) + "%";
                        }, 200);
                        setTimeout(function() {
                            stage.style.transition = "all 0.2s ease-in-out";
                        }, 220);
                    }
                    else {
                        var newSize = parseFloat(stage.style.left) + memberWidth * transitionItemsNum;
                        stage.style.left = newSize.toString() + "%";
                        setTimeout(function() {
                            stage.style.transition = "none";
                            stage.style.left = "-" + (stageWidth - containerWidth * 2 - parseInt(stage.style.left)) + "%";
                        }, 200);
                        setTimeout(function() {
                            stage.style.transition = "all 0.2s ease-in-out";
                        }, 220);
                    }
                }
                else {
                    var newSize = parseFloat(stage.style.left) + memberWidth * transitionItemsNum;
                    stage.style.left = newSize.toString() + "%";
                    setTimeout(function() {
                        stage.style.transition = "none";
                        stage.style.left = "-" + (stageWidth - containerWidth - (memberWidth * transitionItemsNum)) + "%";
                    }, 200);
                    setTimeout(function() {
                        stage.style.transition = "all 0.2s ease-in-out";
                    }, 220);
                }
            }
            else if (parseFloat(stage.style.left) * -1 > 0 && parseFloat(stage.style.left) < memberWidth * transitionItemsNum && loop != true) {
                stage.style.left = "0px";
            }
            else if (parseInt(stage.style.left) != 0) {
                var newSize = parseFloat(stage.style.left) + memberWidth * transitionItemsNum;
                stage.style.left = newSize.toString() + "%";
            }

        // if (!loop) {
        // 	if (parseFloat(stage.style.left) * -1 == 0) {
        // 		stage.nextSibling.nextSibling.children[0].style.visibility = "hidden";
        // 		stage.nextSibling.nextSibling.children[0].children[0].style.visibility = "hidden";
        // 	}
        // 	else {
        // 		stage.nextSibling.nextSibling.children[1].style.visibility = "visible";
        // 		stage.nextSibling.nextSibling.children[0].children[0].style.visibility = "visible";
        // 	}
        // }

    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function speechRec (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop, lang) {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();
    if (lang.hasOwnProperty("code")) {
        recognition.lang = lang.code;
    }
    else {
        recognition.lang = "en-US";
    }

    recognition.interimResults = true;
    var transcript = "", stopped = 0, prevTranscript = "";

    recognition.addEventListener("result", e => {
        transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');

        if (stopped == 0) {
            if (transcript != prevTranscript) {
                if (transcript == lang.next.toLowerCase() || transcript == capitalize(lang.next)) {
                    moveUp(type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
                    stopped = 1;
                }
                else if (transcript == lang.prev.toLowerCase() || transcript == capitalize(lang.prev)) {
                    moveDown(type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
                    stopped = 1;
                }
            }
        }

        prevTranscript = transcript;
        console.log(transcript);
    });

    recognition.addEventListener("end", function() {
        stopped = 0;
        prevTranscript = "none";
        recognition.start();
    });

    recognition.start();
}

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

function nav (options, container) {

    if (options.hasOwnProperty("prev") == false || options.prev == null || options.hasOwnProperty("next") == false || options.next == null) {

        options.prev = "<i class='material-icons'>navigate_before</i>";
        options.next = "<i class='material-icons'>navigate_next</i>";
    }

    var cont = document.createElement("div");
    cont.classList.add("prev");
    var doc = new DOMParser().parseFromString(options.prev, 'text/html');
    cont.appendChild(doc.body.firstChild);
    container.appendChild(cont);

    var cont = document.createElement("div");
    cont.classList.add("next");
    var doc = new DOMParser().parseFromString(options.next, 'text/html');
    cont.appendChild(doc.body.firstChild);
    container.appendChild(cont);

}

function fullscreen (options, container, stage) {
    var butContainer = document.createElement("div");
    butContainer.classList.add("car-full-buttons");
    container.insertBefore(butContainer, stage);

    if (options.hasOwnProperty("open") == false || options.open == null || options.hasOwnProperty("close") == false || options.close == null) {
        options.open = "<i class='material-icons'>fullscreen</i>";
        options.close = "<i class='material-icons'>close</i>";
    }

    var doc = new DOMParser().parseFromString(options.open, 'text/html');
    butContainer.appendChild(doc.body.firstChild);

    var doc = new DOMParser().parseFromString(options.close, 'text/html');
    butContainer.appendChild(doc.body.firstChild);

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

function fullscreenGrid (container, params) {

    var members = container.children,
        carContainer = document.createElement("div"),
        stage = document.createElement("div"),
        slideIndex = 0;


    // Create the carousel container for fullscreen mode
    carContainer.setAttribute("id", "photo-carousel-1");
    carContainer.classList.add("full-car");
    carContainer.style.visibility = "hidden";
    carContainer.style.zIndex = "10000000";
    carContainer.appendChild(stage);


    // Check whether dealing with video or images
    if (params.format == "video") {

        for (i = 0; i < members.length; i++) {
            var member = document.createElement("div"),
                video = document.createElement("video"),
                source = document.createElement("source"),
                cover = document.createElement("div"),
                ico = document.createElement("i");

            // Create video element for within carousel, assign source files
            video.setAttribute("controls", "");
            source.setAttribute("src", members[i].children[0].children[0].getAttribute("src"));
            video.appendChild(source);
            member.appendChild(video);
            member.classList.add("vid-member");
            member.classList.add("member");

            // Add video element to carousel stage
            stage.appendChild(member);

            // Create and add a play button cover to display on grid elements
            ico.setAttribute("class", "material-icons");
            ico.innerText = "play_circle_outline";
            cover.setAttribute("class", "video-grid-cover");
            cover.appendChild(ico);
            members[i].appendChild(cover);
        }

    }
    else {

        for (i = 0; i < members.length; i++) {

            var member = document.createElement("div"),
                img = document.createElement("img");

            // Simply create an img element along with a div and append it to the carousel stage
            img.setAttribute("src", members[i].children[0].getAttribute("src"));
            member.appendChild(img);
            member.classList.add("member");
            member.classList.add("img-member");
            stage.appendChild(member);

        }

    }

    // Append entire carousel to end of grid container
    container.appendChild(carContainer);


    // Initialize carousel for fullscreen mode
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


    // Create and append close button for fullscreen
    var i = document.createElement("i"),
        closeDiv = document.createElement("div");

    i.setAttribute("class", "material-icons");
    i.innerText = "close";

    closeDiv.setAttribute("class", "close-fullscreen-grid");
    closeDiv.appendChild(i);

    carContainer.insertBefore(closeDiv, carContainer.childNodes[0]);

    closeDiv.addEventListener("click", function() {
        this.parentNode.style.display = "none";
    });


    // Retrieves index of grid member so we know which slide to open on click
    function getIndex(ele) {
        var k = 0;

        while (ele.parentNode.children[k] != ele) k++;

        return k;
    }

    // Open member of grid on click to corresponding fullscreen slide
    function addEvent(ele) {

        ele.onclick = function () {

            this.parentNode.lastChild.childNodes[1].style.transition = "none";
            this.parentNode.lastChild.childNodes[1].style.left = "-" + 100 * getIndex(ele) + "%";

            slideIndex = getIndex(ele) - 1;
            this.parentNode.lastChild.style.visibility = "visible";
            this.parentNode.lastChild.style.display = "flex";

            setTimeout(function() {
                ele.parentNode.lastChild.childNodes[1].style.transition = "all 0.2s ease";
            }, 100);

        }

    }

    // Append aforementioned functionality to each grid member
    for (var i = 0; i < members.length - 1; i++) {
        addEvent(members[i]);
    }


    // Ensure video pauses when user skips to next slide
    if (params.format == "video") {

        var next = carContainer.children[3];
        var prev = carContainer.children[2];

        next.addEventListener("click", function() {
            slideIndex++;
            carContainer.children[1].children[slideIndex].children[0].pause();
        });
        prev.addEventListener("click", function() {
            slideIndex--;
            carContainer.children[1].children[slideIndex + 2].children[0].pause();
        });

    }

    // Zoomable

    var selected = null, // Object of the element to be moved
        x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
        x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

    // Will be called when user starts dragging an element
    function _drag_init(elem) {
        // Store the object of the element which needs to be moved
        selected = elem;
        x_elem = x_pos - selected.offsetLeft;
        y_elem = y_pos - selected.offsetTop;
    }

    // Will be called when user dragging an element
    function _move_elem(e) {
        y_pos = document.all ? window.event.clientY : e.pageY;
        if (selected !== null) {
            selected.style.transform = "translateY(" + (y_pos - y_elem) + 'px) scale(3)';
        }
    }

    // Destroy the object when we are done
    function _destroy() {
        selected = null;
    }

    function zoomInit (ele) {
        ele.addEventListener("click", function() {
            if (this.classList.contains("zooming-img")) {
                this.classList.remove("zooming-img");
                this.style.transform = "none";
                _destroy();
            }
            else {
                this.classList.add("zooming-img");
                this.style.transform = "scale(3)";
                _drag_init(this);
            }
        });
        ele.onmousemove = _move_elem;
    }

    if (params.hasOwnProperty("format") && params.format == "image") {
        var carMembers = container.lastChild.children[1].children;

        for (i = 0; i < carMembers.length; i++) {
            zoomInit(carMembers[i].children[0]);
        }
    }

    var closeFull = container.lastChild.children[0];
    var nextBut = container.lastChild.children[3];
    var prevBut = container.lastChild.children[2];

    function removeZoom (ele) {
        ele.addEventListener("click", function() {
            selected.classList.remove("zooming-img");
            selected.style.transform = "none";
            _destroy();
        });
    }

    removeZoom(closeFull);
    removeZoom(nextBut);
    removeZoom(prevBut);

}