class World {
    character = new Character();
    bars = [
        new Bar("life", 0, 5),
        new Bar("coin", 50, 0),
        new Bar("poison", 100, 0)
    ];
    level = level1;
    soundtrack;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
    }

    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    console.log("enemy is colliding, energy is =", this.character.energy);
                    this.character.hit();
                } else if (!this.character.isColliding(enemy)) {
                    this.character.isntHit();
                }
            })
        }, 50);
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
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.bars);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poison);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
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
        if (mo.downDirection) {
            this.rotateDownwards(mo);
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

    rotateDownwards(mo) {
        this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
        this.ctx.rotate(8 * Math.PI / 180);
        this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
    }

    rotateUpwards(mo) {
        this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
        this.ctx.rotate(-8 * Math.PI / 180);
        this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
    }
}