function moveUp (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum) {

	switch (type) {
		case "slide":

			if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth)) {
				console.log(transitionItemsNum);
				var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
				stage.style.left = "-" + newSize.toString() + "px";
			}
			else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth)) {
				var newSize = parseInt(stage.style.left) * -1 + containerWidth;
				stage.style.left = "-" + newSize.toString() + "px";
			}

		break;

		case "item":

			if (parseInt(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseInt(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
				var newSize = parseInt(stage.style.left) * -1 + (stageWidth - containerWidth - parseInt(stage.style.left) * -1);
				stage.style.left = "-" + newSize.toString() + "px";
			}
			else if (parseInt(stage.style.left) * -1 < (stageWidth - containerWidth - memberWidth * transitionItemsNum)) {
				var newSize = parseInt(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
				stage.style.left = "-" + newSize.toString() + "px";
			}

	}

}

function moveDown (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum) {
	switch (type) {
		case "slide":

			if (parseInt(stage.style.left) != 0) {
				var newSize = parseInt(stage.style.left) + containerWidth;
				stage.style.left = newSize.toString() + "px";
			}

		break;

		case "item":

			if (parseInt(stage.style.left) * -1 != 0) {
				var newSize = parseInt(stage.style.left) * -1 - (memberWidth * transitionItemsNum);
				stage.style.left = "-" + newSize.toString() + "px";
			}

	}
}