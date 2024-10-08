/**
 * Represents the final boss enemy in the game.
 * 
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    IMAGES_FLOAT = [
        "img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "img/2.Enemy/3 Final Enemy/2.floating/13.png",
    ];
    IMAGES_INTRO = [
        "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ];
    IMAGES_ATTACK = [
        "img/2.Enemy/3 Final Enemy/Attack/1.png",
        "img/2.Enemy/3 Final Enemy/Attack/2.png",
        "img/2.Enemy/3 Final Enemy/Attack/3.png",
        "img/2.Enemy/3 Final Enemy/Attack/4.png",
        "img/2.Enemy/3 Final Enemy/Attack/5.png",
        "img/2.Enemy/3 Final Enemy/Attack/6.png",
    ];
    IMAGES_HURT = [
        "img/2.Enemy/3 Final Enemy/Hurt/1.png",
        "img/2.Enemy/3 Final Enemy/Hurt/2.png",
        "img/2.Enemy/3 Final Enemy/Hurt/3.png",
        "img/2.Enemy/3 Final Enemy/Hurt/4.png",
    ];
    IMAGES_FINAL_DEAD = [
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 5.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ];
    startPoint;
    offset = {
        "x": 25,
        "y": 220,
        "w": -64,
        "h": -270,
    };
    status = "wait";
    entered = false;
    index = 0;
    chooseStatus = 0;
    hit = false;
    world;

    /**
     * Creates an instance of Endboss.
     * 
     * @constructor
     * @param {number} levelEnding - The x-coordinate where the level ends.
     */
    constructor(levelEnding) {
        super().loadImage("img/2.Enemy/3 Final Enemy/2.floating/1.png");
        this.loadAllImages();
        this.height = 400;
        this.width = 400;
        this.x = levelEnding - 100;
        this.startPoint = this.x;
        this.type = "endboss";
        this.damage = "poison";
        this.currentImage = 0;
        this.animate();
    }

    /**
     * Loads all necessary images for the boss animations.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_FLOAT);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_FINAL_DEAD);
    }

    /**
     * Handles the boss's animation cycle.
     */
    animate() {
        let enbossInt = setInterval(() => {
            if (!this.isDead()) {
                this.animateWhenAlive();
            } else {
                this.animateWhenDead();
            }
        }, 1000 / 8);
        intervalIds.push(enbossInt);
    }

    /**
     * Animates the boss when alive, based on its status.
     */
    animateWhenAlive() {
        this.actingWhenWait();
        this.prepareForIntro();
        this.actingIntro();
        this.actingIdle();
        this.actingAttack();
        this.actingHurt();
        if (this.entered) {
            clearInterval(this.ambientMusic);
            this.world.musicSettings.boss_music.play();
        }
        if (this.world.character.energy <= 0) {
            this.world.musicSettings.boss_music.pause();
        }
    }

    /**
     * Sets the boss's position off-screen when waiting.
     */
    actingWhenWait() {
        if (this.status === "wait") {
            this.y = -500;
        }
    }

    /**
     * Prepares the boss for the intro animation when the player reaches the end of the level.
     */
    prepareForIntro() {
        if (this.world.character.x >= this.world.level.level_end_x - (this.width / 2) && !this.entered) {
            this.entered = true;
            this.status = "intro";
        }
    }

    /**
     * Animates the boss's intro sequence.
     */
    actingIntro() {
        if (this.status === "intro") {
            this.world.musicSettings.ambient_sound.pause();
            this.world.musicSettings.boss_laugh_sound.play();
            this.y = 0;
            this.offset.y = -200;
            this.endbossTransitionAnimation(this.IMAGES_INTRO);
        }
    }

    /**
     * Animates the boss's idle state.
     */
    actingIdle() {
        if (this.status === "idle") {
            this.animationPlay(this.IMAGES_FLOAT);
            this.offset.y = 190;
            this.chooseAttack();
            if (this.x < this.startPoint) {
                this.x += 20;
            }
        }
    }

    /**
     * Animates the boss's attack state.
     */
    actingAttack() {
        if (this.status === "attacking") {
            this.endbossTransitionAnimation(this.IMAGES_ATTACK);
            this.world.musicSettings.bite_sound.play();
            if (this.x > this.startPoint - 200) {
                this.x -= 30;
            }
        }
    }

    /**
     * Animates the boss's hurt state.
     */
    actingHurt() {
        if (this.status === "hurt" && !this.isDead()) {
            this.world.musicSettings.boss_hurt_sound.play();
            this.animationPlay(this.IMAGES_HURT);
        }
    }

    /**
     * Animates the boss's death sequence and triggers the victory sound.
     */
    animateWhenDead() {
        this.playWinningSound();
        this.actingWhenDead();
        victory();
    }

    /**
     * Plays the victory sound when the boss is defeated.
     */
    playWinningSound() {
        this.world.musicSettings.boss_music.pause();
        if (this.world.musicSettings.musicloop) {
            this.world.musicSettings.win_sound.play();
        }
        let winningSoundTo = setTimeout(() => {
            this.world.musicSettings.musicloop = false;
        }, 6000);
        intervalIds.push(winningSoundTo);
    }

    /**
     * Handles the boss's behavior when dead.
     */
    actingWhenDead() {
        this.status = "dead";
        this.dead = true;
        this.y += this.speed * 3;
        this.transitionAnimation(this.IMAGES_FINAL_DEAD, this.IMAGES_FINAL_DEAD[5]);
    }

    /**
     * Chooses the next action for the boss based on a timer.
     */
    interval() {
        if (this.index <= 25) {
            this.status = "idle";
        } else if (this.index >= 25) {
            this.status = "attacking";
        }
        if (this.index >= 50) {
            this.index = 0;
        }
        this.index++;
    }

    /**
     * Randomly chooses whether the boss should attack or idle.
     */
    chooseAttack() {
        this.chooseStatus = Math.random();
        if (this.chooseStatus > 0.95) {
            this.status = "attacking";
        } else {
            this.status = "idle";
        }
    }

    /**
     * Plays the transition animation for the boss.
     * 
     * @param {string[]} arr - An array of image paths for the animation.
     */
    endbossTransitionAnimation(arr) {
        if (this.currentImage > arr.length) {
            this.currentImage = 0;
        }
        let i = this.currentImage;
        let path = arr[i];
        this.img = this.imageCache[path];
        if (this.currentImage < arr.length) {
            this.currentImage++;
        }
        if (this.currentImage === arr.length) {
            this.status = "idle";
        }
    }
}
