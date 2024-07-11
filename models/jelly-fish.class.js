class JellyFish extends MovableObject {
    width = 65;
    height = 80;
    pixel = 0.5
    IMAGES_PURPLE = [
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ];
    currentImage = 0;
    constructor() {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png")
        this.x = 300 + Math.random() * 375
        this.y = Math.random() * 360
        this.animate();
        this.loadImages(this.IMAGES_PURPLE);
    }

    animate() {
        setInterval(() => {
            this.animateUp();
        }, 1000 / this.fps)
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_PURPLE.length
            let path = this.IMAGES_PURPLE[i];
            this.img = this.imageCache[path];
            this.currentImage++
        }, 1000 / 5)
    }

    animateUp() {
        this.y -= this.pixel
    }

    animateDown() {
        this.y += this.pixel
    }
}