class Coin extends MovableObject {
    height = 35;
    width = 35;
    offset = {
        "x": 0,
        "y": 0,
        "h": 0,
        "w": 0,
    }
    index = 0;
    collected = false;
    IMAGES_COIN = [
        "img/4. Marcadores/1. Coins/1.png",
        "img/4. Marcadores/1. Coins/2.png",
        "img/4. Marcadores/1. Coins/3.png",
        "img/4. Marcadores/1. Coins/4.png",
    ];

    constructor(x, y, index) {
        super().loadImage("img/4. Marcadores/1. Coins/1.png");
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.x = x;
        this.y = y;
        this.index = index;
    }

    animate() {
        this.animationPlay(this.IMAGES_COIN, 3);
    }
}