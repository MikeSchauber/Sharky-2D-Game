class Light extends MovableObject {
    width = 600;
    height = 380;
    y = 0

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = 720 - this.width;
    }
}