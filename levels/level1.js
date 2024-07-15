const level1Soundtrack = "audio/Shark game song.mp3"
const level1Ending = 2250;
const level1 = new Level(
    [
        new JellyFish(1100),
        new JellyFish(400),
        new JellyFish(6700),
        new JellyFish(600),
        new JellyFish(900),
        new Endboss()
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
    level1Ending,
    level1Soundtrack
);
