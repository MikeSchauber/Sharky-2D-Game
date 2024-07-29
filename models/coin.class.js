/**
 * Represents a coin in the game, which can be collected by the player.
 * 
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 35;
    width = 35;
    offset = {
        "x": 0,
        "y": 0,
        "h": 0,
        "w": 0,
    };
    index = 0;
    collected = false;
    IMAGES_COIN = [
        "img/4. Marcadores/1. Coins/1.png",
        "img/4. Marcadores/1. Coins/2.png",
        "img/4. Marcadores/1. Coins/3.png",
        "img/4. Marcadores/1. Coins/4.png",
    ];

    /**
     * Creates an instance of Coin.
     * 
     * @constructor
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     * @param {number} index - The index of the coin in a collection or array.
     */
    constructor(x, y, index) {
        super().loadImage("img/4. Marcadores/1. Coins/1.png");
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.x = x;
        this.y = y;
        this.index = index;
    }

    /**
     * Animates the coin by cycling through its images.
     */
    animate() {
        this.animationPlay(this.IMAGES_COIN, 3);
    }
}
