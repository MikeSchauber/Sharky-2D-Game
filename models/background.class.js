class BackgroundObject extends MovableObject {

    constructor(imagePath, x, w, h) {
        super().loadImage(imagePath);
        this.height = h;
        this.x = x;
        this.y = 480 - this.height;
        this.width = w;
    }
}