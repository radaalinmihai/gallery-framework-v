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