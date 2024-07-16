class Pufferfish extends MovableObject {
    height = 70;
    width = 85;
    movementY = false;
    IMAGES_SWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
    ];
    IMAGES_BUBBLE_SWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
    ];
    IMAGES_TRANSITION = [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
    ];

    constructor(x, y) {
        super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.animate(this.IMAGES_SWIM);
        this.x = x;
        this.y = y;

    }

    animate() {
        this.animationPlay(this.IMAGES_SWIM, 8);
    }
}