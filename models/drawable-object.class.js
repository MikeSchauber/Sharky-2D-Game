/**
 * Represents a drawable object in the game.
 * 
 * @class
 */
class DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * 
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((src) => {
            let img = new Image();
            img.src = src;
            this.imageCache[src] = img;
        });
    }

    /**
     * Draws the object on the specified canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
