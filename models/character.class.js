class Character extends MovableObject {
    x = 100;
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
    IMAGES_IDLE = [
        "img/1.Sharkie/1.IDLE/1.png",
        "img/1.Sharkie/1.IDLE/2.png",
        "img/1.Sharkie/1.IDLE/3.png",
        "img/1.Sharkie/1.IDLE/4.png",
        "img/1.Sharkie/1.IDLE/5.png",
        "img/1.Sharkie/1.IDLE/6.png",
        "img/1.Sharkie/1.IDLE/7.png",
        "img/1.Sharkie/1.IDLE/8.png",
        "img/1.Sharkie/1.IDLE/9.png",
        "img/1.Sharkie/1.IDLE/10.png",
        "img/1.Sharkie/1.IDLE/11.png",
        "img/1.Sharkie/1.IDLE/12.png",
        "img/1.Sharkie/1.IDLE/13.png",
        "img/1.Sharkie/1.IDLE/14.png",
        "img/1.Sharkie/1.IDLE/15.png",
        "img/1.Sharkie/1.IDLE/16.png",
        "img/1.Sharkie/1.IDLE/17.png",
        "img/1.Sharkie/1.IDLE/18.png",
    ];
    world;
    walking_sound = new Audio("audio/swim Sound.mp3");

    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.walking_sound.volume = 0.6;
    }

    animate() {
        this.animationFrame = () => {
            this.move();
            requestAnimationFrame(this.animationFrame);
        };
        requestAnimationFrame(this.animationFrame);
        setInterval(() => {
            this.moveAnimation();
        }, 1000 / 8);
    }


    setRightCameraRange() {
        if (this.cameraRange < 188 && this.cameraRange >= 0) {
            this.cameraRange += this.speed;
        }
        this.movingCamera();
    }

    setLeftCameraRange() {
        if (this.cameraRange <= 188 && this.cameraRange > 0) {
            this.cameraRange -= this.speed;
        }
        this.movingCamera();
    }

    movingCamera() {
        if (this.cameraRange === 0) {
            this.world.camera_x = -this.x + 100;
        }
        if (this.cameraRange === 188) {
            this.world.camera_x = -this.x + 288;
        }

    }

    moveAnimation() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.characterAnimation(this.IMAGES_SWIM);
            this.walking_sound.play();
        } else {
            this.characterAnimation(this.IMAGES_IDLE);
            this.walking_sound.pause();
        }
    }

    move() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.setRightCameraRange();
            this.leftDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > this.leftEnd) {
            this.x -= this.speed;
            this.setLeftCameraRange();
            this.leftDirection = true;
        }
        if (this.world.keyboard.UP && this.y > this.upperEnd) {
            this.y -= this.speed;
            this.upperDirection = true;
        } else {
            this.upperDirection = false;
        }
        if (this.world.keyboard.DOWN && this.y < this.downEnd) {
            this.y += this.speed;
            this.downDirection = true;
        } else {
            this.downDirection = false;
        }

    }

    characterAnimation(IMAGE_ARRAY) {
        let i = this.currentImage % IMAGE_ARRAY.length;
        let path = IMAGE_ARRAY[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

}