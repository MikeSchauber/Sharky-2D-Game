class World {
    character = new Character();
    level = level1;
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
    };

    // expandDynamicWorld() {
    //     if (this.camera_x == -718 || this.camera_x == -1436 || this.camera_x == -2154 || this.camera_x == -2872) {
    //         this.backgroundX1 = this.backgroundX1 + 1440;
    //         this.backgroundX2 = this.backgroundX2 + 1440;
    //         this.backgrounds.push(
    //             new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", this.backgroundX1, 720, 480),
    //             new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", this.backgroundX1, 720, 400),
    //             new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", this.backgroundX1, 720, 400),
    //             new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", this.backgroundX1, 720, 350),
    //             new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", this.backgroundX2, 720, 480),
    //             new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", this.backgroundX2, 720, 400),
    //             new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", this.backgroundX2, 720, 400),
    //             new BackgroundObject("img/3. Background/Layers/2. Floor/D2.png", this.backgroundX2, 720, 350),
    //         );
    //     }
    // }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        if (mo.leftDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.leftDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();

        }
    }
}