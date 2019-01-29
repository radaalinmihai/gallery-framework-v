/* Dragging event -- work in progress*/
	
var selected = null, // Object of the element to be moved
   x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
   x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
}

// Will be called when user dragging an element
function _move_elem(e) {
	console.log("shitsmOving")
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    console.log("ping");
    if (selected !== null) {
    	console.log(transformSize);
    	if (transformSize < (stageWidth - containerWidth)) {
    		console.log("dong");
        	selected.style.left = "-" + ((x_pos - x_elem) * -1) + 'px';
        	transformSize = (x_pos - x_elem) * -1;
    	}
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
    console.log(transformSize);
    stage.style.transition = "all 0.2s ease-in-out";
    if (transformSize < (stageWidth - containerWidth)) {
    	transformSize = roundUp(transformSize, memberWidth);
    	stage.style.left = "-" + transformSize.toString() + "px";
	}
}

// Bind the functions...
stage.onmousedown = function () {
    _drag_init(this);
    stage.style.transition = "none";
    return false;
}

stage.ontouchstart = function () {
	console.log("shits touched");
    _drag_init(this);
    stage.style.transition = "none";
    return false;
};

stage.onmousemove = _move_elem;
stage.onmouseup = _destroy;
stage.ontouchmove = _move_elem;
stage.ontouchend = _destroy;