class Level {
    bars
    enemies;
    backgroundObjects;
    lights;
    level_end_x;
    coins;
    poison;
    levelSoundtrack;
    world;

    constructor(bars, enemies, backgroundObjects, lights,  coins, poison, levelEnd, levelSoundtrack) {
        this.bars = bars;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.lights = lights;
        this.level_end_x = levelEnd;
        this.coins = coins;
        this.poison = poison;
        this.levelSoundtrack = levelSoundtrack;
    }
}