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