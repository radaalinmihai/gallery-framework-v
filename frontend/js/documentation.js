document.addEventListener('DOMContentLoaded', function() {

	var doclinks = document.getElementsByClassName("doc-links");

	console.log(doclinks);

	for (var i = 0; i < doclinks.length; i++) {
		console.log(doclinks[i]);
		doclinks[i].addEventListener("click", function() {
			var id = this.innerText;

			id = id.replace(/\s/g, '');
			id = id.toLowerCase();

			document.getElementsByClassName("selected-doc")[0].classList.remove("selected-doc");
			document.getElementById(id).classList.add("selected-doc");
			document.getElementsByClassName("selected-link")[0].classList.remove("selected-link");
			this.classList.add("selected-link");
		});
	}

});