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

    constructor(x, y) {
        super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
        this.loadAllImages();
        this.animate(x);
        this.x = x + Math.random() * this.range + this.range;
        this.y = y;
        this.speed = 2 * Math.random() + 0.5
        this.damage = "poison";
        this.type = "pufferfish";
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLE_SWIM);
        this.loadImages(this.IMAGES_DEAD);
    }

    animate(position) {
        this.startAnimationLoop(position);
        this.moveLeft();
    }

    startAnimationLoop(position) {
        setInterval(() => {
            this.checkMovementEnd(position);
        }, 1000 / 4)
        this.animationInterval = setInterval(() => {
            if (!this.dead) {
                this.executeAnimationState();
            } else {
                this.deathAnimation();
            }
        }, 1000 / 10);
        this.switchAnimationState();
    }

    executeAnimationState() {
        if (this.animationState === 'swim') {
            this.animationPlay(this.IMAGES_SWIM);
            this.offsetNormal();
        } else if (this.animationState === 'transition') {
            this.transitionAnimation(this.IMAGES_TRANSITION, this.IMAGES_BUBBLE_SWIM);
            this.offsetPuffered();
        }
    }

    deathAnimation() {
        this.transitionAnimation(this.IMAGES_DEAD, this.IMAGES_DEAD[2]);
        this.y += 3;
    }

    switchAnimationState() {
        setTimeout(() => {
            this.animationState = 'transition';
        }, 10000);
        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.animationState = 'swim';
            this.startAnimationLoop();
        }, 20000);
    }

    offsetNormal() {
        this.offset = {
            "x": 2,
            "y": 7,
            "h": -30,
            "w": -20,
        }
    }

    offsetPuffered() {
        this.offset = {
            "x": 0,
            "y": 0,
            "h": -0,
            "w": -10,
        }
    }

    checkMovementEnd(position) {
        if (this.x < position - this.range) {
            this.swimLeft();
        }
        if (this.x > position + this.range) {
            this.swimRight();
        }
    }

    swimLeft() {
        this.speed = -2 * Math.random() + 0.5;
        this.leftDirection = true;
    }

    swimRight() {
        this.speed = 2 * Math.random() + 0.5;
        this.leftDirection = false;
    }
}