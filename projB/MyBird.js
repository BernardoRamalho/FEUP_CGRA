/**
* MyBird
* @constructor
*/

class MyBird extends CGFobject {
    constructor(scene){
        super(scene);

        //MyBird Objects
        this.head = new MyUnitCubeQuad(this.scene);
        this.body = new MyUnitCubeQuad(this.scene);
        this.rightWing = new MyTriangle(this.scene);
        this.leftWing = new MyTriangle(this.scene);

    }

    display(){

        this.scene.translate(0, 3, 0);
        this.scene.pushMatrix();

        this.scene.translate(0.5, 1, 0);

        this.head.display();

        this.scene.popMatrix();

        this.body.display();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, 1);

        this.scene.scale(0.5, 0.5, 0.5);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.leftWing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, -1);

        this.scene.scale(0.5, 0.5, 0.5);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        
        this.rightWing.display();

        this.scene.popMatrix();

    }
}