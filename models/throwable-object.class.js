class ThrowableObject extends MovableObject {
    height = 35;
    width = 35;
    offset = {
        "x": 0,
        "y": 0,
        "w": -0,
        "h": -0,
    };

    constructor(x, y, direction, path, type) {
        super().loadImage(path);
        this.speed = 4;
        this.type = type
        this.throw(x, y, direction);
    }

        throw(x, y, direction) {
            if (direction === "right") {
                this.x = x + 110; 
                this.y = y + 80;
                this.moveRight();
            } else if (direction === "left") {
                this.x = x; 
                this.y = y + 80;
                this.moveLeft();
            }
        }
}