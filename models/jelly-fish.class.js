class JellyFish extends MovableObject {
    width = 65;
    height = 80;
    constructor() {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png")
        this.x = 300 + Math.random() * 375
        this.y = Math.random() * 360
        this.animate();
    }

    animate() {
        if (this.y = 360) {
            setInterval(() => {
                this.y -= 1
            }, 1000 / 60)
        }
        if (this.y = 0) {
            setInterval(() => {
                this.y += 1
            }, 1000 / 60)
        }

    }
}