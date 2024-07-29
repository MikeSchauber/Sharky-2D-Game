/**
 * Represents a background object in the game.
 * 
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    /**
     * Creates an instance of BackgroundObject.
     * 
     * @constructor
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The x-coordinate of the background object.
     * @param {number} w - The width of the background object.
     * @param {number} h - The height of the background object.
     */
    constructor(imagePath, x, w, h) {
        super().loadImage(imagePath);
        this.height = h;
        this.width = w;
        this.x = x;
        this.y = 480 - this.height;
    }
}
