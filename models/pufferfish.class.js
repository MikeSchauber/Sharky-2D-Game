/**
 * Represents a pufferfish enemy in the game, which can change states and cause poison damage.
 * 
 * @class
 * @extends MovableObject
 */
class Pufferfish extends MovableObject {
    height = 70;
    width = 85;
    range = 60;
    transitionImage = 0;
    IMAGES_SWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
    ];
    IMAGES_TRANSITION = [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
    ];
    IMAGES_BUBBLE_SWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
    ];
    IMAGES_DEAD = [
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png",
    ];
    offset;
    puffered = false;
    normal = true;
    animationInterval;
    animationState = 'swim';
    spliceable = false;

    /**
     * Creates an instance of Pufferfish.
     * 
     * @constructor
     * @param {number} x - The x-coordinate of the pufferfish.
     * @param {number} y - The y-coordinate of the pufferfish.
     */
    constructor(x, y) {
        super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
        this.loadAllImages();
        this.animate(x);
        this.x = x + Math.random() * this.range + this.range;
        this.y = y;
        this.speed = 2 * Math.random() + 0.5;
        this.damage = "poison";
        this.type = "pufferfish";
    }

    /**
     * Loads all necessary images for the pufferfish animations.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLE_SWIM);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Initiates the animation and movement for the pufferfish.
     * 
     * @param {number} position - The initial position of the pufferfish.
     */
    animate(position) {
        this.startAnimationLoop(position);
        this.moveLeft();
    }

    /**
     * Starts the animation loop for the pufferfish, cycling through different states.
     * 
     * @param {number} position - The initial position of the pufferfish.
     */
    startAnimationLoop(position) {
        let movementInt = setInterval(() => {
            this.checkMovementEnd(position);
        }, 1000 / 4);
        this.animationInterval = setInterval(() => {
            if (!this.dead) {
                this.executeAnimationState();
            } else {
                this.deathAnimation();
            }
        }, 1000 / 10);
        intervalIds.push(movementInt);
        intervalIds.push(this.animationInterval);
        this.switchAnimationState();
    }

    /**
     * Executes the current animation state of the pufferfish.
     */
    executeAnimationState() {
        if (this.animationState === 'swim') {
            this.animationPlay(this.IMAGES_SWIM);
            this.offsetNormal();
        } else if (this.animationState === 'transition') {
            this.transitionAnimation(this.IMAGES_TRANSITION, this.IMAGES_BUBBLE_SWIM);
            this.offsetPuffered();
        }
    }

    /**
     * Plays the death animation for the pufferfish.
     */
    deathAnimation() {
        this.transitionAnimation(this.IMAGES_DEAD, this.IMAGES_DEAD[2]);
        this.y += 3;
    }

    /**
     * Switches the animation state of the pufferfish after a set duration.
     */
    switchAnimationState() {
        let transitionTo = setTimeout(() => {
            this.animationState = 'transition';
        }, 10000);
        let swimTo = setTimeout(() => {
            clearInterval(this.animationInterval);
            this.animationState = 'swim';
            this.startAnimationLoop();
        }, 20000);
        timeoutIds.push(transitionTo);
        timeoutIds.push(swimTo);
    }

    /**
     * Sets the offset for the normal state of the pufferfish.
     */
    offsetNormal() {
        this.offset = {
            "x": 2,
            "y": 7,
            "h": -30,
            "w": -20,
        };
    }

    /**
     * Sets the offset for the puffered state of the pufferfish.
     */
    offsetPuffered() {
        this.offset = {
            "x": 0,
            "y": 0,
            "h": -0,
            "w": -10,
        };
    }

    /**
     * Checks if the pufferfish has reached the end of its movement range.
     * 
     * @param {number} position - The initial position to compare with.
     */
    checkMovementEnd(position) {
        if (this.x < position - this.range) {
            this.swimLeft();
        }
        if (this.x > position + this.range) {
            this.swimRight();
        }
    }

    /**
     * Makes the pufferfish swim to the left.
     */
    swimLeft() {
        this.speed = -2 * Math.random() + 0.5;
        this.leftDirection = true;
    }

    /**
     * Makes the pufferfish swim to the right.
     */
    swimRight() {
        this.speed = 2 * Math.random() + 0.5;
        this.leftDirection = false;
    }

    /**
     * Starts the dead animation, making the pufferfish sink.
     */
    startDeadAnimation() {
        setTimeout(() => {
            this.spliceable = true;
        }, 2000);
    }
}
