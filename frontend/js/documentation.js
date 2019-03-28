document.addEventListener('DOMContentLoaded', function() {

	var doclinks = document.getElementsByClassName("doc-links");

	for (var i = 0; i < doclinks.length; i++) {
		doclinks[i].addEventListener("click", function() {
			var id = this.getAttribute("id");

            id = id.substring(0, id.indexOf('-'));
            id = id.replace(/\s/g, '');
			id = id.toLowerCase();


			document.getElementsByClassName("selected-doc")[0].classList.remove("selected-doc");
			document.getElementById(id).classList.add("selected-doc");
			document.getElementsByClassName("selected-link")[0].classList.remove("selected-link");
			this.classList.add("selected-link");
		});
	}

});