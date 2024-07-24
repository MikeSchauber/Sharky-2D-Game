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
    transitionImage = 0;
    puffered = false;
    normal = true;
    animationInterval;
    animationState = 'swim';

    constructor(x, y) {
        super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLE_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.animate(x);
        this.x = x + Math.random() * this.range + this.range;
        this.y = y;
        this.speed = 1;
        this.damage = "poison";
        this.type = "pufferfish";
    }

    animate(position) {
        this.startAnimationLoop(position);
        this.moveLeft();
    }

    startAnimationLoop(position) {
        this.animationInterval = setInterval(() => {
            this.checkMovementEnd(position);
            if (!this.dead) {
                if (this.animationState === 'swim') {
                    this.animationPlay(this.IMAGES_SWIM);
                    this.offsetNormal();
                } else if (this.animationState === 'transition') {
                    this.transitionAnimation(this.IMAGES_TRANSITION, this.IMAGES_BUBBLE_SWIM);
                    this.offsetPuffered();
                }
            }
            if (this.dead) {
                this.transitionAnimation(this.IMAGES_DEAD, this.IMAGES_DEAD[2]);
                this.y += 3;
            }
        }, 1000 / 8);

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
            this.speed = -1.5 * Math.random();
            this.leftDirection = true;
        }
        if (this.x > position + this.range) {
            this.speed = 1 * Math.random();
            this.leftDirection = false;
        }
    }
}