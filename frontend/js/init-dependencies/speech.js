function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function speechRec (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop, lang) {
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	var recognition = new SpeechRecognition();
	if (lang.hasOwnProperty("code")) {
		recognition.lang = lang.code;
	}
	else {
		recognition.lang = "en-US";
	}

	recognition.interimResults = true;
	var transcript = "", stopped = 0, prevTranscript = "";

	recognition.addEventListener("result", e => {
		transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
		
		if (stopped == 0) {
			if (transcript != prevTranscript) {
				if (transcript == lang.next.toLowerCase() || transcript == capitalize(lang.next)) {
					moveUp(type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
					stopped = 1;
				}
				else if (transcript == lang.prev.toLowerCase() || transcript == capitalize(lang.prev)) {
					moveDown(type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
					stopped = 1;
				}
			}
		}

		prevTranscript = transcript;
		console.log(transcript);
	});

	recognition.addEventListener("end", function() {
		stopped = 0;
		prevTranscript = "none";
		recognition.start();
	});

	recognition.start();
}