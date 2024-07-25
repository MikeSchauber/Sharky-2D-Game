class Level {
    enemies;
    backgroundObjects;
    lights;
    level_end_x;
    coins;
    poison;
    levelSoundtrack;

    constructor(enemies, frontgroundObjects, middlegroundObjects, backgroundObjects, lights, coins, poison, levelEnd, levelSoundtrack) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.frontgroundObjects = frontgroundObjects; 
        this.middlegroundObjects = middlegroundObjects;
        this.lights = lights;
        this.level_end_x = levelEnd;
        this.coins = coins;
        this.poison = poison;
        this.levelSoundtrack = levelSoundtrack;
    }
}