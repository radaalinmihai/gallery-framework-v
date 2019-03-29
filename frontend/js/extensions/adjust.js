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

function dragNDrop (container, params) {

	var members = container.children,
		selected = null, // Object of the element to be moved
	    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
	    x_elem = 0, y_elem = 0, // Stores top, left values (edge) of the element
	    destNext, initNext, placeholder, correctOne, pastOne = -1;

	// Find the element that's being hovered and that's going to be moved 
	function findCorrectOne() {

		pastOne = -1;

		for (i = 0; i < members.length; i++) {

			if (members[i] != selected) {

				x_dest = members[i].offsetLeft;
	    		y_dest = members[i].offsetTop;
	    		x_pos = selected.offsetLeft;
	    		y_pos = selected.offsetTop;

	    		// Loop through elements and compare x-axis and y-axis to find the one that's closest in position
	    		if (pastOne == -1) {
	    			pastOne = Math.abs(x_pos - x_dest) + Math.abs(y_pos - y_dest);
	    			if (correctOne != null) correctOne.style.border = "none";
	    			correctOne = members[i];
	    			correctOne.style.border = "2px solid black";
	    			destNext = members[i].nextElementSibling;
	    		}
	    		else if (Math.abs(x_pos - x_dest) + Math.abs(y_pos - y_dest) < pastOne) {
	    			pastOne = Math.abs(x_pos - x_dest) + Math.abs(y_pos - y_dest);
	    			correctOne.style.border = "none";
	    			correctOne = members[i];
	    			correctOne.style.border = "2px solid black";
	    			destNext = members[i].nextElementSibling;
	    		}

			}

		}
		
	}
	
	// Will be called when user starts dragging an element
	function _drag_init(elem) {
	    // Store the object of the element which needs to be moved
	    selected = elem;
	    x_elem = x_pos - selected.offsetLeft;
	    y_elem = y_pos - selected.offsetTop;
	}
	
	// Will be called when user dragging an element
	function _move_elem(e) {
	    x_pos = document.all ? window.event.clientX : e.pageX;
	    y_pos = document.all ? window.event.clientY : e.pageY;
	    if (selected !== null) {
	        selected.style.left = (x_pos - x_elem) + 'px';
	        selected.style.top = (y_pos - y_elem) + 'px';

	        // Look for the correct element while selected one is being moved around
	        findCorrectOne();
	    }
	}
	
	// Destroy the object when we are done
	function _destroy() {

		// Call function one last time to check for correct element
		findCorrectOne();

		// Check if selected element is dropped at same position 
		if (correctOne != placeholder) {

			container.removeChild(placeholder);
			container.insertBefore(correctOne, initNext);
			selected.classList.remove("transitioning");
			container.insertBefore(selected, destNext);
			correctOne.style.border = "none";

			// Calculate differences between sizes to adjust the the other elements on the rows
			var destPerc = parseFloat(correctOne.style.width);
			var origPerc = parseFloat(selected.style.width);
			var diff = Math.abs(origPerc - destPerc);

			console.log(howMany(correctOne, selected));

			if (howMany(correctOne, selected) <= params.itemsPerRow - 2) {
				var x = correctOne.style.width;
				correctOne.style.width = selected.style.width;
				selected.style.width = x;
			}
			else if (destPerc < origPerc) {
				if (correctOne.previousElementSibling == null || (getIndex(correctOne.previousElementSibling) + 1) % params.itemsPerRow == 0) {
					correctOne.nextElementSibling.style.width = (parseFloat(correctOne.nextElementSibling.style.width) + diff) + "%";
				}
				else if (getIndex(correctOne.nextElementSibling) % params.itemsPerRow == 0 || correctOne.nextElementSibling == null) {
					correctOne.previousElementSibling.style.width = (parseFloat(correctOne.previousElementSibling.style.width) + diff) + "%";
				}
				else {
					correctOne.nextElementSibling.style.width = (parseFloat(correctOne.nextElementSibling.style.width) + diff / 2) + "%";
					correctOne.previousElementSibling.style.width = (parseFloat(correctOne.previousElementSibling.style.width) + diff / 2) + "%";
				}
				if (getIndex(selected.nextElementSibling) % params.itemsPerRow == 0 || selected.nextElementSibling == null) {
					selected.previousElementSibling.style.width = (parseFloat(selected.previousElementSibling.style.width) - diff) + "%";
				}
				else if (selected.previousElementSibling == null || (getIndex(selected.previousElementSibling) + 1) % params.itemsPerRow == 0) {
					selected.nextElementSibling.style.width = (parseFloat(selected.nextElementSibling.style.width) - diff) + "%";
				}
				else {
					selected.nextElementSibling.style.width = (parseFloat(selected.nextElementSibling.style.width) - diff / 2) + "%";
					selected.previousElementSibling.style.width = (parseFloat(selected.previousElementSibling.style.width) - diff / 2) + "%";
				}
			}
			else {
				if (correctOne.previousElementSibling == null || (getIndex(correctOne.previousElementSibling) + 1) % params.itemsPerRow == 0) {
					correctOne.nextElementSibling.style.width = (parseFloat(correctOne.nextElementSibling.style.width) - diff) + "%";
				}
				else if (correctOne.nextElementSibling == null || getIndex(correctOne.nextElementSibling) % params.itemsPerRow == 0) {
					correctOne.previousElementSibling.style.width = (parseFloat(correctOne.previousElementSibling.style.width) - diff) + "%";
				}
				else {
					correctOne.nextElementSibling.style.width = (parseFloat(correctOne.nextElementSibling.style.width) - diff / 2) + "%";
					correctOne.previousElementSibling.style.width = (parseFloat(correctOne.previousElementSibling.style.width) - diff / 2) + "%";
				}
				if (selected.nextElementSibling == null || getIndex(selected.nextElementSibling) % params.itemsPerRow == 0) {
					selected.previousElementSibling.style.width = (parseFloat(selected.previousElementSibling.style.width) + diff) + "%";
				}
				else if (selected.previousElementSibling == null || (getIndex(selected.previousElementSibling) + 1) % params.itemsPerRow == 0) {
					selected.nextElementSibling.style.width = (parseFloat(selected.nextElementSibling.style.width) + diff) + "%";
				}
				else {
					selected.nextElementSibling.style.width = (parseFloat(selected.nextElementSibling.style.width) + diff / 2) + "%";
					selected.previousElementSibling.style.width = (parseFloat(selected.previousElementSibling.style.width) + diff / 2) + "%";
				}
			}


			// Remove or add resize gutters

			if (selected.lastChild.classList != null) {

				var origin = selected.lastChild.classList.contains("resize-gutter");

			}
			else var origin = false;
			
			if (correctOne.lastChild.classList != null) {

				var destination = correctOne.lastChild.classList.contains("resize-gutter");

			}
			else var destination = false;

			if (origin == 0 && destination == 1) {

				selected.insertBefore(correctOne.lastChild, null);

			}
			else if (origin == 1 && destination == 0) {

				correctOne.insertBefore(selected.lastChild, null);
				
			}

		}
		else {

			container.removeChild(placeholder);
			selected.classList.remove("transitioning");
			correctOne.style.border = "none";

		}

		selected.style.top = "initial";
		selected.style.left = "initial";
		selected = null;

	}

	for (i = 0; i < members.length; i++) {

		// Bind the functions...
		members[i].addEventListener("mousedown", function(e) {
            // Check if element clicked is not resize gutter
            e = e || window.event;
            var target = e.target || e.srcElement;

            if (target.classList.contains("resize-gutter") == false) {

                // Call dragging function
                _drag_init(this);

                this.classList.add("transitioning");

                placeholder = document.createElement("div");
                placeholder.style.width = this.style.width;

                container.insertBefore(placeholder, this.nextElementSibling);

                selected.style.left = (x_pos - x_elem) + 'px';
                selected.style.top = (y_pos - y_elem) + 'px';

                initNext = placeholder.nextElementSibling;

                return false;
            }
		});

	}
	
	document.onmousemove = _move_elem;
	document.onmouseup = _destroy;

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