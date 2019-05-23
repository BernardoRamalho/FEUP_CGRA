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
        this.velocity = 0;
        this.position = [0, 3, 0];

    }

    updatePosition(t){
        this.position[0] += Math.cos(Math.PI * this.orientation / 180)*this.velocity;
        this.position[2] += Math.sin(Math.PI * this.orientation / 180)*this.velocity;
        this.position[1] = 3 + Math.sin(t/200);
    }

    accelerate(v){

        if(this.velocity+0.01*v > 0.1 && this.velocity+0.01*v < 3.0){
            this.velocity += 0.01*v;
        }
        else if (this.velocity+0.01*v < 0.1){
            this.velocity = 0.1;
        }
        else {
            this.velocity = 3;
        }
        
    }

    turn(v){
        this.orientation += 10*v;
    }

    updateWings(t){
        this.ang = Math.sin(t/200);
    }

    reset(){
        this.position = [0, 3, 0];
        this.velocity = 0;
    }


    display(){

        //Changing Bird Position and Orientation
        this.scene.translate(...this.position);

        this.scene.rotate(-Math.PI * this.orientation / 180, 0.0, 1.0, 0.0);

        //Drawing the Body and Head
        this.scene.pushMatrix();

        this.scene.translate(0.5, 1, 0);

        this.head.display();

        this.scene.popMatrix();

        this.body.display();

        //Drawing the Left Wing
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);

        this.scene.scale(0.5, 0.5, 0.5);

        this.scene.rotate(this.ang, 1.0, 0.0, 0.0);

        this.scene.translate(0, 0, 1);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.leftWing.display();

        this.scene.popMatrix();

        //Drawing the Right Wing
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);

        this.scene.scale(0.5, 0.5, 0.5);

        this.scene.rotate(-this.ang, 1.0, 0.0, 0.0);

        this.scene.translate(0, 0, -1);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        
        this.rightWing.display();

        this.scene.popMatrix();

    }
}