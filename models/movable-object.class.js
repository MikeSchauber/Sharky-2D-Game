/**
 * Represents a movable object in the game, capable of animation and interaction with the environment.
 * 
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    leftEnd = -500;
    upperEnd = -70;
    downEnd = 325;
    fps = 60;
    speed = 1;
    leftDirection = false;
    upperDirection = false;
    speedY = 0;
    speedX = 0;
    accelerationY = 0.05;
    energy = 100;
    alive = true;
    damage;
    type;
    dead = false;
    transitionImage = 0;

    /**
     * Applies gravity to the object, making it fall if not grounded.
     */
    applyGraviy() {
        let gravityInt = setInterval(() => {
            if ((this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY * 0.8;
                if (this.speedY < -1) {
                    this.speedY = -1;
                }
            }
        }, 1000 / 60);
        intervalIds.push(gravityInt);
    }

    /**
     * Checks if the object is above ground level.
     * 
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        return this.y < this.downEnd;
    }

    /**
     * Draws a border around the object, primarily for debugging purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawBorder(ctx) {
        if (this.checkForInstances()) {
            if (this.offset) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = "blue";
                ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width + this.offset.w, this.height + this.offset.h);
                ctx.stroke();
            }
        }
    }

    /**
     * Checks if the object is an instance of specific classes.
     * 
     * @returns {boolean} True if the object is an instance of one of the specified classes, false otherwise.
     */
    checkForInstances() {
        return this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Endboss || this instanceof Poison || this instanceof Coin || this instanceof ThrowableObject;
    }

    /**
     * Checks if the object is colliding with another object.
     * 
     * @param {MovableObject} obj - The object to check for collision.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        if (this.offset && obj.offset) {
            const thisLeft = this.x + this.offset.x;
            const thisRight = thisLeft + this.width + this.offset.w;
            const thisTop = this.y + this.offset.y;
            const thisBottom = thisTop + this.height + this.offset.h;
            const objLeft = obj.x + obj.offset.x;
            const objRight = objLeft + obj.width + obj.offset.w;
            const objTop = obj.y + obj.offset.y;
            const objBottom = objTop + obj.height + obj.offset.h;
            return thisRight >= objLeft &&
                thisLeft <= objRight &&
                thisBottom >= objTop &&
                thisTop <= objBottom;
        }
        return false;
    }

    /**
     * Increases the coin count when a coin is collected.
     */
    collectCoin() {
        if (this.coins < 100) {
            this.coins += world.coinValue;
        }
    }

    /**
     * Increases the poison count when a poison item is collected.
     */
    collectPoison() {
        if (this.poison < 100) {
            this.poison += world.poisonValue;
        }
    }

    /**
     * Reduces the object's energy when it takes a hit.
     */
    hit() {
        if (this.energy > 0) {
            this.energy -= 2;
        }
        this.lastHit = new Date().getTime();
        world.bars[0].setLifeInStatusbar(world, this.energy);
    }

    /**
     * Marks the object as dead.
     */
    eliminate() {
        this.dead = true;
    }

    /**
     * Recovers the object's energy over time if it is not fully depleted.
     */
    isntHit() {
        if (this.energy <= 99.9) {
            this.recoverEnergy(this.energy);
        }
    }

    /**
     * Recovers a small amount of energy.
     * 
     * @param {number} e - The current energy level.
     */
    recoverEnergy(e) {
        if (e > 0.1) {
            e += 0.0025;
        } else {
            e = 0;
        }
    }

    /**
     * Checks if the object has been hit recently.
     * 
     * @returns {boolean} True if the object was hit recently, false otherwise.
     */
    isHit() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 300;
    }

    /**
     * Checks if the object's energy is depleted, indicating it is dead.
     * 
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays an animation sequence from a given array of images.
     * 
     * @param {string[]} IMAGE_ARRAY - The array of image paths for the animation.
     * @param {number} [speed] - Optional speed to play the animation.
     */
    animationPlay(IMAGE_ARRAY, speed) {
        if (speed) {
            this.speed = speed;
            this.playSpecialSpeed(IMAGE_ARRAY);
        } else {
            this.playClassSpeed(IMAGE_ARRAY);
        }
    }

    /**
     * Plays the animation at a specified speed.
     * 
     * @param {string[]} IMAGE_ARRAY - The array of image paths for the animation.
     */
    playSpecialSpeed(IMAGE_ARRAY) {
        let specialAnimationInt = setInterval(() => {
            let i = this.currentImage % IMAGE_ARRAY.length;
            let path = IMAGE_ARRAY[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / this.speed);
        intervalIds.push(specialAnimationInt);
    }

    /**
     * Plays the animation at the default class speed.
     * 
     * @param {string[]} IMAGE_ARRAY - The array of image paths for the animation.
     */
    playClassSpeed(IMAGE_ARRAY) {
        let i = this.currentImage % IMAGE_ARRAY.length;
        let path = IMAGE_ARRAY[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays a transition animation and then switches to the next animation.
     * 
     * @param {string[]} transition - The array of image paths for the transition animation.
     * @param {string|string[]} nextAnimation - The next animation to play, either as an array of image paths or a single image path.
     */
    transitionAnimation(transition, nextAnimation) {
        if (this.transitionImage > transition.length) {
            this.transitionImage = 0;
        }
        this.playTransition(transition);
        this.introduceTransition(transition, nextAnimation);
    }

    /**
     * Plays the transition animation.
     * 
     * @param {string[]} transition - The array of image paths for the transition animation.
     */
    playTransition(transition) {
        let i = this.transitionImage;
        let path = transition[i];
        this.img = this.imageCache[path];
    }

    /**
     * Introduces the next animation after the transition.
     * 
     * @param {string[]} transition - The array of image paths for the transition animation.
     * @param {string|string[]} nextAnimation - The next animation to play.
     */
    introduceTransition(transition, nextAnimation) {
        if (this.transitionImage < transition.length) {
            this.transitionImage++;
        } else if (this.checkNextAnimation(nextAnimation)) {
            this.animationPlay(nextAnimation);
        } else if (typeof nextAnimation === 'string') {
            this.loadImage(nextAnimation);
        }
    }

    /**
     * Checks if the next animation is an array or not a string.
     * 
     * @param {string|string[]} nextAnimation - The next animation to play.
     * @returns {boolean} True if the next animation is an array or not a string, false otherwise.
     */
    checkNextAnimation(nextAnimation) {
        return Array.isArray(nextAnimation) || typeof nextAnimation !== 'string';
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        let leftInt = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / this.fps);
        intervalIds.push(leftInt);
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        let rightInt = setInterval(() => {
            this.x += this.speed;
        }, 1000 / this.fps);
        intervalIds.push(rightInt);
    }

    /**
     * Moves the object up.
     */
    moveUp() {
        let upInt = setInterval(() => {
            this.y -= this.speed;
        }, 1000 / this.fps);
        intervalIds.push(upInt);
    }

    /**
     * Moves the object down.
     */
    moveDown() {
        let downInt = setInterval(() => {
            this.y += this.speed;
        }, 1000 / this.fps);
        intervalIds.push(downInt);
    }
}
