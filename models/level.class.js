class Level {
    enemies;
    backgroundObjects;
    lights;
    level_end_x = 810;

    constructor(enemies, backgroundObjects, lights) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.lights = lights;
    }
}