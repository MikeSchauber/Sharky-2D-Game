let canvas;
let world;
let keyboard = new Keyboard();

async function init() {
    canvas = document.getElementById('canvas');
    await initLevel();
    world = new World(canvas, keyboard);
};

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
