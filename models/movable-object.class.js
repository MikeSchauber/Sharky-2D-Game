class MovableObject {
    x = 0;
    y = 0;
    fps = 60;
    speed = 1;
    img;
    imageCache = {};
    width = 720;
    height = 480;    
    currentImage = 0;
    leftDirection = false;

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
        console.log(this.imageCache);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    animationPlay(IMAGE_ARRAY) {
        let i = this.currentImage % IMAGE_ARRAY.length
        let path = IMAGE_ARRAY[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed
        }, 1000 / this.fps)
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed
        }, 1000 / fps)
    }

    moveUp() {
        setInterval(() => {
            this.y -= this.speed
        }, 1000 / this.fps)
    }

    moveDown() {
        setInterval(() => {
            this.y += this.speed
        }, 1000 / fps)
    }
}