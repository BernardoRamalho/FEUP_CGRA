    
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
        //this.branch = new MyTreeBranch(this,2,0.5);

        //MyBird State Variables
        this.isAscending = false;
        this.isDescending = false;
        this.catchedBranch = false;

        //MyBird Movement Variables
        this.orientation = 0;

        this.velocity = 0;
        this.position = [0, 3, 0];

    }

    updatePosition(t, branches){

        if (this.isDescending == true){
            this.position[1] -= 0.15;

            if (this.position[1] < 0.5){
                this.isDescending = false;
                this.checkProximity(branches);
                this.isAscending = true;
            }
        }
        else if (this.isAscending == true){
           this.position[1] += 0.15

           if(this.position[1] > 2.99){
             
               this.isAscending = false;
           }

        }
        else{
            
            this.position[1] = 3 + Math.sin(t/200);
        }
        this.position[0] += Math.cos(this.orientation )*this.velocity;
        this.position[2] += Math.sin(this.orientation )*this.velocity;
        
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

    checkProximity(branches) {

        if(this.catchedBranch){

        }
        else{
            for (var i = 0; i < branches.length; i++) {
         
                if((Math.abs(this.position[0]-branches[i].position[0]) < 1.5) && (Math.abs(this.position[2]-branches[i].position[2]) < 1.5) && this.position[1] < 0.7 ){
                    this.branch = branches[i];
                    branches[i].isCatched = true;
                    this.catchedBranch = true;
                }
            }
        }
        

    }
    

    turn(v){
        this.orientation += 10*v * Math.PI/180;
    }

    updateWings(t){
        this.ang = Math.sin(t/200);
    }

    reset(){
        this.position = [0, 3, 0];
        this.velocity = 0;
    }

    display(){
        
        if(this.catchedBranch){
            this.branch.position = this.position;
            this.branch.orientation = -this.orientation;
            this.branch.display();
            
        }

        this.scene.pushMatrix();

        //Changing Bird Position and Orientation
        
        this.scene.translate(...this.position);

        this.scene.rotate(-this.orientation, 0.0, 1.0, 0.0);

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

        this.scene.popMatrix();

    }
}