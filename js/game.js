let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

document.addEventListener('keydown', (e) => {
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
});
