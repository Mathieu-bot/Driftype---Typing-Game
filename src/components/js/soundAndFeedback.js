function toggleSoundAndFeedback() {
    const section = document.getElementById('sound-feedback');
    if (section) {
        section.classList.toggle('hidden');
    }
}

function saveSoundAndFeedbackSettings() {
    const settings = {
        enableSounds: document.getElementById('enableSoundsToggle')?.checked,
        keyboardSounds: document.getElementById('keyboardSoundsToggle')?.checked,
    };
    console.log(settings);
    
    localStorage.setItem('soundFeedbackSettings', JSON.stringify(settings));
    console.log(localStorage.setItem('soundFeedbackSettings', JSON.stringify(settings)));
    
}

const bgMusic = new Audio('/src/assets/background-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

function loadSoundAndFeedbackSettings() {
    const settings = JSON.parse(localStorage.getItem('soundFeedbackSettings')) || {};
    console.log(settings);
    
    const enableEl = document.getElementById('enableSoundsToggle');
    if (enableEl && 'enableSounds' in settings) enableEl.checked = settings.enableSounds;
    const keyboardEl = document.getElementById('keyboardSoundsToggle');
    if (keyboardEl && 'keyboardSounds' in settings) keyboardEl.checked = settings.keyboardSounds;
    // Play/pause background music on applicable pages
    const enableSounds = settings.enableSounds;
    const page = window.location.pathname.split('/').pop();
    if (enableSounds && (page === 'dashboard.html' || page === 'gameStat.html')) {
        bgMusic.play().catch(() => {
            const retryPlay = () => {
                bgMusic.play().catch(() => {});
                document.body.removeEventListener('click', retryPlay);
            };
            document.body.addEventListener('click', retryPlay);
        });
    } else {
        bgMusic.pause();
    }
}

document.addEventListener('DOMContentLoaded', loadSoundAndFeedbackSettings);
