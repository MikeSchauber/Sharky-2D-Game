class Level {
    enemies;
    backgroundObjects;
    lights;
    level_end_x;
    levelSoundtrack;

    constructor(enemies, backgroundObjects, lights, levelEnd, levelSoundtrack) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.lights = lights;
        this.level_end_x = levelEnd;
        this.levelSoundtrack = levelSoundtrack;
    }
}