class Endboss extends MovableObject {
    IMAGES_FLOAT = [
        "img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "img/2.Enemy/3 Final Enemy/2.floating/13.png",
    ];
    IMAGES_INTRO = [
        "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ];
    IMAGES_ATTACK = [
        "img/2.Enemy/3 Final Enemy/Attack/1.png",
        "img/2.Enemy/3 Final Enemy/Attack/2.png",
        "img/2.Enemy/3 Final Enemy/Attack/3.png",
        "img/2.Enemy/3 Final Enemy/Attack/4.png",
        "img/2.Enemy/3 Final Enemy/Attack/5.png",
        "img/2.Enemy/3 Final Enemy/Attack/6.png",
    ];
    IMAGES_HURT = [
        "img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "img/2.Enemy/3 Final Enemy/Hurt/4.png",
    ];
    IMAGES_DEAD = [
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ];
    offset = {
        "x": 25,
        "y": 185,
        "w": -64,
        "h": -255,
    };
    status = "wait";
    entered = false;

    constructor() {
        super().loadImage("img/2.Enemy/3 Final Enemy/2.floating/1.png");
        this.loadImages(this.IMAGES_FLOAT);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.height = 400;
        this.width = 400;
        this.x = 2250;
        this.type = "endboss";
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.status === "wait") {
                this.y = -500;
            }
            if (this.status === "intro") {
                this.y = 0;
                this.transitionAnimation(this.IMAGES_INTRO, this.IMAGES_FLOAT);
            }
            if (this.status === "idle") {
                this.animationPlay(this.IMAGES_FLOAT);
                this.y = 0;
            }
            if (this.entered) {
                // this.endboss_music.play();
            }
        }, 1000 / 8);
    }


}