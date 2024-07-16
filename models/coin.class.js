class Coin extends MovableObject {

    height =  35;
    width = 35;

    IMAGES_COIN = [
        "img/4. Marcadores/1. Coins/1.png",
        "img/4. Marcadores/1. Coins/2.png",
        "img/4. Marcadores/1. Coins/3.png",
        "img/4. Marcadores/1. Coins/4.png",
    ];

    constructor(x, y) {
        super().loadImage("img/4. Marcadores/1. Coins/1.png");
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            this.animationPlay(this.IMAGES_COIN);
        }, 1000 / 3)
    }
}