class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 150;
    width = 150;
    offset = {
        "x": 40,
        "y": 80,
        "w": -74,
        "h": -120,
    };
    speed = 2;
    cameraRange = 0;
    cameraMovement = false;
    idleTimer = false;
    transitionImage = 0;
    timeoutId;
    timeoutStarted = false;
    poisonBubble = false;
    attackImage = 0;
    attacking = false;
    attack = "";
    lastHit = 0;
    coins = 0;
    poison = 0;
    world;
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
    IMAGES_LONG_IDLE = [
        "img/1.Sharkie/2.Long_IDLE/I1.png",
        "img/1.Sharkie/2.Long_IDLE/I2.png",
        "img/1.Sharkie/2.Long_IDLE/I3.png",
        "img/1.Sharkie/2.Long_IDLE/I4.png",
        "img/1.Sharkie/2.Long_IDLE/I5.png",
        "img/1.Sharkie/2.Long_IDLE/I6.png",
        "img/1.Sharkie/2.Long_IDLE/I7.png",
        "img/1.Sharkie/2.Long_IDLE/I8.png",
        "img/1.Sharkie/2.Long_IDLE/I9.png",
        "img/1.Sharkie/2.Long_IDLE/I10.png",
        "img/1.Sharkie/2.Long_IDLE/I11.png",
        "img/1.Sharkie/2.Long_IDLE/I12.png",
        "img/1.Sharkie/2.Long_IDLE/I13.png",
        "img/1.Sharkie/2.Long_IDLE/I14.png",
    ];
    IMAGES_SLEEP = [
        "img/1.Sharkie/2.Long_IDLE/I11.png",
        "img/1.Sharkie/2.Long_IDLE/I12.png",
        "img/1.Sharkie/2.Long_IDLE/I13.png",
        "img/1.Sharkie/2.Long_IDLE/I14.png",
    ];
    IMAGES_ELECTRIC_DAMAGE = [
        "img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
        "img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
        "img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
    ];
    IMAGES_POISON_DAMAGE = [
        "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
        "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    ];
    IMAGES_DEAD_ELECTRO = [
        "img/1.Sharkie/6.dead/2.Electro_shock/1.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/2.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/3.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/4.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/5.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/6.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/7.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/8.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/9.png",
        "img/1.Sharkie/6.dead/2.Electro_shock/10.png",
    ];
    IMAGES_DEAD_POISON = [
        "img/1.Sharkie/6.dead/1.Poisoned/1.png",
        "img/1.Sharkie/6.dead/1.Poisoned/2.png",
        "img/1.Sharkie/6.dead/1.Poisoned/3.png",
        "img/1.Sharkie/6.dead/1.Poisoned/4.png",
        "img/1.Sharkie/6.dead/1.Poisoned/5.png",
        "img/1.Sharkie/6.dead/1.Poisoned/6.png",
        "img/1.Sharkie/6.dead/1.Poisoned/7.png",
        "img/1.Sharkie/6.dead/1.Poisoned/8.png",
        "img/1.Sharkie/6.dead/1.Poisoned/9.png",
        "img/1.Sharkie/6.dead/1.Poisoned/10.png",
        "img/1.Sharkie/6.dead/1.Poisoned/11.png",
        "img/1.Sharkie/6.dead/1.Poisoned/12.png",
    ];
    IMAGES_FLIPPER_ATTACK = [
        "img/1.Sharkie/4.Attack/Fin slap/1.png",
        "img/1.Sharkie/4.Attack/Fin slap/2.png",
        "img/1.Sharkie/4.Attack/Fin slap/3.png",
        "img/1.Sharkie/4.Attack/Fin slap/4.png",
        "img/1.Sharkie/4.Attack/Fin slap/5.png",
        "img/1.Sharkie/4.Attack/Fin slap/6.png",
        "img/1.Sharkie/4.Attack/Fin slap/7.png",
        "img/1.Sharkie/4.Attack/Fin slap/8.png",
    ];
    IMAGES_BUBBLE_ATTACK = [
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
        "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
    ];
    IMAGES_SPECIAL_ATTACK = [
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
        "img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
    ];
    damagedBy;

    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_ELECTRIC_DAMAGE);
        this.loadImages(this.IMAGES_POISON_DAMAGE);
        this.loadImages(this.IMAGES_DEAD_ELECTRO);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_FLIPPER_ATTACK);
        this.loadImage(this.IMAGES_BUBBLE_ATTACK);
        this.loadImage(this.IMAGES_SPECIAL_ATTACK);
        this.animate();
        this.applyGraviy();
    }

    animate() {
        this.animationFrame = () => {
            this.move();
            requestAnimationFrame(this.animationFrame);
        };
        requestAnimationFrame(this.animationFrame);
        setInterval(() => {
            if (!this.isDead()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
                    this.animationPlay(this.IMAGES_SWIM);
                    this.world.walking_sound.play();
                    this.resetIdleTimer();
                } else if (!this.isAboveGround() && !this.idleTimer) {
                    this.animationPlay(this.IMAGES_IDLE);
                    this.world.walking_sound.pause();
                    if (!this.timeoutStarted) {
                        this.startIdleTimer();
                    }
                } else {
                    this.world.walking_sound.pause();
                    this.loadImage(this.IMAGES_IDLE[0]);
                }
                if (this.world.keyboard.ONE && !this.attacking) {
                    this.resetIdleTimer();
                    this.attacking = true;
                    this.attack = "flipper";
                }
                if (this.world.keyboard.ONE && !this.attacking) {

                }
                if (this.attacking) {
                    if (this.attack = "flipper") {
                        this.attackAnimation(this.IMAGES_FLIPPER_ATTACK);
                    }
                }
                if (!this.isAboveGround() && this.idleTimer) {
                    this.transitionAnimation(this.IMAGES_LONG_IDLE, this.IMAGES_SLEEP);
                    this.offset.y = 100;
                } else {
                    this.offset.y = 80;
                }
                if (this.isHit()) {
                    if (this.damagedBy === "electric") {
                        this.animationPlay(this.IMAGES_ELECTRIC_DAMAGE);
                        this.world.electro_hitsound.play();
                    } else {
                        this.animationPlay(this.IMAGES_POISON_DAMAGE);
                        this.world.ouch_sound.play();
                    }
                    this.resetIdleTimer();
                }
            } else {
                if (this.damagedBy === "electric") {
                    this.transitionAnimation(this.IMAGES_DEAD_ELECTRO, this.IMAGES_DEAD_ELECTRO[9]);
                }
                if (this.damagedBy === "poison") {
                    this.transitionAnimation(this.IMAGES_DEAD_POISON, this.IMAGES_DEAD_POISON[11]);
                } else {
                    this.transitionAnimation(this.IMAGES_DEAD_POISON, this.IMAGES_DEAD_POISON[11]);
                }
            }
        }, 1000 / 8);
    }

    attackAnimation(arr) {
        let i = this.attackImage;
        let path = arr[i];
        this.img = this.imageCache[path];
        if (this.attackImage < arr.length) {
            this.attackImage++
        }
        if (this.attackImage === arr.length) {
            this.attacking = false;
            this.attackImage = 0;
            this.loadImage(this.IMAGES_IDLE[0]);
        }
    }

    resetIdleTimer() {
        clearTimeout(this.timeoutId);
        this.idleTimer = false;
        this.timeoutStarted = false;
    }

    startIdleTimer() {
        this.timeoutStarted = true;
        this.timeoutId = setTimeout(() => {
            this.idleTimer = true;
        }, 7000);
    }

    move() {
        if (!this.isDead()) {
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
            if (this.world.keyboard.SPACE && this.y > this.upperEnd) {
                this.speedY += this.accelerationY * 3;
                this.upperDirection = true;
            } else if (this.y < this.upperEnd) {
                this.y = this.upperEnd
                this.speedY = 0;
            } else if (this.y > this.downEnd) {
                this.speedY = 0;
            } else if (this.world.keyboard.SPACE && this.speedY < 0) {
                this.speedY = 0;
            } else {
                this.upperDirection = false;
            }
        }
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
}