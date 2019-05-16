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

        //MyBird Movement Variables
        this.orientation = 0;
        this.velocity = 0.11;
        this.position = [0, 3, 0];

    }

    updatePosition(t){
        this.position[0] += Math.cos(Math.PI * this.orientation / 180)*this.velocity;
        this.position[2] += Math.sin(Math.PI * this.orientation / 180)*this.velocity;
        this.position[1] = 3 + Math.sin(t/200);
    }

    accelerate(v){
        this.velocity += 0.01*v;
    }

    turn(v){
        this.orientation += 2.5*v;
    }


    display(){

        this.scene.translate(...this.position);

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