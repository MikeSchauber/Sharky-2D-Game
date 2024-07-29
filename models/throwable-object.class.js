/**
 * Represents a throwable object in the game, which can be thrown by the player.
 * 
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    height = 35;
    width = 35;
    offset = {
        "x": 0,
        "y": 0,
        "w": -0,
        "h": -0,
    };
    hasHit = 1;
    startPosition;

    /**
     * Creates an instance of ThrowableObject.
     * 
     * @constructor
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {string} direction - The direction to throw the object, either "right" or "left".
     * @param {string} path - The image path for the throwable object.
     * @param {string} type - The type of the throwable object.
     */
    constructor(x, y, direction, path, type) {
        super().loadImage(path);
        this.speed = 4;
        this.type = type;
        this.startPosition = x;
        this.throw(x, y, direction);
    }

    /**
     * Throws the object in the specified direction.
     * 
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {string} direction - The direction to throw the object.
     */
    throw(x, y, direction) {
        if (direction === "right") {
            this.throwRightDirection(x, y);
        } else if (direction === "left") {
            this.throwLeftDirection(x, y);
        }
    }

    /**
     * Sets the position and movement for throwing the object to the right.
     * 
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    throwRightDirection(x, y) {
        this.x = x + 110;
        this.y = y + 80;
        this.moveRight();
    }

    /**
     * Sets the position and movement for throwing the object to the left.
     * 
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    throwLeftDirection(x, y) {
        this.x = x;
        this.y = y + 80;
        this.moveLeft();
    }
}
