/**
 * Represents the main character in the game.
 * 
 * @class
 * @extends MovableObject
 */
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

    /**
     * Creates an instance of Character.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage("img/1.Sharkie/1.IDLE/1.png");
        this.loadAllImages();
        this.animate();
        this.applyGraviy();
    }

    /**
     * Loads all images for character animations.
     */
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

    /**
     * Initiates the character animation loop.
     */
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

    /**
     * Controls the character's animations based on its state.
     */
    characterAnimation() {
        if (!this.isDead() && !this.isEndbossDead()) {
            this.walkingAnimation();
            this.chooseCorrectAttack();
            this.startAttackAnimation();
            this.checkPositionLongidle();
            this.characterHitAnimation();
        } else if (this.isDead()) {
            this.deadAnimation();
            gameover();
        }
    }

    /**
     * Chooses the correct attack based on user input.
     */
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

    /**
     * Sets the flipper attack mode.
     */
    setFlipperAttack() {
        this.resetIdleTimer();
        this.attacking = true;
        this.attack = "flipper";
        this.world.musicSettings.punch_sound.play();
    }

    /**
     * Checks if flipper attack should cause damage.
     * 
     * @param {string} type - The type of object to check for damage.
     */
    checkForFlipperDamage(type) {
        if (type === "pufferfish" && this.attacking) {
            this.hitAble = false;
        } else {
            this.hitAble = true;
        }
    }

    /**
     * Sets the bubble attack mode.
     */
    setBubbleAttack() {
        this.resetIdleTimer();
        this.attacking = true;
        this.attack = "bubble";
    }

    /**
     * Sets the special attack mode.
     */
    setSpecialAttack() {
        this.resetIdleTimer();
        this.attacking = true;
        this.attack = "special";
    }

    /**
     * Starts the appropriate attack animation based on the current attack type.
     */
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

    /**
     * Executes the animation sequence for an attack.
     * 
     * @param {string[]} arr - Array of image paths for the animation.
     * @param {string} [action] - Optional action type for special behaviors.
     */
    attackAnimation(arr, action) {
        let i = this.attackImage;
        let path = arr[i];
        this.img = this.imageCache[path];
        if (this.attackImage < arr.length) {
            this.attackImage++;
        }
        if (this.attackImage === arr.length) {
            this.attacking = false;
            this.attackImage = 0;
            this.loadImage(this.images.IMAGES_IDLE[0]);
            this.bubbleShot(action);
            this.specialShot(action);
        }
    }

    /**
     * Handles the bubble shot during the bubble attack.
     * 
     * @param {string} action - The action type, specifically "bubble" in this case.
     */
    bubbleShot(action) {
        if (action === "bubble") {
            this.throwBubble();
            this.world.musicSettings.bubble_shot.play();
        }
    }

    /**
     * Handles the special shot during the special attack.
     * 
     * @param {string} action - The action type, specifically "special" in this case.
     */
    specialShot(action) {
        if (action === "special") {
            this.throwSpecial();
            this.checkPoisonDepot();
            this.world.musicSettings.poison_bubbleshot_sound.play();
        }
    }

    /**
     * Throws a bubble during the bubble attack.
     */
    throwBubble() {
        let bubble;
        if (this.leftDirection && !this.isDead()) {
            bubble = new ThrowableObject(this.x, this.y, "left", "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png", "bubble");
        } else {
            bubble = new ThrowableObject(this.x, this.y, "right", "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png", "bubble");
        }
        this.world.throwableObjects.push(bubble);
    }

    /**
     * Throws a special (poison) bubble during the special attack.
     */
    throwSpecial() {
        let poisonBubble;
        if (this.leftDirection && !this.isDead()) {
            poisonBubble = new ThrowableObject(this.x, this.y, "left", "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png", "poison");
        } else {
            poisonBubble = new ThrowableObject(this.x, this.y, "right", "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png", "poison");
        }
        this.world.throwableObjects.push(poisonBubble);
    }

    /**
     * Reduces the poison level after using the special attack.
     */
    checkPoisonDepot() {
        this.poison -= this.world.poisonValue;
        this.world.bars[1].setPercentage(this.world.bars[1].IMAGES_POISON, this.poison);
    }

    /**
     * Executes the character's hit animation based on the damage type.
     */
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

    /**
     * Executes the walking animation and associated sound effects.
     */
    walkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
            this.walking();
        } else if (!this.isAboveGround() && !this.idleTimer) {
            this.startLongidle();
        } else {
            this.floating();
        }
    }

    /**
     * Plays the walking animation and sound effects.
     */
    walking() {
        this.animationPlay(this.images.IMAGES_SWIM);
        this.world.musicSettings.walking_sound.play();
        this.resetIdleTimer();
    }

    /**
     * Starts the long idle animation.
     */
    startLongidle() {
        this.animationPlay(this.images.IMAGES_IDLE);
        this.world.musicSettings.walking_sound.pause();
        if (!this.timeoutStarted) {
            this.startIdleTimer();
        }
    }

    /**
     * Plays the floating animation.
     */
    floating() {
        this.world.musicSettings.walking_sound.pause();
        this.loadImage(this.images.IMAGES_IDLE[0]);
    }

    /**
     * Checks and sets the position for the long idle animation.
     */
    checkPositionLongidle() {
        if (!this.isAboveGround() && this.idleTimer) {
            this.transitionAnimation(this.images.IMAGES_LONG_IDLE, this.images.IMAGES_SLEEP);
            this.offset.y = 100;
            this.world.musicSettings.snoring_sound.play();
        } else {
            this.offset.y = 80;
        }
    }

    /**
     * Resets the idle timer.
     */
    resetIdleTimer() {
        clearTimeout(this.timeoutId);
        this.idleTimer = false;
        this.timeoutStarted = false;
    }

    /**
     * Starts the idle timer, triggering the long idle animation if no action is taken.
     */
    startIdleTimer() {
        this.timeoutStarted = true;
        this.timeoutId = setTimeout(() => { this.idleTimer = true; }, 15000);
        timeoutIds.push(this.timeoutId);
    }

    /**
     * Plays the death animation and triggers the game over sequence.
     */
    deadAnimation() {
        this.deadByJelly();
        this.deadByPuffer();
        this.gameOverSound();
    }

    /**
     * Plays the death animation for electric damage.
     */
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

    /**
     * Plays the death animation for poison damage.
     */
    deadByPuffer() {
        if (this.damagedBy === "poison") {
            this.transitionAnimation(this.images.IMAGES_DEAD_POISON, this.images.IMAGES_DEAD_POISON[11]);
        }
    }

    /**
     * Plays the game over sound effects.
     */
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

    /**
     * Controls the character's movement.
     */
    move() {
        if (!this.isDead() && !this.isEndbossDead()) {
            this.swimRight();
            this.swimLeft();
            this.upAndDownPositioning();
        }
    }

    /**
     * Checks if the end boss is dead.
     * 
     * @returns {boolean} - True if the end boss is dead, false otherwise.
     */
    isEndbossDead() {
        return this.world.level.enemies[this.world.level.enemies.length - 1].dead;
    }

    /**
     * Moves the character to the right.
     */
    swimRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.setRightCameraRange();
            this.leftDirection = false;
        }
    }

    /**
     * Moves the character to the left.
     */
    swimLeft() {
        if (this.world.keyboard.LEFT && this.x > this.leftEnd) {
            this.x -= this.speed;
            this.setLeftCameraRange();
            this.leftDirection = true;
        }
    }

    /**
     * Adjusts the character's position vertically.
     */
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

    /**
     * Makes the character swim up.
     */
    swimUp() {
        if (this.speedY < 2) {
            this.speedY += this.accelerationY * 2;
        }
        this.upperDirection = true;
    }

    /**
     * Sets the character's upper limit position.
     */
    setUpperEnd() {
        this.y = this.upperEnd;
        this.speedY = 0;
    }

    /**
     * Stops the character's movement on the ground.
     */
    layOnGround() {
        this.speedY = 0;
    }

    /**
     * Adjusts the camera range to the right.
     */
    setRightCameraRange() {
        if (this.cameraRange < 188 && this.cameraRange >= 0) {
            this.cameraRange += this.speed;
        }
        this.movingCamera();
    }

    /**
     * Adjusts the camera range to the left.
     */
    setLeftCameraRange() {
        if (this.cameraRange <= 188 && this.cameraRange > 0) {
            this.cameraRange -= this.speed;
        }
        this.movingCamera();
    }

    /**
     * Updates the camera position based on the character's position.
     */
    movingCamera() {
        if (this.cameraRange === 0) {
            this.world.camera_x = -this.x + 100;
        }
        if (this.cameraRange === 188) {
            this.world.camera_x = -this.x + 288;
        }
    }
}
