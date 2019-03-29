// Retrieves index of grid member
function getIndex(ele) {

	var k = 0;

	while (ele.parentNode.children[k] != ele) k++;

	return k;

}

// How many items are between two elements
function howMany (a, b) {
	if (getIndex(a) > getIndex(b)) {
		var x = a;
		a = b;
		b = x;
	}
	var k = 0;

	while (b.previousElementSibling != a) {
		b = b.previousElementSibling;
		k++;
	}

	return k;
}

function adjustSize (container, params) {

	var members = container.children;

	// Generate and add the resize gutter (element that's dragged when resizing) to each grid member
	for (i = 0; i < members.length - 1; i++) {

		if ((i + 1) % params.itemsPerRow != 0 || (i + 1) == 1) {

			var gut = document.createElement("div");
			gut.classList.add("resize-gutter");
			members[i].appendChild(gut);

		}

	}


	var isResizing = false, lastDownX = 0,
		gutters = document.getElementsByClassName("resize-gutter"),
		handle, initWidthCont, initWidthNext;


	// Add event listeners to each gutter to change isResizing value to true
	for (i = 0; i < gutters.length; i++) {

		gutters[i].addEventListener("mousedown", function(e) {

			isResizing = true;
			lastDownX = e.clientX;
			handle = this;
			initWidthCont = parseFloat(this.parentNode.style.width);
			initWidthNext = parseFloat(this.parentNode.nextElementSibling.style.width);

		});

	}

	// Listen to mouse moving for when resizing an element
	document.addEventListener("mousemove", function(e) {

		// If it isn't resizing, don't do anything
		if (!isResizing) return;

		// Distance traveled
		var distance = e.clientX - lastDownX;

		// Convert distance to percentage of row width
		var perco = Math.abs(distance * 100 / handle.parentNode.parentNode.offsetWidth);

		// Figure out the direction and resize accordingly
		if (e.clientX < lastDownX && parseFloat(handle.parentNode.style.width) >= 6) {
			handle.parentNode.style.width = initWidthCont - perco + "%";
			handle.parentNode.nextElementSibling.style.width = initWidthNext + perco + "%";
		}
		else if (e.clientX > lastDownX && parseFloat(handle.parentNode.nextElementSibling.style.width) >= 6) {
			handle.parentNode.style.width = initWidthCont + perco + "%";
			handle.parentNode.nextElementSibling.style.width = initWidthNext - perco + "%";
		}

	});

	// Change value to false on mouse up to stop resizing
	document.addEventListener("mouseup", function() {
		isResizing = false;
	});
}