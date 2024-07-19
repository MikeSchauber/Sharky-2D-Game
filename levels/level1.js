const level1Soundtrack = "audio/Shark game song.mp3"
const level1Ending = 2250;
let coins = [
    { x: 900, y: 100 },
    { x: 950, y: 75 },
    { x: 1000, y: 50 },
    { x: 1050, y: 50 },
    { x: 1100, y: 75 }
]
const level1 = new Level(
    [
        new Jellyfish(500, "yellow"),
        new Jellyfish(700, "pink"),
        new Jellyfish(790, "lila"),
        new Jellyfish(1150, "green"),
        new Pufferfish(550, 350),
        new Pufferfish(1050, 250),
        new Endboss(),
    ],
    [
        new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720, 720, 480, 0.2),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -720, 720, 350),
        new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0, 720, 350, 0.2),
        new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720, 720, 350, 0.2),
        new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 2, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 2, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 2, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 2, 720, 350, 0.2),
        new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720 * 3, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720 * 3, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 3, 720, 400, 0.2),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720 * 3, 720, 350, 0.2),
    ],
    [
        new Light("img/3. Background/Layers/1. Light/1.png", 0),
        new Light("img/3. Background/Layers/1. Light/2.png", 900),
    ],
    [
        new Poison(480, 390),
        new Poison(880, 390),
        new Poison(1280, 390),
        new Poison(1590, 390),
        new Poison(1890, 390),
    ],
    level1Ending,
    level1Soundtrack,
);
