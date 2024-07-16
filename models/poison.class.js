class Poison extends MovableObject {

    height = 70;
    width = 60;
    downDirection = true;
    IMAGES_POISON = [
        "img/4. Marcadores/Posión/Animada/1.png",
        "img/4. Marcadores/Posión/Animada/2.png",
        "img/4. Marcadores/Posión/Animada/3.png",
        "img/4. Marcadores/Posión/Animada/4.png",
        "img/4. Marcadores/Posión/Animada/5.png",
        "img/4. Marcadores/Posión/Animada/6.png",
        "img/4. Marcadores/Posión/Animada/7.png",
        "img/4. Marcadores/Posión/Animada/8.png",
    ];

    constructor(x, y) {
        super().loadImage("img/4. Marcadores/Posión/Animada/1.png");
        this.loadImages(this.IMAGES_POISON);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        this.animationPlay(this.IMAGES_POISON, 5);
    }
}