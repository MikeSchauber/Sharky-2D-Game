class Character extends MovableObject {
    x = 50;
    y = 200;
    height = 160;
    width = 140;
    speed = 4;
    IMAGES_SWIM = [
       "img/1.Sharkie/3.Swim/1.png",
       "img/1.Sharkie/3.Swim/2.png",
       "img/1.Sharkie/3.Swim/3.png",
       "img/1.Sharkie/3.Swim/4.png",
       "img/1.Sharkie/3.Swim/5.png",
       "img/1.Sharkie/3.Swim/6.png",
    ];
    world;

    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.move();
        }, 1000 / this.fps)
        setInterval(() => {
            this.spriteAnimation();
        }, 1000 / 8);
    }

    move() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.leftDirection = false;
        } 
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.leftDirection = true;
        }
        if (this.world.keyboard.UP) {
            this.y -= this.speed;
        } 
        if (this.world.keyboard.DOWN) {
            this.y += this.speed;
        }
        this.world.camera_x = -this.x + 100;
        // this.world.expandDynamicWorld();
    }

    spriteAnimation() {
        if (this.world.keyboard.RIGHT) {
            this.spriteAnimationStay();
        }
        if (this.world.keyboard.LEFT) {
            this.spriteAnimationStay();
        }
        if (this.world.keyboard.UP) {
            this.spriteAnimationStay();
        }
        if (this.world.keyboard.DOWN) {
            this.spriteAnimationStay();
        }
    }

    spriteAnimationStay() {
        let i = this.currentImage % this.IMAGES_SWIM.length
        let path = this.IMAGES_SWIM[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }
}