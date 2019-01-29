document.addEventListener('DOMContentLoaded', function() {
    var select = document.getElementById("auto_select");
    var interval = document.getElementById("auto-interval");
    select.addEventListener("change", function() {
        if (select.value == "true") interval.className += " auto-interval-show";
        else interval.classList.remove("auto-interval-show");
    });

    var navSelect = document.getElementById("nav_select");
    var next = document.getElementById("nav-next");
    var prev = document.getElementById("nav-prev");
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
    var next = document.getElementById("full-open");
    var prev = document.getElementById("full-close");
    fullSelect.addEventListener("change", function() {
        if (fullSelect.value == "true") {
            next.className += " show";
            prev.className += " show";
        }
        else {
            next.classList.remove("show");
            prev.classList.remove("show");
        }
    });
});