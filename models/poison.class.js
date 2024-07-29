/**
 * Represents a poison object in the game that can be collected by the player.
 * 
 * @class
 * @extends MovableObject
 */
class Poison extends MovableObject {
    height = 70;
    width = 60;
    collected = false;
    offset = {
        "x": 12.5,
        "y": 32,
        "h": -35,
        "w": -25,
    };
    IMAGES_POISON = [
        "img/4. Marcadores/Posión/Animada/1.png",
        "img/4. Marcadores/Posión/Animada/2.png",
        "img/4. Marcadores/Posión/Animada/3.png",
        "img/4. Marcadores/Posión/Animada/4.png",
        "img/4. Marcadores/Posión/Animada/5.png",
        "img/4. Marcadores/Posión/Animada/6.png",
        "img/4. Marcadores/Posión/Animada/7.png",
        "img/4. Marcadores/Posión/Animada/8.png",
    ];

    /**
     * Creates an instance of Poison.
     * 
     * @constructor
     * @param {number} x - The x-coordinate of the poison object.
     * @param {number} y - The y-coordinate of the poison object.
     */
    constructor(x, y) {
        super().loadImage("img/4. Marcadores/Posión/Animada/1.png");
        this.loadImages(this.IMAGES_POISON);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animates the poison object, cycling through its images.
     */
    animate() {
        this.animationPlay(this.IMAGES_POISON, 5);
    }
}
