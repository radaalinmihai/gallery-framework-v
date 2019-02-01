function moveUp (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop) {

	switch (type) {
		case "slide":
			
			if (loop && parseFloat(stage.style.left) * -1 >= (stageWidth - containerWidth * 2)) {
				if (parseFloat(stage.style.left) * -1 >= (stageWidth - containerWidth * 2)) {
					var newSize = stageWidth - containerWidth;
					stage.style.left = "-" + newSize.toString() + "px";
					setTimeout(function() {
						stage.style.transition = "none";
						stage.style.left = "-" + containerWidth + "px";
					}, 210);
					setTimeout(function() {
						stage.style.transition = "all 0.2s ease-in-out";
					}, 220);
				}
				else {
					var newSize = parseFloat(stage.style.left) * -1 + containerWidth;
					stage.style.left = "-" + newSize.toString() + "px";
					setTimeout(function() {
						stage.style.transition = "none";
						stage.style.left = "-" + containerWidth + "px";
					}, 210);
					setTimeout(function() {
						stage.style.transition = "all 0.2s ease-in-out";
					}, 220);
				}
			}
			else if (parseFloat(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth)) {
				var newSize = parseFloat(stage.style.left) * -1 + (stageWidth - containerWidth - parseFloat(stage.style.left) * -1);
				stage.style.left = "-" + newSize.toString() + "px";
			}
			else if (parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth)) {
				var newSize = parseFloat(stage.style.left) * -1 + containerWidth;
				stage.style.left = "-" + newSize.toString() + "px";
			}

		break;

		case "item":

			if (loop && parseFloat(stage.style.left) * - 1 >= (stageWidth - containerWidth * 2)) {

				if (parseFloat(stage.style.left) * - 1 > (stageWidth - containerWidth * 2)) {
					var available = stageWidth - containerWidth - parseFloat(stage.style.left) * -1 / memberWidth;
					if (available < transitionItemsNum) {
						var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * available);
						stage.style.left = "-" + newSize.toString() + "px";
						setTimeout(function() {
							stage.style.transition = "none";
							stage.style.left = "-" + containerWidth + "px";
						}, 200);
						setTimeout(function() {
							stage.style.transition = "all 0.2s ease-in-out";
						}, 220);
					}
					else {
						var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
						stage.style.left = "-" + newSize.toString() + "px";
						setTimeout(function() {
							stage.style.transition = "none";
							if (parseFloat(stage.style.left) * -1 == stageWidth - containerWidth) {
								stage.style.left = "-" + containerWidth + "px";
							}
							else {
								var available = stageWidth - containerWidth - parseFloat(stage.style.left) * -1;
								stage.style.left = "-" + (containerWidth - available) + "px";
							}
						}, 200);
						setTimeout(function() {
							stage.style.transition = "all 0.2s ease-in-out";
						}, 220);
					}
				}
				else {
					var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
					stage.style.left = "-" + newSize.toString() + "px";
					setTimeout(function() {
						stage.style.transition = "none";
						stage.style.left = "-" + (containerWidth - memberWidth * (containerWidth / memberWidth - transitionItemsNum)) + "px";
					}, 200);
					setTimeout(function() {
						stage.style.transition = "all 0.2s ease-in-out";
					}, 220);
				}

			}
			else if (parseFloat(stage.style.left) * -1 > (stageWidth - containerWidth * 2) && parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth) && transitionItemsNum > 1) {
				var newSize = parseFloat(stage.style.left) * -1 + (stageWidth - containerWidth - parseFloat(stage.style.left) * -1);
				stage.style.left = "-" + newSize.toString() + "px";
			}
			else if (parseFloat(stage.style.left) * -1 < (stageWidth - containerWidth - memberWidth * transitionItemsNum)) {
				var newSize = parseFloat(stage.style.left) * -1 + (memberWidth * transitionItemsNum);
				stage.style.left = "-" + newSize.toString() + "px";
			}

	}

}

function moveDown (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop) {
	switch (type) {
		case "slide":

			if (loop && parseFloat(stage.style.left) * -1 <= containerWidth) {
				if (parseFloat(stage.style.left) * -1 < containerWidth) {
					stage.style.left = "0px";
					setTimeout(function() {
						stage.style.transition = "none";
						stage.style.left = "-" + (stageWidth - containerWidth * 2) + "px";
					}, 210);
					setTimeout(function() {
						stage.style.transition = "all 0.2s ease-in-out";
					}, 220);
				}
				else {
					var newSize = parseFloat(stage.style.left) + containerWidth;
					stage.style.left = newSize.toString() + "px";
					setTimeout(function() {
						stage.style.transition = "none";
						stage.style.left = "-" + (stageWidth - containerWidth * 2) + "px";
					}, 210);
					setTimeout(function() {
						stage.style.transition = "all 0.2s ease-in-out";
					}, 220);
				}
			}
			else if (parseFloat(stage.style.left) != 0) {
				var newSize = parseFloat(stage.style.left) + containerWidth;
				stage.style.left = newSize.toString() + "px";
			}

		break;

		case "item":

			if (loop && parseInt(stage.style.left) * -1 <= containerWidth) {
				if (parseInt(stage.style.left) * -1 < containerWidth){
					var available = Math.ceil((parseInt(stage.style.left) * -1) / memberWidth);
					if (available < transitionItemsNum) {
						var newSize = parseFloat(stage.style.left) + memberWidth * available;
						stage.style.left = newSize.toString() + "px";
						setTimeout(function() {
							stage.style.transition = "none";
							stage.style.left = "-" + (stageWidth - containerWidth * 2) + "px";
						}, 200);
						setTimeout(function() {
							stage.style.transition = "all 0.2s ease-in-out";
						}, 220);
					}
					else {
						var newSize = parseFloat(stage.style.left) + memberWidth * transitionItemsNum;
						stage.style.left = newSize.toString() + "px";
						setTimeout(function() {
							stage.style.transition = "none";
							stage.style.left = "-" + (stageWidth - containerWidth * 2 - parseInt(stage.style.left)) + "px";
						}, 200);
						setTimeout(function() {
							stage.style.transition = "all 0.2s ease-in-out";
						}, 220);
					}
				}
				else {
					var newSize = parseFloat(stage.style.left) + memberWidth * transitionItemsNum;
					stage.style.left = newSize.toString() + "px";
					setTimeout(function() {
						stage.style.transition = "none";
						stage.style.left = "-" + (stageWidth - containerWidth - (memberWidth * transitionItemsNum)) + "px";
					}, 200);
					setTimeout(function() {
						stage.style.transition = "all 0.2s ease-in-out";
					}, 220);
				}
			}
			else if (parseInt(stage.style.left) != 0) {
				var newSize = parseFloat(stage.style.left) + memberWidth * transitionItemsNum;
				stage.style.left = newSize.toString() + "px";
			}

	}
}