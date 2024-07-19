class Level {
    enemies;
    backgroundObjects;
    lights;
    level_end_x;
    coins;
    poison;
    levelSoundtrack;
    world;

    constructor(enemies, backgroundObjects, lights, poison, levelEnd, levelSoundtrack) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.lights = lights;
        this.level_end_x = levelEnd;
        this.coins = coins;
        this.poison = poison;
        this.levelSoundtrack = levelSoundtrack;
    }
}