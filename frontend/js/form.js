document.addEventListener('DOMContentLoaded', function() {

    // Copy for responsive

    function createBreakpoint () {
        var div = document.createElement("div");
        var c = document.getElementById("itemsper").cloneNode([true]);
        var l = document.getElementById("itemspertrans").cloneNode([true]);
        var o = document.getElementById("autoselect").cloneNode([true]);
        var n = document.getElementById("navselect").cloneNode([true]);
        var e = document.getElementById("fullscreenselect").cloneNode([true]);
        c.childNodes[3].setAttribute('name', 'items_per_row');
        l.childNodes[3].setAttribute('name', 'items_per_trans');
        o.childNodes[3].setAttribute('name', 'auto_responsive');
        n.childNodes[3].setAttribute('name', 'nav_select');
        e.childNodes[3].setAttribute('name', 'fullscreen_responsive');
        div.appendChild(c);
        div.appendChild(l);
        div.appendChild(o);
        div.appendChild(n);
        div.appendChild(e);
        
        
        div.classList.add("hidden");

        return div;
    }

    document.getElementsByClassName("new-breakpoint")[0].appendChild(createBreakpoint());

    function openBreakpoint (ele) {
        ele.onclick = function() {
            var sets = ele.parentNode.nextSibling.nextSibling;
            if (sets.classList.contains("hidden")) {
                sets.style.display = "flex";
                sets.classList.remove("hidden");
            }
            else {
                sets.style.display = "none";
                sets.classList.add("hidden");
            }
        }
    }

    function keyStrokes (ele) {
        var created, removed = 0;
        ele.onkeyup = function() {
            console.log(ele.value.length);
            if (ele.value.length == 0) {
                if (removed == 0) {
                    ele.parentNode.parentNode.parentNode.lastChild.remove();
                    removed = 1;
                }
                created = 0;
            }
            else {
                if (created != 1) {
                    var clone = ele.parentNode.parentNode.cloneNode([true]);
                    clone.children[0].children[0].value = "";
                    ele.parentNode.parentNode.parentNode.appendChild(clone);
                    keyStrokes(clone.children[0].children[0]);
                    openBreakpoint(clone.children[0].children[1]);
                    created = 1;
                    removed = 0;
                }
            }
        }
    }

    keyStrokes(document.querySelector(".insert-breakpoint input"));

    openBreakpoint(document.querySelector(".insert-breakpoint i"));

    // Choose album type

    function hide (className) {
        var els = document.getElementsByClassName(className);

        for (var i = 0; i < els.length; i++) {
            els[i].style.display = "none";
        }
    }

    function show (className) {
        var els = document.getElementsByClassName(className);

        for (var i = 0; i < els.length; i++) {
            els[i].style.display = "flex";
        }
    }

    function hideMembers (type) {
        switch (type) {
            case "carousel":

                hide("grid-member");

                show("car-member");
                document.getElementById("responsive-settings").style.display = "flex";

            break;

            case "grid":

                hide("car-member");

                show("grid-member");
                document.getElementById("responsive-settings").style.display = "flex";

            break;

            case "audio":

                hide("car-member");
                hide("grid-member");
                document.getElementById("responsive-settings").style.display = "none";

            break;

            case "list":

                hide("car-member");
                hide("grid-member");
                document.getElementById("responsive-settings").style.display = "flex";

            break;
        }

        document.getElementsByClassName("nav-container")[0].style.display = "flex";
        var width = parseFloat(document.getElementsByClassName("car-stage")[0].children[0].style.width);
        document.getElementsByClassName("car-stage")[0].style.left = "-" + width + "px";
        while (document.getElementsByClassName("actives")[0].nextElementSibling.style.display == "none") {
            document.getElementsByClassName("actives")[0].nextElementSibling.classList.add("actives");
            document.getElementsByClassName("actives")[0].classList.remove("actives");
        }
        document.getElementsByClassName("actives")[0].nextElementSibling.classList.add("actives");
        document.getElementsByClassName("actives")[0].classList.remove("actives");
        document.querySelector(".nav-container .prev").children[0].style.display = "flex";
    }

    document.getElementById("carousel-opt").onclick = function () {
        hideMembers("carousel");
    }

    document.getElementById("grid-opt").onclick = function () {
        hideMembers("grid");
    }

    document.getElementById("list-opt").onclick = function () {
        hideMembers("list");
    }

    document.getElementById("audio-opt").onclick = function () {
        hideMembers("audio");
    }

    // Add more links

    var clone = document.querySelector("#resources div").cloneNode([true]);

    function readd() {
        var close = document.getElementsByClassName("remove-resource");
        for (var i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                clone = document.querySelector("#resources div").cloneNode([true]);
                this.parentNode.remove();
            }
        }
    }
    readd();

    document.getElementById("add-more").onclick = function() {
        document.getElementById("resources").insertBefore(clone, this);
        clone = document.querySelector("#resources div").cloneNode([true]);
        readd();
    }

    // Generate pretty selects

    var selects = document.getElementsByTagName("select");

    for (var i = 0; i < selects.length; i++) {

        var selectContainer = document.createElement("div");
        selectContainer.classList.add("select-container");

        var optContainer = document.createElement("div");
        optContainer.classList.add("options-container");

        var icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerText = "keyboard_arrow_down";

        var title = document.createElement("span");

        var p = document.createElement("p");
        p.innerText = selects[i].children[0].innerText;

        title.appendChild(p);
        title.appendChild(icon);
        selectContainer.appendChild(title);

        for (var j = 0; j < selects[i].children.length; j++) {
            var div = document.createElement("div");
            var p = document.createElement("p");
            p.innerText = selects[i].children[j].innerText;
            div.appendChild(p);
            optContainer.appendChild(div);
            div.onclick = function () {
                var actSelect = this.parentNode.parentNode.previousSibling.previousSibling;
                this.parentNode.previousSibling.children[0].innerText = this.innerText;
                actSelect.value = this.innerText.toLowerCase();
                actSelect.dispatchEvent(new Event('change'));
                this.parentNode.parentNode.classList.remove("show");
                this.parentNode.parentNode.style.height = "47.6px";
                this.parentNode.parentNode.children[0].children[1].classList.remove("rotated");
            }
        }

        selectContainer.appendChild(optContainer);
        selects[i].parentNode.appendChild(selectContainer);

        selectContainer.onmouseleave = function() {
            this.classList.remove("show");
            this.style.height = "47.6px";
            this.children[0].children[1].classList.remove("rotated");
        }

        title.onclick = function () {
            if (this.parentNode.classList.contains("show")) {
                this.parentNode.classList.remove("show");
                this.parentNode.style.height = "47.6px";
                this.children[1].classList.remove("rotated");
            }
            else {
                this.parentNode.classList.add("show");
                this.parentNode.style.height = 47.6 + this.nextSibling.children.length * 47.6 + "px";
                this.children[1].classList.add("rotated");
            }
        }
    }

    portofolio("carousel", {
        type: "carousel",
        items: 1,
        transition : {
            transitionType:"slide"
        },
        nav : {
            show: true,
            prev: "<i class='material-icons'>chevron_left</i>",
            next: "<i class='material-icons'>chevron_right</i>"
        }
    });

    // Wrap navigation buttons

    var next = document.getElementsByClassName("next")[0];
    var prev = document.getElementsByClassName("prev")[0];

    var container = document.createElement("div");
    container.classList.add("nav-container");

    document.getElementById("carousel").appendChild(container);
    container.appendChild(prev);
    container.appendChild(next);

    next.children[0].onclick = function() {
        while (document.getElementsByClassName("actives")[0].nextElementSibling.style.display == "none") {
            document.getElementsByClassName("actives")[0].nextElementSibling.classList.add("actives");
            document.getElementsByClassName("actives")[0].classList.remove("actives");
        }
        document.getElementsByClassName("actives")[0].nextElementSibling.classList.add("actives");
        document.getElementsByClassName("actives")[0].classList.remove("actives");

        if (document.getElementById("final").classList.contains("actives")) {
            this.style.display = "none";
        }
        else {
            document.querySelector(".nav-container .prev").children[0].style.display = "flex";
        }
    }

    prev.children[0].onclick = function() {
        while (document.getElementsByClassName("actives")[0].previousElementSibling.style.display == "none") {
            document.getElementsByClassName("actives")[0].previousElementSibling.classList.add("actives");
            document.getElementsByClassName("actives")[1].classList.remove("actives");
        }
        document.getElementsByClassName("actives")[0].previousElementSibling.classList.add("actives");
        document.getElementsByClassName("actives")[1].classList.remove("actives");

        if (document.getElementById("pick").classList.contains("actives")) {
            this.style.display = "none";
        }
        else {
            document.querySelector(".nav-container .next").children[0].style.display = "flex";
        }
    }


    // Toggle fields for specific options

    var showNav = document.querySelector(".car-stage > #navigation > div  label:first-child select");
    var next = document.querySelector(".car-stage > #navigation #nav-next");
    var prev = document.querySelector(".car-stage > #navigation #nav-prev");

    showNav.onchange = function() {
        if (showNav.value == "true") {
            prev.style.display = "flex";
            next.style.display = "flex";
        }
        else {
            prev.style.display = "none";
            next.style.display = "none"; 
        }
    }


    var auto = document.querySelector(".car-stage > #transition > div  label:nth-child(3) select");
    var autoInterval = document.querySelector(".car-stage > #transition #auto-interval");
    
    auto.onchange = function() {
        if (auto.value == "true") {
            autoInterval.style.display = "flex";
        }
        else {
            autoInterval.style.display = "none";
        }
    }


    var showFullscreen = document.querySelector(".car-stage > #fullscreen > div  label:first-child select");
    var open = document.querySelector(".car-stage > #fullscreen #full-open");
    var close = document.querySelector(".car-stage > #fullscreen #full-close");

    showFullscreen.onchange = function() {
        if (showFullscreen.value == "true") {
            open.style.display = "flex";
            close.style.display = "flex";
        }
        else {
            open.style.display = "none";
            close.style.display = "none"; 
        }
    }

});