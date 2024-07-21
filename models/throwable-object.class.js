class ThrowableObject extends MovableObject {
    height = 35;
    width = 35;

    constructor(x, y, path) {
        super().loadImage(path);
        this.x = x + 100; 
        this.y = y + 80;
        this.throw();
    }

        throw() {
            this.speed = 2;
            this.moveRight();
        }
}