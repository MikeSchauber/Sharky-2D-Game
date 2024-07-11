class World {
    character = new Character();
    enemies = [
        new JellyFish(400, 100),
        new JellyFish(500, 250),
        new JellyFish(600, 150)
    ];
    backgrounds = [
        new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0, 720, 480),
        new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0, 720, 350),
        new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0, 720, 400),
        new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0, 720, 390),
    ];
    lights = [
        
    ];
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}