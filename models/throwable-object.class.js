class ThrowableObject extends MovableObject {
    height = 35;
    width = 35;

    constructor(x, y, direction, path) {
        super().loadImage(path);
        this.speed = 2;
        this.throw(x, y, direction);
    }

        throw(x, y, direction) {
            console.log(direction);
            if (direction === "right") {
                this.x = x + 100; 
                this.y = y + 80;
                this.moveRight();
            } else if (direction === "left") {
                this.x = x; 
                this.y = y + 80;
                this.moveLeft();
            }
        }
}