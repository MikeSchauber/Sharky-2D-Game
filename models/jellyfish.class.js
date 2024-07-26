class Jellyfish extends MovableObject {
    width = 80;
    height = 100;
    color;
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

    PURPLE_DEAD = [
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
        "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
    ];
    YELLOW_DEAD = [
        "img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
        "img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
        "img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
        "img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
    ];
    GREEN_DEAD = [
        "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
        "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
        "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
        "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
    ];
    PINK_DEAD = [
        "img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
        "img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
        "img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
        "img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
    ];

    offset = {
        "x": 9,
        "y": 14,
        "h": -30,
        "w": -18,
    }

    constructor(x, color) {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
        this.loadAllImages();
        this.color = color;
        this.x = x
        this.damage = "electric";
        this.type = "jellyfish";
        this.y = Math.random() * 360
        this.setJellyfishColor(color);
    }

    loadAllImages() {
        this.loadImages(this.JELLY_PURPLE);
        this.loadImages(this.JELLY_YELLOW);
        this.loadImages(this.JELLY_GREEN);
        this.loadImages(this.JELLY_PINK);
        this.loadImages(this.YELLOW_DEAD);
        this.loadImages(this.PURPLE_DEAD);
        this.loadImages(this.GREEN_DEAD);
        this.loadImages(this.PINK_DEAD);
    }

    setJellyfishColor(color) {
        this.spawnYellowJellyfish(color);
        this.spawnPurpleJellyfish(color);
        this.spawnGreenJellyfish(color);
        this.spawnPinkJellyfish(color);
    }

    spawnYellowJellyfish(color) {
        if (color === "yellow") {
            this.animate(this.JELLY_YELLOW);
            this.moveUp();
        }
    }

    spawnPurpleJellyfish(color) {
        if (color === "lila") {
            this.animate(this.JELLY_PURPLE);
            this.moveUp();
        }
    }

    spawnGreenJellyfish(color) {
        if (color === "green") {
            this.animate(this.JELLY_GREEN);
            this.moveUp();
        }
    }

    spawnPinkJellyfish(color) {
        if (color === "pink") {
            this.animate(this.JELLY_PINK);
            this.moveUp();
        }
    }

    animate(arr) {
        setInterval(() => {
            this.animateWhenAlive(arr);
            this.animateWhenDead();

        }, 200);
    }

    animateWhenAlive(arr) {
        if (!this.dead) {
            this.animationPlay(arr);
            this.checkLevelEnd();
        }
    }

    animateWhenDead() {
        if (this.dead) {
            this.speed = 1;
            this.executeDeadAnimation();
        }
    }

    executeDeadAnimation() {
        if (this.color === "yellow") {
            this.animationPlay(this.YELLOW_DEAD);
        } else if (this.color === "green") {
            this.animationPlay(this.GREEN_DEAD);
        } else if (this.color === "pink") {
            this.animationPlay(this.PINK_DEAD);
        } else if (this.color === "lila") {
            this.animationPlay(this.PURPLE_DEAD);
        }
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