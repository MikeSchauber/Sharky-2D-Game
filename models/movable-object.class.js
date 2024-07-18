class MovableObject {
    x = 0;
    y = 0;
    leftEnd = -500;
    upperEnd = -70;
    downEnd = 325;
    fps = 60;
    speed = 1;
    img;
    imageCache = {};
    width = 720;
    height = 480;
    currentImage = 0;
    leftDirection = false;
    upperDirection = false;
    downDirection = false;
    speedY = 0;
    speedX = 0;
    accelerationX = 0.03;
    accelerationY = 0.03;
    energy = 100;
    alive = true;

    applyGraviy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < this.downEnd;
    }

    /**
     * 
     * @param {Array} arr = ["img/image1.png", "img/image2.png", ...];
     */
    loadImages(arr) {
        arr.forEach((src) => {
            let img = new Image();
            img.src = src
            this.imageCache[src] = img;
        });
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Endboss || this instanceof Poison || this instanceof Coin) {
            if (this.offset) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = "blue";
                ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width + this.offset.w, this.height + this.offset.h);
                ctx.stroke();
            }
        }
    }

    isColliding(obj) {
        if (this.offset) {
            return this.x + this.offset.x + this.width + this.offset.w >= obj.x &&
                this.x + this.offset.x <= obj.x + obj.width &&
                this.y + this.offset.y + this.height + this.offset.h >= obj.y &&
                this.y + this.offset.y <= obj.y + obj.height;
        }
    }

    getRightBarIndex(energy, bar) {
        if (bar === "life") {
            if (energy <= 100 && energy >= 85) {
                return 5;
            } else if (energy <= 85 && energy >= 65) {
                return 4;
            } else if (energy <= 65 && energy >= 40) {
                return 3;
            } else if (energy <= 40 && energy >= 20) {
                return 2;
            } else if (energy <= 20 && energy >= 10) {
                return 1;
            } else if (energy <= 10 && energy >= 0 || energy < 0) {
                return 0;
            }
        }
    }

    hit() {
        this.isHurt = true;
        if (this.energy > 0) {
            this.energy -= 1;
            this.world.bars[0] = new Bar("life", 0, this.getRightBarIndex(this.energy, "life"));
            this.world.setWorld();
        }
    }

    isntHit() {
        if (this.energy <= 99.9) {
            if (this.energy > 0.1) {
                this.energy += 0.05;
                this.world.bars[0] = new Bar("life", 0, this.getRightBarIndex(this.energy, "life"));
                this.world.setWorld();
            }
        }
        setTimeout(() => {
            this.isHurt = false;
        }, 2970);
    }

    isHit() {
        return this.isHurt;
    }

    isDead() {
        return this.energy <= 0;
    }

    animationPlay(IMAGE_ARRAY, speed) {
        if (speed) {
            this.speed = speed;
            setInterval(() => {
                let i = this.currentImage % IMAGE_ARRAY.length;
                let path = IMAGE_ARRAY[i];
                this.img = this.imageCache[path];
                this.currentImage++
            }, 1000 / this.speed);
        } else {
            let i = this.currentImage % IMAGE_ARRAY.length;
            let path = IMAGE_ARRAY[i];
            this.img = this.imageCache[path];
            this.currentImage++
        }
    }

    transitionAnimation(arr, arr2) {
        let i = this.transitionImage;
        let path = arr[i];
        this.img = this.imageCache[path];
        if (this.transitionImage < arr.length - 1) {
            this.transitionImage++;
        }
        if (this.transitionImage === arr.length - 1 && typeof arr2 != "string") {
            this.animationPlay(arr2);
        }
        if (this.transitionImage === arr.length && typeof arr2 == "string") {
            this.loadImage(arr2);
        }
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / this.fps)
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed
        }, 1000 / this.fps)
    }

}