class Light extends MovableObject {
    width = 600;
    height = 380;
    y = 0

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x
    }
}