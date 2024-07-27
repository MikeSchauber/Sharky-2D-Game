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
    accelerationY = 0.05;
    energy = 100;
    alive = true;
    damage;
    type;
    dead = false;
    transitionImage = 0;

    applyGraviy() {
        setInterval(() => {
            if ((this.isAboveGround() || this.speedY > 0)) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
                if (this.speedY < -2) {
                    this.speedY = -2;
                }
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < this.downEnd;
    }

    drawBorder(ctx) {
        if (this.checkForInstances()) {
            if (this.offset) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = "blue";
                ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width + this.offset.w, this.height + this.offset.h);
                ctx.stroke();
            }
        }
    }
    checkForInstances() {
        return this instanceof Character || this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Endboss || this instanceof Poison || this instanceof Coin || this instanceof ThrowableObject
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
            this.energy -= 2;
        }
        this.lastHit = new Date().getTime();
        world.bars[0].setLifeInStatusbar(world, this.energy);
    }

    eliminate() {
        this.dead = true;
    }

    isntHit() {
        if (this.energy <= 99.9) {
            this.recoverEnergy(this.energy);
        }
    }

    recoverEnergy(e) {
        if (e > 0.1) {
            e += 0.0025;
        } else {
            e = 0;
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
            this.playSpecialSpeed(IMAGE_ARRAY);
        } else {
            this.playClassSpeed(IMAGE_ARRAY);
        }
    }

    playSpecialSpeed(IMAGE_ARRAY) {
        setInterval(() => {
            let i = this.currentImage % IMAGE_ARRAY.length;
            let path = IMAGE_ARRAY[i];
            this.img = this.imageCache[path];
            this.currentImage++
        }, 1000 / this.speed);
    }

    playClassSpeed(IMAGE_ARRAY) {
        let i = this.currentImage % IMAGE_ARRAY.length;
        let path = IMAGE_ARRAY[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    transitionAnimation(transition, nextAnimation) {
        if (this.transitionImage > transition.length) {
            this.transitionImage = 0;
        }
        this.playTransition(transition);
        this.introduceTransition(transition, nextAnimation);
    }

    playTransition(transition) {
        let i = this.transitionImage;
        let path = transition[i];
        this.img = this.imageCache[path];
    }

    introduceTransition(transition, nextAnimation) {
        if (this.transitionImage < transition.length) {
            this.transitionImage++;
        } else if (this.checkNextAnimation(nextAnimation)) {
            this.animationPlay(nextAnimation);
        } else if (typeof nextAnimation === 'string') {
            this.loadImage(nextAnimation);
        }
    }

    checkNextAnimation(nextAnimation) {
        return Array.isArray(nextAnimation) || typeof nextAnimation !== 'string'
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

    moveDown() {
        setInterval(() => {
            this.y += this.speed
        }, 1000 / this.fps)
    }

}