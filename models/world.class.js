class World {
    character = new Character();
    bars = [
        new Bar("coin", 90),
        new Bar("life", 45),
        new Bar("poison", 0)
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
    }

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

    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.bars.forEach((bar) => {
            bar.world = this;
        })
    };

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        this.ctx.save();
        if (mo.leftDirection) {
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        if (mo.upperDirection) {
            this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
            this.ctx.rotate(-8 * Math.PI / 180);
            this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
        }
        if (mo.downDirection) {
            this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
            this.ctx.rotate(8 * Math.PI / 180);
            this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = "blue";
        this.ctx.rect(mo.x, mo.y, mo.height, mo.width);
        this.ctx.stroke();
        if (mo.leftDirection) {
            mo.x = mo.x * -1;
        }
        this.ctx.restore();
    }
}