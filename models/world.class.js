/**
 * Represents the game world, including all entities, objects, and interactions.
 * 
 * @class
 */
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
    rotation = 5;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    loaded = false;
    musicSettings = new WorldMusic(0.5, 0.7);

    /**
     * Creates an instance of World.
     * 
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coinValue = 100 / this.level.coins.length;
        this.poisonValue = 100 / this.level.poison.length;
        this.draw();
        this.setWorld();
        this.run();
        this.loaded = true;
    }

    /**
     * Starts the game loop to check collisions and manage game state.
     */
    run() {
        let runInt = setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjectsRange();
        }, 50);
        intervalIds.push(runInt);
    }

    /**
     * Checks if any throwable objects are out of range and removes them.
     */
    checkThrowableObjectsRange() {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach((object, i) => {
                if (object.x >= this.level.level_end_x + 750) {
                    this.throwableObjects.splice(i, 1);
                }
            });
        }
    }

    /**
     * Checks for collisions between the character and various objects or enemies.
     */
    checkCollisions() {
        this.checkCharacterDamage();
        this.checkCharacterCoins();
        this.checkCharacterPoison();
        this.checkThrowableObjects();
    }

    /**
     * Checks for collisions between the character and enemies, and handles damage.
     */
    checkCharacterDamage() {
        this.level.enemies.forEach((enemy, i) => {
            this.executeCharacterDamage(enemy, i);
        });
    }

    /**
     * Executes the logic for when the character takes damage from an enemy.
     * 
     * @param {MovableObject} enemy - The enemy object.
     * @param {number} i - The index of the enemy in the enemies array.
     */
    executeCharacterDamage(enemy, i) {
        if (this.character.isColliding(enemy) && !this.character.isDead() && !enemy.dead) {
            this.character.hit();
            this.character.damagedBy = enemy.damage;
            this.character.checkForFlipperDamage(enemy.type);
        } else {
            this.character.isntHit();
        }
        this.characterAttackPufferfish(enemy, i);
    }

    /**
     * Handles the character's attack on a pufferfish enemy.
     * 
     * @param {MovableObject} enemy - The pufferfish enemy.
     * @param {number} i - The index of the enemy in the enemies array.
     */
    characterAttackPufferfish(enemy, i) {
        if (this.character.isColliding(enemy) && enemy.type === "pufferfish" && this.character.attacking && this.character.attack === "flipper" && !enemy.dead) {
            enemy.dead = true;
            enemy.startDeadAnimation();
        }
        if (enemy.spliceable) {
            this.level.enemies.splice(i, 1);
        }
    }

    /**
     * Checks for collisions between the character and coins, and handles coin collection.
     */
    checkCharacterCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.executeCollectCoin(coin, i);
            }
        });
    }

    /**
     * Executes the logic for collecting a coin.
     * 
     * @param {MovableObject} coin - The coin object.
     * @param {number} i - The index of the coin in the coins array.
     */
    executeCollectCoin(coin, i) {
        if (!coin.collected) {
            this.character.collectCoin();
            this.musicSettings.coin_sound.play();
            coin.collected = true;
            this.bars[2].setPercentage(this.bars[2].IMAGES_COIN, this.character.coins);
            this.level.coins.splice(i, 1);
        }
    }

    /**
     * Checks for collisions between the character and poison, and handles poison collection.
     */
    checkCharacterPoison() {
        this.level.poison.forEach((poison, i) => {
            if (this.character.isColliding(poison)) {
                this.executeCollectPoison(poison, i);
            }
        });
    }

    /**
     * Executes the logic for collecting a poison.
     * 
     * @param {MovableObject} poison - The poison object.
     * @param {number} i - The index of the poison in the poison array.
     */
    executeCollectPoison(poison, i) {
        if (!poison.collected) {
            this.character.collectPoison();
            this.musicSettings.poison_collect_sound.play();
            poison.collected = true;
            this.bars[1].setPercentage(this.bars[1].IMAGES_POISON, this.character.poison);
            this.level.poison.splice(i, 1);
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies, and handles interactions.
     */
    checkThrowableObjects() {
        if (this.throwableObjects.length >= 1) {
            this.level.enemies.forEach((enemy, i) => {
                this.throwableObjects.forEach((throwableObject, j) => {
                    this.executeCollidingThrowableObject(enemy, throwableObject, i, j);
                });
            });
        }
    }

    /**
     * Handles the logic for when a throwable object collides with an enemy.
     * 
     * @param {MovableObject} enemy - The enemy object.
     * @param {ThrowableObject} throwableObject - The throwable object.
     * @param {number} i - The index of the enemy in the enemies array.
     * @param {number} j - The index of the throwable object in the throwableObjects array.
     */
    executeCollidingThrowableObject(enemy, throwableObject, i, j) {
        this.checkThrowableObjectRange(enemy, throwableObject, j);
        this.eliminateJellyfish(enemy, throwableObject, i, j);
        this.attackEndboss(enemy, throwableObject, j);
    }

    /**
     * Checks if a throwable object is out of range and should be removed.
     * 
     * @param {MovableObject} enemy - The enemy object.
     * @param {ThrowableObject} throwableObject - The throwable object.
     * @param {number} j - The index of the throwable object in the throwableObjects array.
     */
    checkThrowableObjectRange(enemy, throwableObject, j) {
        if (throwableObject.x > throwableObject.startPosition + 500 && !throwableObject.isColliding(enemy)) {
            this.throwableObjects.splice(j, 1);
        }
    }

    /**
     * Handles the logic for when a jellyfish is hit by a throwable object.
     * 
     * @param {MovableObject} enemy - The jellyfish enemy.
     * @param {ThrowableObject} throwableObject - The throwable object.
     * @param {number} i - The index of the enemy in the enemies array.
     * @param {number} j - The index of the throwable object in the throwableObjects array.
     */
    eliminateJellyfish(enemy, throwableObject, i, j) {
        if (throwableObject.isColliding(enemy) && enemy.type === "jellyfish" && !enemy.dead) {
            this.throwableObjects.splice(j, 1);
            enemy.dead = true;
            enemy.startDeadAnimation();
        }
        if (enemy.spliceable) {
            this.level.enemies.splice(i, 1);
        }
    }

    /**
     * Handles the logic for attacking the endboss with a throwable object.
     * 
     * @param {MovableObject} enemy - The endboss enemy.
     * @param {ThrowableObject} throwableObject - The throwable object.
     * @param {number} j - The index of the throwable object in the throwableObjects array.
     */
    attackEndboss(enemy, throwableObject, j) {
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        if (throwableObject.isColliding(enemy) && enemy.type === "endboss" && throwableObject.type === "poison") {
            this.poisonHitOnlyOnce(endboss, j);
        }
    }

    /**
     * Ensures the endboss is hit only once per poison throwable.
     * 
     * @param {MovableObject} endboss - The endboss enemy.
     * @param {number} j - The index of the throwable object in the throwableObjects array.
     */
    poisonHitOnlyOnce(endboss, j) {
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

    /**
     * Sets references to the world object in various game entities.
     */
    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.bars.forEach((bar) => {
            bar.world = this;
        });
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    };

    /**
     * Draws all objects and entities in the game world.
     */
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

    /**
     * Draws the background objects in the first layer.
     */
    firstBackground() {
        this.ctx.translate(-this.camera_x * 0.8, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(this.camera_x * 0.8, 0);
    }

    /**
     * Draws the light objects in the game world.
     */
    lights() {
        this.ctx.translate(-this.camera_x * 0.9, 0);
        this.addObjectsToMap(this.level.lights);
        this.ctx.translate(this.camera_x * 0.9, 0);
    }

    /**
     * Draws the background objects in the middle layer.
     */
    middleBackground() {
        this.ctx.translate(-this.camera_x * 0.3, 0);
        this.addObjectsToMap(this.level.middlegroundObjects);
        this.ctx.translate(this.camera_x * 0.3, 0);
    }

    /**
     * Draws the fixed objects like status bars.
     */
    fixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.bars);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws the front layer objects, including characters and collectibles.
     */
    frontObjects() {
        this.addObjectsToMap(this.level.frontgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addToMap(this.character);
    }

    /**
     * Adds a list of objects to the canvas.
     * 
     * @param {Array<MovableObject>} objects - The list of objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Draws an individual movable object on the canvas.
     * 
     * @param {MovableObject} mo - The movable object to draw.
     */
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

    /**
     * Flips an image horizontally on the canvas.
     * 
     * @param {MovableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to its original orientation after drawing.
     * 
     * @param {MovableObject} mo - The movable object to revert.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
    }

    /**
     * Rotates an object upwards based on its properties.
     * 
     * @param {MovableObject} mo - The movable object to rotate.
     */
    rotateUpwards(mo) {
        this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
        this.ctx.rotate(-this.rotation * Math.PI / 180);
        this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
    }
}
