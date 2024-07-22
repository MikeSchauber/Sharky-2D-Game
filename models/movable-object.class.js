class MovableObject extends DrawableObject {
    leftEnd = -500;
    upperEnd = -70;
    downEnd = 325;
    fps = 60;
    speed = 1;
    leftDirection = false;
    upperDirection = false;
    speedY = 0;
    speedX = 0;
    accelerationX = 0.03;
    accelerationY = 0.025;
    energy = 100;
    alive = true;
    damage;

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
        if (this.offset && obj.offset) {
            const thisLeft = this.x + this.offset.x;
            const thisRight = thisLeft + this.width + this.offset.w;
            const thisTop = this.y + this.offset.y;
            const thisBottom = thisTop + this.height + this.offset.h;
            const objLeft = obj.x + obj.offset.x;
            const objRight = objLeft + obj.width + obj.offset.w;
            const objTop = obj.y + obj.offset.y;
            const objBottom = objTop + obj.height + obj.offset.h;
            return thisRight >= objLeft &&
                thisLeft <= objRight &&
                thisBottom >= objTop &&
                thisTop <= objBottom;
        }
        return false;
    }

    collectCoin() {
        if (this.coins < 100) {
            this.coins += world.coinValue;
        }
    }

    collectPoison() {
        if (this.poison < 100) {
            this.poison += world.poisonValue;
        }
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 1;
        }
        this.lastHit = new Date().getTime();
        world.bars[0].setLifeInStatusbar(world, this.energy);
    }

    isntHit() {
        if (this.energy <= 99.9) {
            if (this.energy > 0.1) {
                this.energy += 0.005;
            } else {
                this.energy = 0;
            }
        }
    }

    isHit() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 300;
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
        if (this.transitionImage < arr.length) {
            this.transitionImage++;
        }
        if (this.transitionImage === arr.length && typeof arr2 != "string") {
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

    moveRight() {
        setInterval(() => {
            this.x += this.speed
        }, 1000 / this.fps)
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed
        }, 1000 / this.fps)
    }

}