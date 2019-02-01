function nav (options, container) {
	var navContainer = document.createElement("div");
	navContainer.add("carousel-nav");
	container.appendChild(navContainer);

	if (options.hasOwnProperty("prev")) {
		if (options.prev != null) {
			let doc = new DOMParser().parseFromString(options.prev, 'text/html');
			navContainer.appendChild(doc.body.firstChild);
		}
	}

	if (options.hasOwnProperty("next")) {
		if (options.next != null) {
			let doc = new DOMParser().parseFromString(options.next, 'text/html');
			navContainer.appendChild(doc.body.firstChild);
		}
	}
}

function fullscreen (options, container, stage) {
	var butContainer = document.createElement("div");
	butContainer.add("car-full-buttons");
	container.insertBefore(butContainer, stage);

	if (options.hasOwnProperty("open")) {
		if (options.open != null) {
			let doc = new DOMParser().parseFromString(options.open, 'text/html');
			butContainer.appendChild(doc.body.firstChild);
		}
	}

	if (options.hasOwnProperty("close")) {
		if (options.close != null) {
			let doc = new DOMParser().parseFromString(options.close, 'text/html');
			butContainer.appendChild(doc.body.firstChild);
		}
	}

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