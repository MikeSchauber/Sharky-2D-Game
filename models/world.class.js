class World {
    bars = [
        new Bar("life", 5),
        new Bar("poison", 0),
        new Bar("coin", 0),
    ];
    character = new Character();
    throwableObjects = [];
    bubbleAttack = true;
    poisonAttack = true;
    flipperAttack = true;
    level = level1;
    coinValue = 0;
    poisonValue = 0;
    soundtrack;
    coin_sound;
    poison_sound;
    walking_sound;
    electro_hitsound;
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
        this.soundtrack = new Audio("audio/Shark game song.mp3");
        // this.soundtrack.play();
        this.coin_sound = new Audio("audio/coin.mp3");
        this.poison_sound = new Audio("audio/poison.mp3");
        this.walking_sound = new Audio("audio/swim Sound.mp3");
        this.electro_hitsound = new Audio("audio/electro-damage.mp3");
        this.draw();
        this.setWorld();
        this.run();
        this.setEffectVolume();
        this.setMusicVolume();
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 50);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.character.damagedBy = enemy.damage;
            } else if (!this.character.isColliding(enemy)) {
                this.character.isntHit();
            }
        });
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                if (!coin.collected) {
                    this.character.collectCoin();
                    this.coin_sound.play();
                    coin.collected = true;
                    this.bars[2].setPercentage(this.bars[2].IMAGES_COIN, this.character.coins);
                    this.level.coins.splice(i, 1);
                }
            }
        });
        this.level.poison.forEach((poison, i) => {
            if (this.character.isColliding(poison)) {
                if (!poison.collected) {
                    this.character.collectPoison();
                    this.poison_sound.play();
                    poison.collected = true;
                    this.bars[1].setPercentage(this.bars[1].IMAGES_POISON, this.character.poison);
                    this.level.poison.splice(i, 1);
                }
            }
        });
    }
2
    checkThrowObjects() {
        if (this.keyboard.TWO && this.bubbleAttack) {
            let bubble; 
            if (this.character.leftDirection) {
                bubble = new ThrowableObject(this.character.x, this.character.y, "left", "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
            } else {
                bubble = new ThrowableObject(this.character.x, this.character.y, "right", "img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
            }
            this.throwableObjects.push(bubble);
            this.bubbleAttack = false;
            this.attackTimeout("bubble");
        }
        if (this.keyboard.THREE && this.poisonAttack && this.character.poison >= this.poisonValue) {
            let poisonBubble = new ThrowableObject(this.character.x, this.character.y, "img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
            this.throwableObjects.push(poisonBubble);
            this.poisonAttack = false;
            this.attackTimeout("poison");
            this.checkPoisonDepot();
        }
    }

    attackTimeout(type) {
        if (type === "bubble") {
            setTimeout(() => {
                this.bubbleAttack = true;
            }, 1000);
        }
        if (type === "poison") {
            setTimeout(() => {
                this.poisonAttack = true;
            }, 1000);
        }
        if (type === "flipper") {
            setTimeout(() => {
                this.flipperAttack = true;
            }, 1000);
        }
    }

    checkPoisonDepot() {
        this.character.poison -= this.poisonValue;
        this.bars[1].setPercentage(this.bars[1].IMAGES_POISON, this.character.poison);
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.bars.forEach((bar) => {
            bar.world = this;
        });
    };

    setMusicVolume() {
        this.soundtrack.volume = this.musicVolume;
    }

    setEffectVolume() {
        this.walking_sound.volume = this.effectVolume;
        this.electro_hitsound.volume = this.effectVolume;
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x * 0.8, 0);
        //--------- background Objects speed Camera positioning
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(this.camera_x * 0.8, 0);

        this.ctx.translate(-this.camera_x * 0.9, 0);
        //--------- Light Speed Camera positioning
        this.addObjectsToMap(this.level.lights);
        this.ctx.translate(this.camera_x * 0.9, 0);

        this.ctx.translate(-this.camera_x * 0.3, 0);
        //--------- middle Ground Objects Camera positioning
        this.addObjectsToMap(this.level.middlegroundObjects);
        this.ctx.translate(this.camera_x * 0.3, 0);

        this.addObjectsToMap(this.level.frontgroundObjects);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);
        //--------- Space for Fixed Objects
        this.addObjectsToMap(this.bars);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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
        this.ctx.rotate(-8 * Math.PI / 180);
        this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
    }
}