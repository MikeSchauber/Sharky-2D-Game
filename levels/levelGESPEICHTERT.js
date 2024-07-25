let level1;
const level1Soundtrack = "audio/Shark game song.mp3";
const level1Ending = 4500;

async function initLevel() {
    level1 = new Level(
        [
            new Jellyfish(300, "yellow"),
            new Jellyfish(800, "pink"),
            new Jellyfish(1300, "lila"),
            new Jellyfish(1800, "green"),
            new Jellyfish(2300, "pink"),
            new Jellyfish(2800, "lila"),
            new Pufferfish(600, 350),
            new Pufferfish(1200, 300),
            new Pufferfish(2200, 350),
            new Pufferfish(3200, 300),
            new Endboss(level1Ending),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -720, 720, 350),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 2, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720 * 3, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 4, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720 * 5, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 6, 720, 350, 0.2),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 2, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 3, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 4, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 5, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 6, 720, 400, 0.2),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720, 720, 480, 0.2),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 2, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 2, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720 * 3, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720 * 3, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 4, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 4, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720 * 5, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720 * 5, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 6, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 6, 720, 400, 0.2),
        ],
        [
            new Light("img/3. Background/Layers/1. Light/1.png", 0),
            new Light("img/3. Background/Layers/1. Light/2.png", 600),
        ],
        [
            new Coin(100, 120),
            new Coin(300, 150),
            new Coin(600, 180),
            new Coin(900, 160),
            new Coin(1200, 140),
            new Coin(1500, 120),
            new Coin(1800, 150),
            new Coin(2100, 170),
            new Coin(2400, 130),
            new Coin(2700, 180),
        ],
        [
            new Poison(200, 135),
            new Poison(450, 165),
            new Poison(750, 170),
            new Poison(1050, 150),
            new Poison(1350, 130),
        ],
        level1Ending,
        level1Soundtrack,
    );    
}



async function initLevel() {
    level1 = new Level(
        [
            new Jellyfish(500, "yellow"),
            new Jellyfish(700, "pink"),
            new Jellyfish(790, "lila"),
            new Jellyfish(1150, "green"),
            new Pufferfish(550, 350),
            new Pufferfish(1050, 250),
            new Endboss(level1Ending),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", -720, 720, 350),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 2, 720, 350, 0.2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", 720 * 3, 720, 350, 0.2),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 2, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 3, 720, 400, 0.2),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720, 720, 480, 0.2),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 2, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 2, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720 * 3, 720, 480),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720 * 3, 720, 400, 0.2),
        ],
        [
            new Light("img/3. Background/Layers/1. Light/1.png", 0),
            new Light("img/3. Background/Layers/1. Light/2.png", 600),
        ],
        [
            new Coin(300, 100),
            new Coin(350, 75),
            new Coin(400, 50),
            new Coin(450, 50),
            new Coin(500, 75),
            new Coin(550, 100),
        ],
        [
            new Poison(600, 390),
            new Poison(880, 380),
            new Poison(1280, 380),
            new Poison(1590, 380),
            new Poison(1890, 380),
        ],
        level1Ending,
        level1Soundtrack,
    );    
}


