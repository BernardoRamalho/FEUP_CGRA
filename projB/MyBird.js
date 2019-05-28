    
/**
* MyBird
* @constructor
*/

class MyBird extends CGFobject {
    constructor(scene){
        super(scene);

        //MyBird Objects
        this.topBeak = new MyPrism(this.scene, 3, 3, 0.3, 0.1);
        this.head = new MyUnevenCylinder(this.scene,5,4,0.1,0.2,0.25);
        this.head1 = new MyUnevenCylinder(this.scene,5,4,0.3,0.25,0.1);
        this.body = new MyCylinder(this.scene,5,4,1.0,0.4);
        this.neck = new MyUnevenCylinder(this.scene, 5, 4, 0.4, 0.4,0.2);
        this.bottom = new MyUnevenCylinder(this.scene, 5, 4, 0.4, 0.05,0.4);
        this.leftLeg = new MyCylinder(this.scene,5,5,0.5,0.1);
        this.righttLeg = new MyCylinder(this.scene,5,5,0.5,0.1);
        this.rightWingBeggining = new MyQuad(this.scene,0.8);
        this.rightWingEnd = new MyTriangle(this.scene,0.8);
        this.leftWingEnd = new MyTriangle(this.scene,0.8);
        this.leftWingBeggining = new MyQuad(this.scene,0.8);

        //this.branch = new MyTreeBranch(this,2,0.5);

        //MyBird State Variables
        this.isAscending = false;
        this.isDescending = false;
        this.catchedBranch = false;

        //MyBird Movement Variables
        this.orientation = 0;

        this.velocity = 0;
        this.position = [0, 3, 0];

        this.initMaterials();

    }

    initMaterials() {

        //Texture Wings
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.wingMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.wingMaterial.setShininess(10.0);
        this.wingMaterial.loadTexture("images/wings.jpg"); 
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Texture Body
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bodyMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyMaterial.setShininess(10.0);
        this.bodyMaterial.loadTexture("images/eagleBody.jpg"); 
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Texture Head
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.headMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.headMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.headMaterial.setShininess(10.0);
        this.headMaterial.loadTexture("images/head.jpg"); 
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Texture Beak
        this.beakMaterial = new CGFappearance(this.scene);
        this.beakMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.beakMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beakMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.beakMaterial.setShininess(10.0);
        this.beakMaterial.loadTexture("images/Beak.jpg"); 
        this.beakMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
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
        //this.scene.scale(10,10,10);

        this.scene.rotate(-this.orientation, 0.0, 1.0, 0.0);

        //Drawing Head
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.headMaterial.apply();
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.8,0,0);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.headMaterial.apply();
        this.head1.display();
        this.scene.popMatrix();

        //Drawing Neck
        
        this.scene.pushMatrix();
        this.scene.translate(0.4,0,0);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.headMaterial.apply();
        this.neck.display();
        this.scene.popMatrix();

        //Drawing Top Beak

        this.scene.pushMatrix();
        this.scene.translate(0.8,0,0);
        this.scene.rotate(-90*Math.PI/180,0,0,1);
        //this.scene.rotate(180*Math.PI/180,0,0,1);
        this.beakMaterial.apply();
        this.topBeak.display();
        this.scene.popMatrix();

        //Drawing Body
        
        this.scene.pushMatrix();
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.bodyMaterial.apply();

        this.body.display();
        this.scene.popMatrix();

        //Drawing Bottom

        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.bodyMaterial.apply();
        this.bottom.display();
        this.scene.popMatrix();

        //Drawing Left Leg

        this.scene.pushMatrix();
        this.scene.translate(-1,-0.2,0.2);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.leftLeg.display();
        this.scene.popMatrix();

        //Drawing Right Leg

        this.scene.pushMatrix();
        this.scene.translate(-1,-0.2,-0.2);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.leftLeg.display();
        this.scene.popMatrix();

        //Drawing the Left Wing
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(this.ang+10*Math.PI/180, 1.0, 0.0, 0.0);
        this.scene.translate(-0.8, 0, 2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI, 1, 1, 0);
        this.wingMaterial.apply();
        this.leftWingEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(-0.8, 0, 0.4);
        this.scene.rotate(this.ang, 1.0, 0.0, 0.0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.leftWingBeggining.display();
        this.scene.popMatrix();

        //Drawing the Right Wing
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(-this.ang-10*Math.PI/180, 1.0, 0.0, 0.0);
        this.scene.translate(-0.8, 0, -2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.rightWingEnd.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(-0.8, 0, -0.4);
        this.scene.rotate(-this.ang, 1.0, 0.0, 0.0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.rightWingBeggining.display();
        this.scene.popMatrix();




        this.scene.popMatrix();

    }
}