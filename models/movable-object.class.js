class MovableObject{
    img;
    width = 720;
    height = 480;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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