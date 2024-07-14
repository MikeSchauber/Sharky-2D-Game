const level1 = new Level(
    [
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new Endboss()
    ],
    [
        new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720, 720, 400),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720, 720, 400),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -720, 720, 350),
        new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0, 720, 400),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 720, 400),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0, 720, 350),
        new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720, 720, 400),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720, 720, 400),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720, 720, 350),
    ],
    [
        new Light("img/3. Background/Layers/1. Light/1.png", 0),
        new Light("img/3. Background/Layers/1. Light/2.png", 720),
    ],
    1200
);
