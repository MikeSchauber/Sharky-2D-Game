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
    images = new CharacterImages();
    speed = 2;
    cameraRange = 0;
    cameraMovement = false;
    idleTimer = false;
    transitionImage = 0;
    timeoutId;
    timeoutStarted = false;
    attackImage = 0;
    attacking = false;
    attack = "";
    lastHit = 0;
    coins = 0;
    poison = 0;
    world;
    damagedBy;
    hitAble = true;

    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadAllImages();
        this.animate();
        this.applyGraviy();
    }

    loadAllImages() {
        this.loadImages(this.images.IMAGES_SWIM);
        this.loadImages(this.images.IMAGES_IDLE);
        this.loadImages(this.images.IMAGES_LONG_IDLE);
        this.loadImages(this.images.IMAGES_ELECTRIC_DAMAGE);
        this.loadImages(this.images.IMAGES_POISON_DAMAGE);
        this.loadImages(this.images.IMAGES_DEAD_ELECTRO);
        this.loadImages(this.images.IMAGES_DEAD_POISON);
        this.loadImages(this.images.IMAGES_FLIPPER_ATTACK);
        this.loadImages(this.images.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.images.IMAGES_SPECIAL_ATTACK);
    }

    animate() {
        this.animationFrame = () => {
            this.move();
            requestAnimationFrame(this.animationFrame);
        };
        let reqFrame = requestAnimationFrame(this.animationFrame);
        let characterInt = setInterval(() => {
            this.characterAnimation();
        }, 1000 / 8);
        intervalIds.push(characterInt);
        animationFrameIds.push(reqFrame);
    }

    characterAnimation() {
        if (!this.isDead()) {
            this.walkingAnimation();
            this.chooseCorrectAttack();
            this.startAttackAnimation();
            this.checkPositionLongidle();
            this.characterHitAnimation();
        } else {
            this.deadAnimation();
            gameover();
        }
    }

    chooseCorrectAttack() {
        if (this.world.keyboard.ONE && !this.attacking) {
            this.setFlipperAttack();
        }
        if (this.world.keyboard.TWO && !this.attacking) {
            this.setBubbleAttack();
        }
        if (this.world.keyboard.THREE && !this.attacking && this.poison > 0) {
            this.setSpecialAttack();
        } else if (this.world.keyboard.THREE && this.poison == 0) {
            this.world.musicSettings.error_sound.play();
        }
    }

    setFlipperAttack() {
        this.resetIdleTimer();
        this.attacking = true;
        this.attack = "flipper";
        this.world.musicSettings.punch_sound.play();
    }

    checkForFlipperDamage(type) {
        if (type === "pufferfish" && this.attacking) {
            this.hitAble = false;
        } else {
            this.hitAble = true;
        }
    }

    setBubbleAttack() {
        this.resetIdleTimer();
        this.attacking = true;
        this.attack = "bubble";
    }

    setSpecialAttack() {
        this.resetIdleTimer();
        this.attacking = true;
        this.attack = "special";
    }

    startAttackAnimation() {
        if (this.attacking) {
            if (this.attack === "flipper") {
                this.attackAnimation(this.images.IMAGES_FLIPPER_ATTACK);
            }
            if (this.attack === "bubble") {
                this.attackAnimation(this.images.IMAGES_BUBBLE_ATTACK, "bubble");
            }
            if (this.attack === "special" && this.poison > 0) {
                this.attackAnimation(this.images.IMAGES_SPECIAL_ATTACK, "special");
            }
        }
    }

    attackAnimation(arr, action) {
        let i = this.attackImage;
        let path = arr[i];
        this.img = this.imageCache[path];
        if (this.attackImage < arr.length) {
            this.attackImage++
        }
        if (this.attackImage === arr.length) {
            this.attacking = false;
            this.attackImage = 0;
            this.loadImage(this.images.IMAGES_IDLE[0]);
            this.bubbleShot(action);
            this.specialShot(action);
        }
    }

    bubbleShot(action) {
        if (action === "bubble") {
            this.throwBubble();
            this.world.musicSettings.bubble_shot.play();
        }
    }

    specialShot(action) {
        if (action === "special") {
            this.throwSpecial();
            this.checkPoisonDepot();
            this.world.musicSettings.poison_bubbleshot_sound.play();
        }
    }

    throwBubble() {
        let bubble
        if (this.leftDirection && !this.isDead()) {
            bubble = new ThrowableObject(this.x, this.y, "left", "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png", "bubble");
        } else {
            bubble = new ThrowableObject(this.x, this.y, "right", "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png", "bubble");
        }
        this.world.throwableObjects.push(bubble);
    }

    throwSpecial() {
        let poisonBubble;
        if (this.leftDirection && !this.isDead()) {
            poisonBubble = new ThrowableObject(this.x, this.y, "left", "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png", "poison");
        } else {
            poisonBubble = new ThrowableObject(this.x, this.y, "right", "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png", "poison");
        }
        this.world.throwableObjects.push(poisonBubble);
    }

    checkPoisonDepot() {
        this.poison -= this.world.poisonValue;
        this.world.bars[1].setPercentage(this.world.bars[1].IMAGES_POISON, this.poison);
    }

    characterHitAnimation() {
        if (this.isHit()) {
            if (this.damagedBy === "electric") {
                this.animationPlay(this.images.IMAGES_ELECTRIC_DAMAGE);
                this.world.musicSettings.electro_hitsound.play();
            } else if (this.hitAble) {
                this.animationPlay(this.images.IMAGES_POISON_DAMAGE);
                this.world.musicSettings.ouch_sound.play();
            }
            this.resetIdleTimer();
        }
    }

    walkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
            this.walking();
        } else if (!this.isAboveGround() && !this.idleTimer) {
            this.startLongidle();
        } else {
            this.floating();
        }
    }

    walking() {
        this.animationPlay(this.images.IMAGES_SWIM);
        this.world.musicSettings.walking_sound.play();
        this.resetIdleTimer();
    }

    startLongidle() {
        this.animationPlay(this.images.IMAGES_IDLE);
        this.world.musicSettings.walking_sound.pause();
        if (!this.timeoutStarted) {
            this.startIdleTimer();
        }
    }

    floating() {
        this.world.musicSettings.walking_sound.pause();
        this.loadImage(this.images.IMAGES_IDLE[0]);
    }

    checkPositionLongidle() {
        if (!this.isAboveGround() && this.idleTimer) {
            this.transitionAnimation(this.images.IMAGES_LONG_IDLE, this.images.IMAGES_SLEEP);
            this.offset.y = 100;
            this.world.musicSettings.snoring_sound.play();
        } else {
            this.offset.y = 80;
        }
    }

    resetIdleTimer() {
        clearTimeout(this.timeoutId);
        this.idleTimer = false;
        this.timeoutStarted = false;
    }

    startIdleTimer() {
        this.timeoutStarted = true;
        this.timeoutId = setTimeout(() => { this.idleTimer = true; }, 15000);
        timeoutIds.push(this.timeoutId);
    }

    deadAnimation() {
        this.deadByJelly();
        this.deadByPuffer();
        this.gameOverSound();
    }

    deadByJelly() {
        if (this.damagedBy === "electric") {
            this.transitionAnimation(this.images.IMAGES_DEAD_ELECTRO, this.images.IMAGES_DEAD_ELECTRO[9]);
            this.world.musicSettings.electrodeath_sound.play();
            let musicDeadTo = setTimeout(() => {
                this.world.musicSettings.electrodeath_sound.volume = 0;
            }, 1500);
            timeoutIds.push(musicDeadTo);
        }
    }

    deadByPuffer() {
        if (this.damagedBy === "poison") {
            this.transitionAnimation(this.images.IMAGES_DEAD_POISON, this.images.IMAGES_DEAD_POISON[11]);
        }
    }

    gameOverSound() {
        this.world.musicSettings.ambient_sound.pause();
        if (this.world.musicloop) {
            this.world.musicSettings.gameover_sound.play();
        }
        let musicloopTo = setTimeout(() => {
            this.world.musicloop = false;
        }, 5000);
        timeoutIds.push(musicloopTo);
    }

    move() {
        if (!this.isDead()) {
            this.swimRight();
            this.swimLeft();
            this.upAndDownPositioning();
        }
    }

    swimRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.setRightCameraRange();
            this.leftDirection = false;
        }
    }

    swimLeft() {
        if (this.world.keyboard.LEFT && this.x > this.leftEnd) {
            this.x -= this.speed;
            this.setLeftCameraRange();
            this.leftDirection = true;
        }
    }

    upAndDownPositioning() {
        if (this.world.keyboard.SPACE && this.y > this.upperEnd) {
            this.swimUp();
        } else if (this.y < this.upperEnd) {
            this.setUpperEnd();
        } else if (this.y > this.downEnd) {
            this.layOnGround();
        } else {
            this.upperDirection = false;
        }
    }

    swimUp() {
        if (this.speedY < 4) {
            this.speedY += this.accelerationY * 1.2;
        }
        this.upperDirection = true;
    }

    setUpperEnd() {
        this.y = this.upperEnd
        this.speedY = 0;
    }

    layOnGround() {
        this.speedY = 0;
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