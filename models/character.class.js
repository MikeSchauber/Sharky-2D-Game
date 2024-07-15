class Character extends MovableObject {
    x = 150;
    y = 250;
    height = 160;
    width = 140;
    speed = 2;
    cameraRange = 0;
    cameraMovement = false;
    IMAGES_SWIM = [
        "img/1.Sharkie/3.Swim/1.png",
        "img/1.Sharkie/3.Swim/2.png",
        "img/1.Sharkie/3.Swim/3.png",
        "img/1.Sharkie/3.Swim/4.png",
        "img/1.Sharkie/3.Swim/5.png",
        "img/1.Sharkie/3.Swim/6.png",
    ];
    world;
    walking_sound = new Audio("audio/swim Sound.mp3");

    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.animate();
    }

    animate() {
        this.animationFrame = () => {
            this.move();
            requestAnimationFrame(this.animationFrame);
        };

        requestAnimationFrame(this.animationFrame);

        setInterval(() => {
            this.moveAnimation();
        }, 1000 / 5);
    }


    setRightCameraRange() {
        if (this.cameraRange < 188 && this.cameraRange >= 0) {
            this.cameraRange += 2;
        }
        this.movingCamera();
    }

    setLeftCameraRange() {
        if (this.cameraRange <= 188 && this.cameraRange > 0) {
            this.cameraRange -= 2;
        }
        this.movingCamera();
    }

    movingCamera() {
        if (this.cameraRange === 0) {
            this.world.camera_x = -this.x + 96;
        }
        if (this.cameraRange === 188) {
            this.world.camera_x = -this.x + this.cameraRange + 100;
        }
    }

    move() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.setRightCameraRange();
            this.leftDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > -500) {
            this.x -= this.speed;
            this.setLeftCameraRange();
            this.leftDirection = true;
        }
        if (this.world.keyboard.UP && this.y > -70) {
            this.y -= this.speed;
        }
        if (this.world.keyboard.DOWN && this.y < 320) {
            this.y += this.speed;
        }
    }

    moveAnimation() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.animationPlay(this.IMAGES_SWIM);
            this.walking_sound.play();
            this.walking_sound.volume = 0.3;
        }
    }

}