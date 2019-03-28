function audioPlayer (songs) {
    var audio_source = document.createElement('audio'),
        play_button = document.getElementsByClassName('play_button')[0],
        resume_button = document.getElementsByClassName('resume_button')[0],
        current_progress = document.getElementsByClassName('current_progress')[0],
        progress = document.getElementsByClassName('progress')[0],
        player = document.getElementsByClassName('player')[0],
        volume = document.getElementsByClassName('volume')[0],
        next_song = document.getElementsByClassName('next_song')[0],
        prev_song = document.getElementsByClassName('previous_song')[0],
        volume_button = document.getElementsByClassName('volume_button')[0],
        song_name_div = document.getElementsByClassName('song_name')[0],
        index_songs = 0;

    if(navigator.userAgent.indexOf('Edge') >= 0)
        progress.style.borderRadius = 0;

    var audio_playlist = songs;
    audio_source.src = audio_playlist[index_songs];
    audio_source.load();
    song_name_div.innerHTML = '<strong>Current song: </strong>' + audio_playlist[index_songs];

    progress.style.height = player.offsetHeight + 'px';
    volume.value = audio_source.volume;

    play_button.onclick = function () {
        audio_source.play();
    };

    resume_button.onclick = function () {
        audio_source.pause();
    };

    volume.oninput = function () {
        audio_source.volume = volume.value;
    };

    volume_button.onclick = function () {
        audio_source.muted = !audio_source.muted;
    };

    /* DRAGGING PROGRESS BAR */

    var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

    // Will be called when user starts dragging an element
    function _drag_init(elem) {
        // Store the object of the element which needs to be moved
        selected = elem;
    }
    
    // Will be called when user dragging an element
    function _move_elem(e) {
        x_pos = document.all ? window.event.clientX : e.pageX;
        if (selected !== null) {
            var x = e.offsetX / selected.offsetWidth;
            audio_source.currentTime = Math.abs(audio_source.duration * x);
        }
    }
    
    // Destroy the object when we are done
    function _destroy() {
        selected = null;
    }
    
    progress.onmousemove = _move_elem;
    progress.onmouseup = _destroy;

    progress.onclick = function (e) {
        var x = e.offsetX / this.offsetWidth;
        audio_source.currentTime = Math.abs(audio_source.duration * x);
        console.log(Math.abs(audio_source.duration * x));
    };

    progress.onmousedown = function(e) {
        _drag_init(this);
        var x = e.offsetX / selected.offsetWidth;
        audio_source.currentTime = Math.abs(audio_source.duration * x);
    }

    /* END OF DRAGGING */

    audio_source.addEventListener('timeupdate', function () {
        var currentTime = this.currentTime,
            duration = this.duration;

        current_progress.style.width = Math.abs((100 / duration) * currentTime) + "%";
    });

    audio_source.addEventListener('pause', function () {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
    });

    audio_source.addEventListener('volumechange', function () {
        volume.value = this.volume;
        if (this.volume == 0 || audio_source.muted == true) {
            volume_button.querySelector('i').innerText = 'volume_off';
            volume.value = 0;
        } else {
            volume_button.querySelector('i').innerText = 'volume_up';
        }
    });

    audio_source.addEventListener('play', function () {
        resume_button.style.display = 'inline-block';
        play_button.style.display = 'none';
    });

    audio_source.addEventListener('ended', function () {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
        skip(true, false);
    });

    next_song.addEventListener('click', function() {
        skip(true, false);
    });

    prev_song.addEventListener('click', function() {
        skip(false, true);
    });

    function skip(next, prev) {
        if(next) {
            if(index_songs < audio_playlist.length - 1)
                index_songs++;
            else
                index_songs = 0;
        } else if(prev) {
            if(index_songs > 0)
                index_songs--;
            else
                index_songs = audio_playlist.length - 1;
        }
        changeSource(audio_playlist[index_songs]);
        song_name_div.innerHTML = '<strong>Current song: </strong>' + audio_playlist[index_songs];
    }

    function resetAudio() {
        resume_button.style.display = 'none';
        play_button.style.display = 'inline-block';
        if(audio_source.currentTime > 0)
            audio_source.currentTime = 0;
    }

    function changeSource(src) {
        resetAudio();
        audio_source.src = src;
        audio_source.load();
        audio_source.play();
    }
}