class Light extends MovableObject() {
    width = 500;
    height = 300;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 0 + this.width;
        this.y = 0 + this.height;
    }
}