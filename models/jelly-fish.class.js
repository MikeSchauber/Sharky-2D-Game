class JellyFish extends MovableObject {

    constructor() {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png")
        this.height = 80;
        this.width = 65;
        this.x = 200
        this.y = 0
        this.x = 200 + Math.random() * 500
        this.y = Math.random() * 350
    }
}