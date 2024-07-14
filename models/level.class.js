class Level {
    enemies;
    backgroundObjects;
    lights;
    level_end_x;

    constructor(enemies, backgroundObjects, lights, levelEnd) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.lights = lights;
        this.level_end_x = levelEnd;
    }
}