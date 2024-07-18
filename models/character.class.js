class Character extends MovableObject {
    x = 100;
    y = 150;
    height = 150;
    width = 150;
    speed = 2;
    cameraRange = 0;
    cameraMovement = false;
    idleTimer = false;
    transitionImage = 0;
    timeoutId;
    timeoutStarted = false;
    isHurt = false;
    offset = {
        "x": 35,
        "y": 70,
        "w": -64,
        "h": -105,
    };
    world;
    walking_sound = new Audio("audio/swim Sound.mp3");
    hit_sound = new Audio("audio/hit.mp3");
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
    IMAGES_HURT = [
        "img/1.Sharkie/5.Hurt/2.Electric shock/o1.png",
        "img/1.Sharkie/5.Hurt/2.Electric shock/o2.png",
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

    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD_ELECTRO);
        this.animate();
        this.applyGraviy();
        this.walking_sound.volume = 0.6;
        this.hit_sound.volume = 0.6;
    }

    animate() {
        this.animationFrame = () => {
            this.move();
            requestAnimationFrame(this.animationFrame);
        };
        requestAnimationFrame(this.animationFrame);
        setInterval(() => {
            if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP) && !this.isDead()) {
                clearTimeout(this.timeoutId);
                this.animationPlay(this.IMAGES_SWIM);
                this.walking_sound.play();
                this.idleTimer = false;
                this.idleImage = 0;
                this.timeoutStarted = false;
            } else if (!this.isAboveGround() && !this.idleTimer && !this.isDead()) {
                this.animationPlay(this.IMAGES_IDLE);
                this.walking_sound.pause();
                if (!this.timeoutStarted) {
                    this.startIdleTimer();
                    this.timeoutStarted = true;
                }
            } else {
                this.walking_sound.pause();
            }
            if (!this.isAboveGround() && this.idleTimer && !this.isDead()) {
                this.transitionAnimation(this.IMAGES_LONG_IDLE, this.IMAGES_SLEEP);
            }
            if (this.isHit() && !this.isDead()) {
                this.animationPlay(this.IMAGES_HURT);
                this.hit_sound.play();
            } 
            if (this.isDead()) {
                this.transitionAnimation(this.IMAGES_DEAD_ELECTRO, this.IMAGES_DEAD_ELECTRO[9]);
            }
        }, 1000 / 8);
    }

    startIdleTimer() {
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
            if (this.world.keyboard.UP && this.y > this.upperEnd) {
                this.speedY += this.accelerationY * 2;
                this.upperDirection = true;
            } else if (this.y < this.upperEnd) {
                this.y = this.upperEnd
                this.speedY = 0;
            } else if (this.y > this.downEnd) {
                this.speedY = 0;
            } else if (this.world.keyboard.UP && this.speedY < 0) {
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