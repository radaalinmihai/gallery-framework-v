function nav (options, container) {

	if (options.hasOwnProperty("prev") == false || options.prev == null || options.hasOwnProperty("next") == false || options.next == null) {

		options.prev = "<i>❮</i>";
		options.next = "<i>❯</i>";

	}

	var cont = document.createElement("div");
	cont.classList.add("prev");
	var doc = new DOMParser().parseFromString(options.prev, 'text/html');
	cont.appendChild(doc.body.firstChild);
	container.appendChild(cont);

	var cont = document.createElement("div");
	cont.classList.add("next");
	var doc = new DOMParser().parseFromString(options.next, 'text/html');
	cont.appendChild(doc.body.firstChild);
	container.appendChild(cont);

}

function fullscreen (options, container, stage) {
	var butContainer = document.createElement("div");
	butContainer.classList.add("car-full-buttons");
	container.insertBefore(butContainer, stage);

	if (options.hasOwnProperty("open") == false || options.open == null || options.hasOwnProperty("close") == false || options.close == null) {
		options.open = "<i>↗</i>";
		options.close = "<i>✖</i>";
	}

	var doc = new DOMParser().parseFromString(options.open, 'text/html');
	butContainer.appendChild(doc.body.firstChild);

	var doc = new DOMParser().parseFromString(options.close, 'text/html');
	butContainer.appendChild(doc.body.firstChild);

	var enlarge = butContainer.children[0];
	var close = butContainer.children[1];

	close.style.display = "none";

	function toggleFull () {
		if (container.classList.contains("full-car")) {
			container.classList.remove("full-car");
			close.style.display = "none";
			enlarge.style.display = "inline-block";
		}
		else {
			container.classList.add("full-car");
			close.style.display = "inline-block";
			enlarge.style.display = "none";
		}
	}

	enlarge.onclick = toggleFull;
	close.onclick = toggleFull;
}