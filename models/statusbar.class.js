class Bar extends MovableObject {
    width = 170;
    height = 50;
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
    percentage = 100;

    constructor(bar, status) {
        super().getRightBar(bar, status);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_LIFE);
        this.loadImages(this.IMAGES_POISON);
    }

    setLifeInStatusbar(world, energy) {
        world.bars[0].setPercentage(world.bars[0].IMAGES_LIFE, energy);
    }

    setPercentage(arr, percentage) {
        this.percentage = percentage; // => 0...5
        let path = arr[this.mapToRange(percentage)];
        this.img = this.imageCache[path];
    }

    mapToRange(percentage) {
        if (percentage > 100) {
            return 5;
        } else if (percentage >= 99) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else if (percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }

    getRightBar(bar, status) {
        if (bar === "coin") {
            this.loadImage(this.IMAGES_COIN[status]);
            this.x = 350;
        }
        if (bar === "life") {
            this.loadImage(this.IMAGES_LIFE[status]);
            this.x = 10;
        }
        if (bar === "poison") {
            this.loadImage(this.IMAGES_POISON[status]);
            this.x = 180;
        }
    }

}