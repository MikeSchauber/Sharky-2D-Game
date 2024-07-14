class JellyFish extends MovableObject {
    width = 65;
    height = 80;

    IMAGES_PURPLE = [
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ];
    constructor(x) {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png")
        this.x = x
        this.y = Math.random() * 360
        this.swimAnimation();
        this.loadImages(this.IMAGES_PURPLE);
        this.animate();
    }

    animate() {
        this.moveUp();
        setInterval(() => {
            this.animationPlay(this.IMAGES_PURPLE);
        }, 1000 / 5)
    }

    swimAnimation() {
        this.speed = 0.5 + Math.random() * 1;
        setInterval(() => {
            this.checkLevelEnd();
        }, 1000 / this.fps)
    }

    checkLevelEnd() {
        if (this.y < 12) {
            this.speed = -1 + Math.random() * 1;
        } if (this.y > 370) {
            this.speed = 0.5 + Math.random() * 1;
        }
    }
}