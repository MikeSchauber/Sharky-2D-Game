class Jellyfish extends MovableObject {
    width = 65;
    height = 80;
    JELLY_PURPLE = [
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ];
    JELLY_YELLOW = [
        "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"
    ];
    JELLY_GREEN = [
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
    ];
    JELLY_PINK = [
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
    ];
    constructor(x, color) {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
        this.x = x
        this.y = Math.random() * 360
        this.setJellyfishColor(color);
    }

    setJellyfishColor(color) {
        if (color === "yellow") {
            this.loadImages(this.JELLY_YELLOW);
            this.animate(this.JELLY_YELLOW);
            this.moveUp();
        }
        if (color === "lila") {
            this.loadImages(this.JELLY_PURPLE);
            this.animate(this.JELLY_PURPLE);
            this.moveUp();
        }
        if (color === "green") {
            this.loadImages(this.JELLY_GREEN);
            this.animate(this.JELLY_GREEN);
            this.moveUp();
        }
        if (color === "pink") {
            this.loadImages(this.JELLY_PINK);
            this.animate(this.JELLY_PINK);
            this.moveUp();
        }
    }

    animate(arr) {
        this.animationPlay(arr, 5);
        this.speed = 0.5 + Math.random() * 1;
        setInterval(() => {
            this.checkLevelEnd();
        }, 1000 / this.fps)
    }

    checkLevelEnd() {
        if (this.y < 12) {
            this.speed = -1 + Math.random() * 1;
        } 
        if (this.y > 370) {
            this.speed = 0.5 + Math.random() * 1;
        }
    }
}