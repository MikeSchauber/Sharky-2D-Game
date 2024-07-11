class JellyFish extends MovableObject {
    width = 65;
    height = 80;
    pixel = 0.5
    constructor() {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png")
        this.x = 300 + Math.random() * 375
        this.y = Math.random() * 360
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animateUp();
        }, 1000 / this.fps)
    }

    animateUp() {
        this.y -= this.pixel
    }

    animateDown() {
        this.y += this.pixel
    }
}