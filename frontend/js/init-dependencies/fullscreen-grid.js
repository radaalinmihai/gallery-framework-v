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
			this.parentNode.lastChild.childNodes[1].style.left = "-" + stageWidth * getIndex(ele) + "px";

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

}