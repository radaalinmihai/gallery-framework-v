document.addEventListener('DOMContentLoaded', function() {

    function readdEvents () {
        var select = document.getElementById("auto_select");
        var interval = select.parentNode.parentNode.children[3];
        select.addEventListener("change", function() {
            if (select.value == "true") interval.className += " auto-interval-show";
            else interval.classList.remove("auto-interval-show");
        });
    
        var navSelect = document.getElementById("nav_select");
        var next = navSelect.parentNode.parentNode.children[1];
        var prev = navSelect.parentNode.parentNode.children[2];
        navSelect.addEventListener("change", function() {
            if (navSelect.value == "true") {
                next.className += " show";
                prev.className += " show";
            }
            else {
                next.classList.remove("show");
                prev.classList.remove("show");
            }
        });
    
        var fullSelect = document.getElementById("fullscreen_select");
        var open = fullSelect.parentNode.parentNode.children[1];
        var close = fullSelect.parentNode.parentNode.children[2];
        fullSelect.addEventListener("change", function() {
            if (fullSelect.value == "true") {
                open.className += " show";
                close.className += " show";
            }
            else {
                open.classList.remove("show");
                close.classList.remove("show");
            }
        });
    }

    readdEvents();

});