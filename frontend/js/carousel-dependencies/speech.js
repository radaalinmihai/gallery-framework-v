function speechRec (type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop) {
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	var recognition = new SpeechRecognition();
	recognition.lang = 'ro';
	recognition.interimResults = true;
	var transcript = "", stopped = 0, prevTranscript = "";

	recognition.addEventListener("result", e => {
		transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
		
		if (stopped == 0) {
			if (transcript != prevTranscript) {
				if (transcript == "înainte" || transcript == "Înainte") {
					moveUp(type, stage, stageWidth, containerWidth, memberWidth, transitionItemsNum, loop);
					stopped = 1;
				}
				else if (transcript == "înapoi" || transcript == "Înapoi") {
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