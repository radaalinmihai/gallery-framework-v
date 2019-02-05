document.addEventListener('DOMContentLoaded', function() {
    var audio_source = document.getElementsByClassName('audio_source')[0],
        play_button = document.getElementsByClassName('play_button')[0],
        resume_button = document.getElementsByClassName('resume_button')[0],
        current_progress = document.getElementsByClassName('current_progress')[0],
        progress = document.getElementsByClassName('progress')[0],
        player = document.getElementsByClassName('player')[0],
        volume = document.getElementsByClassName('volume')[0],
        volume_button = document.getElementsByClassName('volume_button')[0];

    progress.style.height = player.offsetHeight + 'px';
    volume.value = audio_source.volume;

    play_button.onclick = function() {
        audio_source.play();
    };

    resume_button.onclick = function() {
        audio_source.pause();
    };

    volume.oninput = function() {
        audio_source.volume = volume.value;
    };

    volume_button.onclick = function() {
        audio_source.muted = !audio_source.muted;
    };

    audio_source.addEventListener('timeupdate', function() {
        var currentTime = this.currentTime,
            duration = this.duration;
        current_progress.style.width = Math.abs((100 / duration) * currentTime) + "%";
    });

    audio_source.addEventListener('pause', function() {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
    });

    audio_source.addEventListener('volumechange', function() {
        volume.value = this.volume;
        if(this.volume == 0 || audio_source.muted == true) {
            volume_button.querySelector('i').innerText = 'volume_off';
        } else {
            volume_button.querySelector('i').innerText = 'volume_up';
        }
    });

    audio_source.addEventListener('play', function() {
        resume_button.style.display = 'inline-block';
        play_button.style.display = 'none';
    });

    audio_source.addEventListener('ended', function() {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
    });
});