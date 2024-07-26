let canvas;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let info = false;
let volume = true;

async function init() {

};

async function initGame() {
    canvas = document.getElementById('canvas');
    await initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('start').style.display = 'none';
    document.getElementById('hud').style.display = '';
    document.getElementById('sound').style.display = '';
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleFullscreen() {
    let screen = document.getElementById("container");
    if (!fullscreen) {
        enterFullscreen(screen);
        fullscreen = true;
    } else if (fullscreen) {
        exitFullscreen();
        fullscreen = false;
    }
}

function toggleInfo() {
    if (info) {
        document.getElementById("help").style.display = "none";
        info = false;
    } else if (!info) {
        document.getElementById("help").style.display = "";
        info = true;
    }
}

function toggleVolume() {

    if (volume) {
        document.getElementById("sound").src = "img/Menu/sound-off.png"
        world.musicVolume = 0;
        world.effectVolume = 0;
        volume = false;
    } else if (!volume) {
        document.getElementById("sound").src = "img/Menu/sound-on.png"
        world.musicVolume = 0.7;
        world.effectVolume = 0.5;
        volume = true;
    }
    console.log(world.musicVolume);
    console.log(volume);
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
    if (e.keyCode === 49) {
        keyboard.ONE = true;
    }
    if (e.keyCode === 50) {
        keyboard.TWO = true;
    }
    if (e.keyCode === 51) {
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
    if (e.keyCode === 49) {
        keyboard.ONE = false;
    }
    if (e.keyCode === 50) {
        keyboard.TWO = false;
    }
    if (e.keyCode === 51) {
        keyboard.THREE = false;
    }

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
});
