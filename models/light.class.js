/**
 * Represents a light object in the game, which can be moved and rendered.
 * 
 * @class
 * @extends MovableObject
 */
class Light extends MovableObject {
    width = 600;
    height = 310;
    y = -50;

    /**
     * Creates an instance of Light.
     * 
     * @constructor
     * @param {string} imagePath - The path to the image representing the light.
     * @param {number} x - The x-coordinate of the light object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
