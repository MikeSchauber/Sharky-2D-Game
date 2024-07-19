class DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr = ["img/image1.png", "img/image2.png", ...];
     */
    loadImages(arr) {
        arr.forEach((src) => {
            let img = new Image();
            img.src = src
            this.imageCache[src] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}