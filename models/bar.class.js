class Bar extends MovableObject {
    width = 200;
    height= 60;
    IMAGES_COIN = [
        "img/4. Marcadores/Purple/0_ _1.png",
        "img/4. Marcadores/Purple/20_ .png",
        "img/4. Marcadores/Purple/40_ _1.png",
        "img/4. Marcadores/Purple/60_ _1.png",
        "img/4. Marcadores/Purple/80_ _1.png",
        "img/4. Marcadores/Purple/100__1.png",
    ];
    IMAGES_LIFE = [
        "img/4. Marcadores/Purple/0_ .png",
        "img/4. Marcadores/Purple/20__1.png",
        "img/4. Marcadores/Purple/40_ .png",
        "img/4. Marcadores/Purple/60_ .png",
        "img/4. Marcadores/Purple/80_ .png",
        "img/4. Marcadores/Purple/100_ .png",
    ];
    IMAGES_POISON = [
        "img/4. Marcadores/Purple/0_.png",
        "img/4. Marcadores/Purple/20_.png",
        "img/4. Marcadores/Purple/40_.png",
        "img/4. Marcadores/Purple/60_.png",
        "img/4. Marcadores/Purple/80_.png",
        "img/4. Marcadores/Purple/100_.png",
    ];
    world;

    constructor(bar, y) {
        super().getRightBar(bar, y);
        this.x = 10;
        this.animate();
    }

    animate() {
        // setInterval(() => {
        //     this.x += this.world;
        // }, 1000 / 1);
    }

    getRightBar(bar, y) {
        if (bar === "coin") {
            this.loadImage(this.IMAGES_COIN[0]);
            this.y = y;
        }
        if (bar === "life") {
            this.loadImage(this.IMAGES_LIFE[0]);
            this.y = y;
        }
        if (bar === "poison") {
            this.loadImage(this.IMAGES_POISON[0]);
            this.y = y;
        }

    }

}