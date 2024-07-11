class MovableObject{
    fps = 60;
    pixel = 1;
    img;
    imageCache = {};
    width = 720;
    height = 480;

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
        })
    }

    moveRight() {   
        console.log("Move Right");
    }

    moveLeft() {
        
    }

    moveUp() {

    }

    moveDown() {

    }
}