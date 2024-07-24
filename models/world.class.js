class World {
    bars = [
        new Bar("life", 5),
        new Bar("poison", 0),
        new Bar("coin", 0),
    ];
    character = new Character();
    throwableObjects = [];
    level = level1;
    coinValue = 0;
    poisonValue = 0;
    soundtrack;
    ambient_sound;
    coin_sound;
    poison_collect_sound;
    poison_bubbleshot_sound;
    electrodeath_sound;
    walking_sound;
    electro_hitsound;
    error_sound;
    bubble_shot;
    ouch_sound;
    snoring_sound;
    punch_sound;
    rotation = 5;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    musicVolume = 0.7;
    effectVolume = 0.5;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coinValue = 100 / this.level.coins.length;
        this.poisonValue = 100 / this.level.poison.length;
        this.setSounds();
        this.setEffectVolume();
        // this.soundtrack.play();
        // this.ambient_sound.play();
        this.draw();
        this.setWorld();
        this.run();
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjectsRange();
        }, 50);
    }

    checkThrowableObjectsRange() {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach((object, i) => {
                if (object.x >= this.level.level_end_x + 350) {
                    this.throwableObjects.splice(i, 1);
                }
            });
        }
    }

    checkCollisions() {
        this.checkCharacterDamage();
        this.checkCharacterCoins();
        this.checkCharacterPoison();
        this.checkThrowableObjects();
    }

    checkCharacterDamage() {
        this.level.enemies.forEach((enemy, i) => {
            this.executeCharacterDamage(enemy, i);
        });
    }

    executeCharacterDamage(enemy, i) {
        if (this.character.isColliding(enemy) && !this.character.attacking && !this.character.isDead() && !enemy.dead) {
            this.character.hit();
            this.character.damagedBy = enemy.damage;
            this.character.checkForFlipperDamage(enemy.type);
        } else if (!this.character.isColliding(enemy)) {
            this.character.isntHit();
        }
        if (this.character.isColliding(enemy) && enemy.type === "pufferfish" && this.character.attacking && !enemy.dead) {
            enemy.eliminate();
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
            }, 2000);
        }
    }

    checkCharacterCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.executeCollectCoin(coin, i);
            }
        });
    }

    executeCollectCoin(coin, i) {
        if (!coin.collected) {
            this.character.collectCoin();
            this.coin_sound.play();
            coin.collected = true;
            this.bars[2].setPercentage(this.bars[2].IMAGES_COIN, this.character.coins);
            this.level.coins.splice(i, 1);
        }
    }

    checkCharacterPoison() {
        this.level.poison.forEach((poison, i) => {
            if (this.character.isColliding(poison)) {
                this.executeCollectPoison(poison, i);
            }
        });
    }

    executeCollectPoison(poison, i) {
        if (!poison.collected) {
            this.character.collectPoison();
            this.poison_collect_sound.play();
            poison.collected = true;
            this.bars[1].setPercentage(this.bars[1].IMAGES_POISON, this.character.poison);
            this.level.poison.splice(i, 1);
        }
    }

    checkThrowableObjects() {
        if (this.throwableObjects.length >= 1) {
            this.level.enemies.forEach((enemy, i) => {
                this.throwableObjects.forEach((throwableObject, j) => {
                    this.executeCollidingThrowableObject(enemy, throwableObject, i, j);
                });
            });
        }
    }

    executeCollidingThrowableObject(enemy, throwableObject, i, j) {
        if (throwableObject.isColliding(enemy) && enemy.type === "jellyfish" && !enemy.dead) {
            this.throwableObjects.splice(j, 1);
            enemy.eliminate();
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
                console.log("enemy to splice: " + enemy);
            }, 2000);
        }
        if (throwableObject.isColliding(enemy) && enemy.type === "endboss" && throwableObject.type === "poison") {
            console.log(throwableObject.type + " is colliding with " + enemy.type);
        }
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.bars.forEach((bar) => {
            bar.world = this;
        });
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.firstBackground();
        this.lights();
        this.middleBackground();
        this.frontObjects();
        this.fixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    firstBackground() {
        this.ctx.translate(-this.camera_x * 0.8, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(this.camera_x * 0.8, 0);
    }

    lights() {
        this.ctx.translate(-this.camera_x * 0.9, 0);
        this.addObjectsToMap(this.level.lights);
        this.ctx.translate(this.camera_x * 0.9, 0);
    }

    middleBackground() {
        this.ctx.translate(-this.camera_x * 0.3, 0);
        this.addObjectsToMap(this.level.middlegroundObjects);
        this.ctx.translate(this.camera_x * 0.3, 0);
    }

    fixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.bars);
        this.ctx.translate(this.camera_x, 0);
    }

    frontObjects() {
        this.addObjectsToMap(this.level.frontgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addToMap(this.character);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        this.ctx.save();
        if (mo.leftDirection) {
            this.flipImage(mo);
        }
        if (mo.upperDirection) {
            this.rotateUpwards(mo);
        }
        mo.draw(this.ctx, mo);
        mo.drawBorder(this.ctx);
        if (mo.leftDirection) {
            this.flipImageBack(mo);
        }
        this.ctx.restore();
    }

    flipImage(mo) {
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
    }

    rotateUpwards(mo) {
        this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
        this.ctx.rotate(-this.rotation * Math.PI / 180);
        this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
    }

    setSounds() {
        this.soundtrack = new Audio("audio/Shark game song.mp3");
        this.ambient_sound = new Audio("audio/ambient.mp3");
        this.coin_sound = new Audio("audio/coin.mp3");
        this.poison_collect_sound = new Audio("audio/poison.mp3");
        this.bubble_shot = new Audio("audio/bubble-shot.mp3");
        this.poison_bubbleshot_sound = new Audio("audio/poison-bubble.mp3");
        this.walking_sound = new Audio("audio/swim Sound.mp3");
        this.electro_hitsound = new Audio("audio/electro-damage.mp3");
        this.error_sound = new Audio("audio/error.mp3");
        this.ouch_sound = new Audio("audio/ouch.mp3");
        this.electrodeath_sound = new Audio("audio/bones.mp3");
        this.snoring_sound = new Audio("audio/snoring.mp3");
        this.punch_sound = new Audio("audio/punch.mp3");
    }

    setEffectVolume() {
        this.soundtrack.volume = this.musicVolume;
        this.ambient_sound.volume = this.musicVolume;
        this.coin_sound.volume = this.effectVolume;
        this.walking_sound.volume = this.effectVolume;
        this.electro_hitsound.volume = this.effectVolume;
        this.bubble_shot.volume = this.effectVolume;
        this.poison_bubbleshot_sound.volume = this.effectVolume;
        this.ouch_sound.volume = this.effectVolume;
        this.electrodeath_sound.volume = this.effectVolume;
        this.snoring_sound.volume = 0;
        this.error_sound.volume = this.effectVolume;
        this.punch_sound.volume = this.effectVolume;
    }
}