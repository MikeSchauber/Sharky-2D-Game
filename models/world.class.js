class World extends WorldMusic {
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
    rotation = 5;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coinValue = 100 / this.level.coins.length;
        this.poisonValue = 100 / this.level.poison.length;
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
                if (object.x >= this.level.level_end_x + 750) {
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
        if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.dead) {
            this.character.hit();
            this.character.damagedBy = enemy.damage;
            this.character.checkForFlipperDamage(enemy.type);
        } else {
            this.character.isntHit();
        }
        if (this.character.isColliding(enemy) && enemy.type === "pufferfish" && this.character.attacking && this.character.attack === "flipper" && !enemy.dead) {
            enemy.dead = true;
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
            }, 3000);
        }
        if (this.character.isColliding(enemy) && enemy.type === "endboss" && enemy.dead) {

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
        if (throwableObject.x > throwableObject.startPosition + 500 && !throwableObject.isColliding(enemy)) {
            this.throwableObjects.splice(j, 1);
        }
        if (throwableObject.isColliding(enemy) && enemy.type === "jellyfish" && !enemy.dead) {
            this.throwableObjects.splice(j, 1);
            enemy.eliminate();
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
            }, 2000);
        }
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        if (throwableObject.isColliding(enemy) && enemy.type === "endboss" && throwableObject.type === "poison") {
            if (this.throwableObjects[j].hasHit === 1) {
                endboss.energy -= 34;
                this.throwableObjects[j].hasHit += 1;
            } else if (this.throwableObjects[j].hasHit > 1) {
                endboss.status = "hurt";
                this.throwableObjects[j].hasHit += 1;
                if (this.throwableObjects[j].hasHit > 15) {
                    endboss.status = "idle";
                }
            }
        }
    }

    setWorld() {
        this.ambient_sound = this.level.levelSoundtrack;
        this.ambient_sound.volume = this.musicVolume;
        this.ambient_sound.play();
        this.character.world = this;
        this.level.world = this;
        this.bars.forEach((bar) => {
            bar.world = this;
        });
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
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
        // mo.drawBorder(this.ctx);
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
}