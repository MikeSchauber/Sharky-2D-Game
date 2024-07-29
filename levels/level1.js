let level1;
const level1Ending = 3600;

/**
 * Initializes the first level of the game, setting up enemies, background, lights, coins, and poison.
 */
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
            new Pufferfish(1700, 150),
            new Pufferfish(2200, 350),
            new Pufferfish(2700, 250),
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
        ],
        [
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 2, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 3, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 4, 720, 400, 0.2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 5, 720, 400, 0.2),
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
        ],
        [
            new Light("img/3. Background/Layers/1. Light/1.png", 0),
            new Light("img/3. Background/Layers/1. Light/2.png", 600),
        ],
        [
            new Coin(400, 180),
            new Coin(600, 150),
            new Coin(800, 180),
            new Coin(1200, 160),
            new Coin(1300, 140),
            new Coin(1800, 120),
            new Coin(2100, 150),
            new Coin(2400, 170),
            new Coin(2700, 130),
            new Coin(3000, 180),
        ],
        [
            new Poison(-450, 335),
            new Poison(500, 135),
            new Poison(1250, 300),
            new Poison(1750, 150),
            new Poison(2250, 350),
            new Poison(2750, 250),
        ],
        level1Ending,
    );
}
