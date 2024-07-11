class World {
    character = new Character();
    enemies = [
        new JellyFish(400, 100),
        new JellyFish(500, 250),
        new JellyFish(600, 150)
    ];
    layers = [
        new Water(),
        new Light(),
        new Layer2(),
        new Layer1(),
        new Floor()
    ]
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.layers.forEach(layer => {
            this.ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        });
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}