class JellyFish extends MovableObject {
    width = 65;
    height = 80;

    IMAGES_PURPLE = [
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
       "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ];
    constructor() {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png")
        this.x = 300 + Math.random() * 375
        this.y = Math.random() * 360
        this.speed = 0.5 + Math.random() * 1;
        this.loadImages(this.IMAGES_PURPLE);
        this.animate();
        console.log(this.speed)
    }

    animate() {
        this.moveUp();
        this.pictureAnimation()
    }

    pictureAnimation() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_PURPLE.length
            let path = this.IMAGES_PURPLE[i];
            this.img = this.imageCache[path];
            this.currentImage++
        }, 1000 / 5)
    }
}