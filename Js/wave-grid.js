// Js/wave-grid.js

// 1. Correct the SVGs to use fill="currentColor" for CSS styling flexibility.
// Removed all SVGRepo garbage and fill="none" to ensure clean insertion.
const playSvg = '<svg width="65px" height="65px" viewBox="0 0 24 24" fill="#ddd" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#ffffff" stroke-width="1.584" stroke-linejoin="round"></path> </g></svg>';
const pauseSvg = '<svg width="65px" height="65px" viewBox="0 0 24 24"  fill="#ddd" stroke="#ffffff" stroke-width="1.344"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z"></path></g></svg>';


// Store all active WaveSurfer instances
let activeWavesurfers = [];
const musicPlayers = document.querySelectorAll('.music');

musicPlayers.forEach(player => {
    const audioSrc = player.getAttribute('data-audio-src');
    const playBtn = player.querySelector('.play-btn');
    const waveformContainer = player.querySelector('.waveform-container');

    playBtn.innerHTML = playSvg;

    const wavesurfer = WaveSurfer.create({
        container: waveformContainer,
        waveColor: '#555',
        progressColor: '#0a0',
        barWidth: 6,
        responsive: true,
        height: 30,
        barRadius: 5,
        cursorWidth: 0
    });
    
    activeWavesurfers.push(wavesurfer);
    
    // **CRITICAL: Ensure the audio file path is correct relative to the HTML file!**
    wavesurfer.load(audioSrc);

    playBtn.onclick = function() {
        if (!wavesurfer.isPlaying()) {
            activeWavesurfers.forEach(otherSurfer => {
                if (otherSurfer !== wavesurfer && otherSurfer.isPlaying()) {
                    otherSurfer.pause();
                    
                    const otherPlayer = otherSurfer.container.closest('.music');
                    if (otherPlayer) {
                        otherPlayer.querySelector('.play-btn').innerHTML = playSvg;
                        otherPlayer.classList.remove('is-playing');
                    }
                }
            });
        }
        
        // TOGGLE CURRENT PLAYER
        wavesurfer.playPause();
    }
    
    // --- Event Listeners for Icon and State Update ---
    
    // Listener for when the player actually starts playing (Play button pressed OR waveform clicked)
    wavesurfer.on('play', function() {
        playBtn.innerHTML = pauseSvg;
        player.classList.add('is-playing'); // Add class for CSS highlighting
    });

    // Listener for when the player is paused (Pause button pressed OR manual pause)
    wavesurfer.on('pause', function() {
        playBtn.innerHTML = playSvg;
        player.classList.remove('is-playing'); // Remove class
    });

    // Listener for when the track ends
    wavesurfer.on('finish', function() {
        // wavesurfer.stop(); // waveSurfer automatically stops and resets
        playBtn.innerHTML = playSvg;
        player.classList.remove('is-playing');
    });
});