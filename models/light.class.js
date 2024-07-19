class Light extends MovableObject {
    width = 600;
    height = 310;
    y = -50;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x
    }
}