document.addEventListener('DOMContentLoaded', function() {

    // Generate responsive settings

    var inputs = [], inputsBU = [], typeChosen = "none", breakpointindex, inputType = document.querySelector('input[name="type"]');

    function generateResponsiveInputs() {
        if (typeChosen == "carousel") {
            inputs[inputs.length] = document.getElementById("itemsper").cloneNode([true]);
            inputs[inputs.length] = document.getElementById("autoselect").cloneNode([true]);
            inputs[inputs.length] = document.getElementById("navselect").cloneNode([true]);
            inputs[inputs.length] = document.getElementById("fullscreenselect").cloneNode([true]);
        }
        else if (typeChosen == "grid") {
            inputs[inputs.length] = document.getElementById("itemsperrow").cloneNode([true]);
            inputs[inputs.length] = document.getElementById("fullscreen_grid").cloneNode([true]);
        }

        var div = document.createElement("div");

        if (typeChosen == "grid") breakpointindex = 1;
        else if (typeChosen == "carousel") breakpointindex = 0;

        for (var i = 0; i < inputs.length; i++) {
            div.appendChild(inputs[i]);
        }

        document.getElementsByClassName("new-breakpoint")[breakpointindex].appendChild(div);

        prettySelects();

        function openBreakpoints (ele) {
            ele.addEventListener("click", function() {
                this.parentNode.nextElementSibling.classList.toggle("open-breakpoint");
            });
        }

        openBreakpoints(document.getElementsByClassName("new-breakpoint")[breakpointindex].children[0].children[1]);

        var button = document.getElementsByClassName("new-breakpoint")[breakpointindex].nextElementSibling, copyForResponsive;

        button.addEventListener("click", function () {
            copyForResponsive = this.previousElementSibling.cloneNode([true]);
            this.parentNode.insertBefore(copyForResponsive, this);
            openBreakpoints(copyForResponsive.children[0].children[1]);
            var selects = document.getElementsByClassName("select-container");

            for (var i = 0; i < selects.length; i++) readdSelectEvents(selects[i]);
            copyForResponsive = this.previousElementSibling.cloneNode([true]);
        });

    }

    // Choose album type

    function slideOut (type) {
        switch (type) {
            case "carousel-opt" :
                document.getElementById("carousel-creation-form").classList.remove("album-forms-hidden");
                typeChosen = "carousel";
                inputType.value = typeChosen;
                document.getElementsByClassName('album-forms')[0].addEventListener('submit', create_album);
                break;

            case "audio-opt" :
                document.getElementById("audio-creation-form").classList.remove("album-forms-hidden");
                typeChosen = 'audio';
                inputType.value = typeChosen;
                document.getElementsByClassName('album-forms')[2].addEventListener('submit', create_album);
                break;

            case "grid-opt" :
                document.getElementById("grid-creation-form").classList.remove("album-forms-hidden");
                typeChosen = "grid";
                inputType.value = typeChosen;
                document.getElementsByClassName('album-forms')[1].addEventListener('submit', create_album);
                break;
        }


        var asideRight = document.getElementById("aside-right-welcome"),
            pick = document.getElementById("pick-type-container"),
            carousels = document.getElementById("creation-carousels");

        var height = asideRight.offsetHeight;


        asideRight.style.transform = "translateY(-" + height * 2 + "px)";
        pick.style.transform = "translateY(-" + height * 2 + "px)";
        carousels.style.transform = "translateY(-" + height * 2 + "px)";

        if (typeChosen == "carousel" || typeChosen == "grid") {
            generateResponsiveInputs();
        }

    }

    function selectType (ele) {
        ele.addEventListener("click", function () {
            slideOut(ele.getAttribute("id"));
        });
    }

    var options = document.getElementById("album-options").children;

    for (var i = 0; i < options.length; i++) selectType(options[i]);

    // Copy for responsive

    function createBreakpoint (type) {

        var div = document.createElement("div"), bps = document.getElementsByClassName("new-breakpoint");

        if (type == "carousel") {
            var c = document.getElementById("itemsper").cloneNode([true]);
            var l = document.getElementById("itemspertrans").cloneNode([true]);
            var o = document.getElementById("autoselect").cloneNode([true]);
            var n = document.getElementById("navselect").cloneNode([true]);
            var e = document.getElementById("fullscreenselect").cloneNode([true]);
            c.childNodes[3].setAttribute('name', 'items_per_slide');
            l.childNodes[3].setAttribute('name', 'items_per_trans');
            o.childNodes[3].setAttribute('name', 'auto_responsive');
            n.childNodes[3].setAttribute('name', 'nav_select');
            e.childNodes[3].setAttribute('name', 'fullscreen_responsive');
            div.appendChild(o);
            div.appendChild(n);
            div.appendChild(e);
            div.appendChild(c);
            div.appendChild(l);
        }
        else if (type == "grid") {
            var c = document.getElementById("itemsperrow").cloneNode([true]);

            c.childNodes[3].setAttribute('name', 'items_per_slide');

            div.appendChild(c);
        }

        div.classList.add("hidden");

        document.getElementsByClassName("new-breakpoint")[0].appendChild(div);

        function openBreakpoint (ele) {
            ele.onclick = function() {
                var sets = ele.parentNode.nextSibling.nextSibling;
                if (sets.classList.contains("hidden")) {
                    ele.classList.add("rotated");
                    sets.style.display = "flex";
                    sets.classList.remove("hidden");
                }
                else {
                    ele.classList.remove("rotated");
                    sets.style.display = "none";
                    sets.classList.add("hidden");
                }
            }
        }

        function keyStrokes (ele) {
            var created, removed = 0;
            ele.onkeyup = function() {
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
    }

    // Add more links

    var clone;

    function readd() {
        var close = document.getElementsByClassName("remove-resource");
        for (var i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                clone = this.parentNode.cloneNode([true]);
                this.parentNode.remove();
                console.log(clone);
            }
        }
    }
    readd();

    function appEvent (ele) {

        ele.addEventListener("click", function() {

            if (clone == null) clone = ele.previousElementSibling.cloneNode([true]);
            ele.parentNode.insertBefore(clone, ele);
            console.log(clone);
            clone = ele.previousElementSibling.cloneNode([true]);
            readd();

        });

    }

    var readds = document.getElementsByClassName("add-more");

    for (i = 0; i < readds.length; i++) {
        appEvent(readds[i]);
    }

    // Generate pretty selects

    function prettySelects() {

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

    }

    function readdSelectEvents (ele) {
        ele.onmouseleave = function() {
            this.classList.remove("show");
            this.style.height = "47.6px";
            this.children[0].children[1].classList.remove("rotated");
        }

        ele.children[0].onclick = function () {
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

    // Wrap navigation buttons

    function wrapNav() {

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

    }

    // wrapNav();


    // Toggle fields for specific options

    var showNav = document.getElementById("nav_select");
    var next = document.getElementById("nav-prev");
    var prev = document.getElementById("nav-next");

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

    var mainButton = document.getElementsByClassName("main-button")[0],
        aside = document.getElementsByClassName("aside-right")[0],
        asideRight = document.getElementById("aside-right-welcome"),
        pick = document.getElementById("pick-type-container"),
        carousels = document.getElementById("creation-carousels");

    mainButton.onclick = function () {

        var height = asideRight.offsetHeight;

        asideRight.style.transform = "translateY(-" + height + "px)";
        pick.style.transform = "translateY(-" + height + "px)";
        carousels.style.transform = "translateY(-" + height + "px)";
        
    }

});