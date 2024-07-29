/**
 * Represents a level in the game, containing enemies, objects, and environmental details.
 * 
 * @class
 */
class Level {
    enemies;
    backgroundObjects;
    frontgroundObjects;
    middlegroundObjects;
    lights;
    level_end_x;
    coins;
    poison;
    levelSoundtrack;

    /**
     * Creates an instance of Level.
     * 
     * @constructor
     * @param {Array} enemies - The enemies present in the level.
     * @param {Array} frontgroundObjects - The objects in the frontground of the level.
     * @param {Array} middlegroundObjects - The objects in the middleground of the level.
     * @param {Array} backgroundObjects - The objects in the background of the level.
     * @param {Array} lights - The lighting effects in the level.
     * @param {Array} coins - The coins available in the level.
     * @param {Array} poison - The poison items in the level.
     * @param {number} levelEnd - The x-coordinate marking the end of the level.
     */
    constructor(enemies, frontgroundObjects, middlegroundObjects, backgroundObjects, lights, coins, poison, levelEnd) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.frontgroundObjects = frontgroundObjects; 
        this.middlegroundObjects = middlegroundObjects;
        this.lights = lights;
        this.level_end_x = levelEnd;
        this.coins = coins;
        this.poison = poison;
    }
}
