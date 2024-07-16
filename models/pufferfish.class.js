class Pufferfish extends MovableObject {
    height = 70;
    width = 85;
    range = 60;
    movementY = false;
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
    IMAGES_TRANSITION_BACKWARDS = [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    ];
    IMAGES_BUBBLE_SWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
    ];

    constructor(x, y) {
        super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLE_SWIM);
        this.animate(x);
        this.x = x + Math.random() * this.range + this.range;
        this.y = y;
        this.speed = 1;
    }

    animate(position) {
        this.timingFunction();
        setInterval(() => {
            this.checkMovementEnd(position);
        }, 1000 / this.fps);
        this.moveLeft();
    }

    timingFunction() {
        let animation = setInterval(this.pufferAnimationPlay(this.IMAGES_SWIM), 1000 / 8);
        animation;
        setTimeout(() => {
            clearInterval(animation);
            animation = setInterval(this.pufferAnimationPlay(this.IMAGES_TRANSITION), 1000 / 8);
        }, 3000);
        setTimeout(() => {
            clearInterval(animation);
            animation = setInterval(this.pufferAnimationPlay(this.IMAGES_BUBBLE_SWIM), 1000 / 8);
        }, 4000);
        setTimeout(() => {
            clearInterval(animation);
            animation = setInterval(this.pufferAnimationPlay(this.IMAGES_TRANSITION_BACKWARDS), 1000 / 8);
        }, 9000);
        setTimeout(() => {
            animation = setInterval(this.pufferAnimationPlay(this.IMAGES_SWIM), 1000 / 8);
            this.timingFunction();
        }, 10000)
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

    pufferAnimationPlay(IMAGE_ARRAY) {
        let i = this.currentImage % IMAGE_ARRAY.length;
        let path = IMAGE_ARRAY[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }
}