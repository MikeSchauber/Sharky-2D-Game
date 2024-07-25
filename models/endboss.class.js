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
    IMAGES_FINAL_DEAD = [
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 5.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ];
    startPoint;
    offset = {
        "x": 25,
        "y": 220,
        "w": -64,
        "h": -270,
    };
    status = "wait";
    entered = false;
    index = 0;
    chooseStatus = 0;
    hit = false;
    type = "endboss";
    world;


    constructor(levelEnding) {
        super().loadImage("img/2.Enemy/3 Final Enemy/2.floating/1.png");
        this.loadImages(this.IMAGES_FLOAT);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_FINAL_DEAD);
        this.height = 400;
        this.width = 400;
        this.x = levelEnding - 100;
        this.startPoint = this.x;
        this.type = "endboss";
        this.currentImage = 0;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                if (this.status === "wait") {
                    this.y = -500;
                }
                if (this.world.character.x >= this.world.level.level_end_x - (this.width / 2) && !this.entered) {
                    this.entered = true;
                    this.status = "intro";
                }
                if (this.status === "intro") {
                    this.world.ambient_sound.pause();
                    this.world.boss_laugh_sound.play();
                    this.y = 0;
                    this.offset.y = -200;
                    this.endbossTransitionAnimation(this.IMAGES_INTRO);
                }
                if (this.status === "idle") {
                    this.animationPlay(this.IMAGES_FLOAT);
                    this.offset.y = 190;
                    this.chooseAttack();
                    if (this.x < this.startPoint) {
                        this.x += 20;
                    }
                }
                if (this.status === "attacking") {
                    this.endbossTransitionAnimation(this.IMAGES_ATTACK);
                    this.world.bite_sound.play();
                    if (this.x > this.startPoint - 200) {
                        this.x -= 30;
                    }
                }
                if (this.status === "hurt" && !this.isDead()) {
                    this.world.boss_hurt_sound.play();
                    this.animationPlay(this.IMAGES_HURT);
                }
                if (this.entered) {
                    clearInterval(this.ambientMusic);
                    this.world.boss_music.play();
                }
            } else {
                this.world.boss_music.pause();
                if (this.world.musicloop) {
                    this.world.win_sound.play();
                }
                setTimeout(() => {
                    this.world.musicloop = false;
                }, 6000);
                this.status = "dead";
                this.dead = true;
                this.y += this.speed;
                this.transitionAnimation(this.IMAGES_FINAL_DEAD, this.IMAGES_FINAL_DEAD[5]);
                // this.gameover();
            }
            console.log(this.status);
        }, 1000 / 8);
    }

    interval() {
        console.log(this.index);
        if (this.index <= 25) {
            this.status = "idle";
        } else if (this.index >= 25) {
            this.status = "attacking";
        }
        if (this.index >= 50) {
            this.index = 0;
        }
        this.index++;
    }

    chooseAttack() {
        this.chooseStatus = Math.random();
        if (this.chooseStatus > 0.95) {
            this.status = "attacking";
        } else {
            this.status = "idle";
        }
    }

    endbossTransitionAnimation(arr) {
        if (this.currentImage > arr.length) {
            this.currentImage = 0;
        }
        let i = this.currentImage;
        let path = arr[i];
        this.img = this.imageCache[path];
        if (this.currentImage < arr.length) {
            this.currentImage++;
        }
        if (this.currentImage === arr.length) {
            this.status = "idle";
        }
    }
}