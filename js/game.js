let canvas;
let world;
let worldMusic;
let keyboard = new Keyboard();
let intervalIds = [];
let timeoutIds = [];
let animationFrameIds = [];
let fullscreen = false;
let info = false;
let volume = true;

/**
 * Initializes the application.
 */
async function init() {
    startTouchEventListener();
    load();
}

/**
 * Initializes the game.
 * 
 * @param {string} tryagain - The ID of the element to hide if the game is being retried.
 */
async function initGame(tryagain) {
    hideMenuButtons();
    startLoadingscreen(tryagain);
    canvas = document.getElementById('canvas');
    await initLevel();
    world = new World(canvas, keyboard);
    stopLoadingscreen();
}

/**
 * Starts the loading screen.
 * 
 * @param {string} tryagain - The ID of the element to hide if the game is being retried.
 */
function startLoadingscreen(tryagain) {
    if (tryagain !== undefined) {
        clearAllIntervals();
        document.getElementById(tryagain).classList.add("d-none");
    }
    document.getElementById('loadingScreen').style.display = "";
    document.getElementById('loadingScreen').style.opacity = 1;
}

/**
 * Stops the loading screen and starts the background music.
 */
function stopLoadingscreen() {
    setTimeout(function () {
        document.getElementById('loadingScreen').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = "none";
        }, 150);
        checkLastVolume();
    }, 1000);
}

/**
 * Hides menu buttons.
 */
function hideMenuButtons() {
    document.getElementById("impress").style.display = "none";
    document.getElementById('start').style.display = 'none';
    document.getElementById('hud').style.display = '';
    document.getElementById('sound').style.display = '';
    document.querySelector("h1").style.display = 'none';
}

/**
 * Clears all intervals.
 */
function clearAllIntervals() {
    intervalIds.forEach(clearInterval);
}

/**
 * Enters fullscreen mode for a given element.
 * 
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
    let screen = document.getElementById("container");
    if (!fullscreen) {
        enterFullscreen(screen);
        document.getElementById("fullscreen").src = "icons/fullscreen-exit.png";
        fullscreen = true;
    } else if (fullscreen) {
        exitFullscreen();
        document.getElementById("fullscreen").src = "icons/fullscreen.png";
        fullscreen = false;
    }
}

/**
 * Toggles the display of the info/help section.
 */
function toggleInfo() {
    if (info) {
        document.getElementById("help").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("help").style.display = "none";
        }, 125);
        info = false;
    } else if (!info) {
        document.getElementById("help").style.display = "";
        setTimeout(() => {
            document.getElementById("help").style.opacity = 1;
        }, 125);
        info = true;
    }
}

function checkLastVolume() {
    if (!volume) {
        document.getElementById("sound").src = "icons/sound-off.png";
        world.musicSettings.pauseBackgroundMusic();
    } else if (volume) {
        document.getElementById("sound").src = "icons/sound-on.png";
        world.musicSettings.playBackgroundMusic();
    }
}

/**
 * Toggles the volume between on and off.
 */
function toggleVolume() {
    if (volume) {
        document.getElementById("sound").src = "icons/sound-off.png";
        world.musicSettings.pauseBackgroundMusic();
        volume = false;
    } else if (!volume) {
        document.getElementById("sound").src = "icons/sound-on.png";
        world.musicSettings.playBackgroundMusic();
        volume = true;
    }
    save();
}

function save() {
    let volumeAsText = JSON.stringify(volume);
    localStorage.setItem('volume', volumeAsText);
}

function load() {
    let volumeAsText = localStorage.getItem('volume');
    volume = JSON.parse(volumeAsText);
}

/**
 * Displays the victory screen.
 */
function victory() {
    document.getElementById("victory").classList.remove("d-none");
}

/**
 * Displays the game over screen.
 */
function gameover() {
    document.getElementById("gameover").classList.remove("d-none");
}

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.keyCode === 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode === 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode === 81) {
        keyboard.ONE = true;
    }
    if (e.keyCode === 87) {
        keyboard.TWO = true;
    }
    if (e.keyCode === 69) {
        keyboard.THREE = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode === 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode === 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode === 81) {
        keyboard.ONE = false;
    }
    if (e.keyCode === 87) {
        keyboard.TWO = false;
    }
    if (e.keyCode === 69) {
        keyboard.THREE = false;
    }
});

/**
 * Starts the touch event listeners for the on-screen controls.
 */
function startTouchEventListener() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById("btnUp").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById("btnOne").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.ONE = true;
    });
    document.getElementById("btnTwo").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.TWO = true;
    });
    document.getElementById("btnThree").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.THREE = true;
    });

    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById("btnUp").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById("btnOne").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.ONE = false;
    });
    document.getElementById("btnTwo").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.TWO = false;
    });
    document.getElementById("btnThree").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.THREE = false;
    });
}
