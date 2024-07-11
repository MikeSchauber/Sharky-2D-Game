class MovableObject{
    x = 70;
    y = 200;
    img;
    height = 200;
    width = 150;

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