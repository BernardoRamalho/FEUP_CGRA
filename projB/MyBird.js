    
/**
* MyBird
* @constructor
*/

class MyBird extends CGFobject {
    constructor(scene){
        super(scene);

        //MyBird Objects
        this.topBeak = new MyPrism(this.scene, 3, 3, 0.2, 0.05);
        this.bottomBeak = new MyPrism(this.scene, 3, 3, 0.1, 0.05);
        this.head = new MyUnevenCylinder(this.scene,5,4,0.1,0.2,0.25);
        this.head1 = new MyUnevenCylinder(this.scene,5,4,0.3,0.25,0.1);
        this.body = new MyCylinder(this.scene,5,4,1.0,0.4);
        this.neck = new MyUnevenCylinder(this.scene, 5, 4, 0.4, 0.4,0.2);
        this.bottom = new MyUnevenCylinder(this.scene, 5, 4, 0.4, 0.05,0.4);
        this.leftLeg = new MyCylinder(this.scene,5,5,0.4,0.1);
        this.righttLeg = new MyCylinder(this.scene,5,5,0.4,0.1);
        this.foot = new MyCylinder(this.scene,5,5,0.2,0.05);
        this.rightWingBeggining = new MyTwoSidedQuad(this.scene,0.8);
        this.rightWingEnd = new MyTriangle(this.scene,0.4);
        this.leftWingEnd = new MyTriangle(this.scene,0.4);
        this.leftWingBeggining = new MyTwoSidedQuad(this.scene,0.8);
        this.tail = new MyTriangle(this.scene,0.5);
        this.eye =  new MyQuad(this.scene,0.08);


        //this.branch = new MyTreeBranch(this,2,0.5);

        //MyBird State Variables
        this.isAscending = false;
        this.isDescending = false;
        this.catchedBranch = false;

        //MyBird Movement Variables
        this.orientation = 0;
        this.scaleFactor = 1;

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
        this.headMaterial.setAmbient(1, 1, 1, 1);
        this.headMaterial.setDiffuse(1, 1, 1, 1);
        this.headMaterial.setSpecular(1, 1, 1, 1);
        this.headMaterial.setShininess(10.0);
        this.headMaterial.loadTexture("images/head1.jpg"); 
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Texture Beak
        this.beakMaterial = new CGFappearance(this.scene);
        this.beakMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.beakMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.beakMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.beakMaterial.setShininess(10.0);
        this.beakMaterial.loadTexture("images/Beak.jpg"); 
        this.beakMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.loadTexture("images/eye.JPG"); 
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
    }

    updatePosition(t, branches,nest,housePosition){

        if (this.isDescending == true){
            this.position[1] -= 0.15;

            if (this.position[1] < 0.5){
                this.isDescending = false;
                this.checkProximity(branches,nest);
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
            
           // this.position[1] = 3 + Math.sin(t/200);
        }

        if (Math.abs(this.position[0]) > 18|| Math.abs(this.position[2]) > 15 || Math.abs(this.position[2]-housePosition[2] ) < 3) 
            this.orientation += Math.PI;
            
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

    checkProximity(branches, nest) {

        if(this.catchedBranch){
            if((Math.abs(this.position[0]-nest.position[0]) < 3) && (Math.abs(this.position[2]-this.branch.position[2]) < 3) && this.position[1] < 0.7 ){
                this.branch.position[0] = nest.position[0] +Math.random() -0.5;
                this.branch.position[1] = nest.position[1] + 2;
                this.branch.position[2] = nest.position[2] + Math.random() -0.5;
                this.branch.isCatched = false;
                this.catchedBranch = false;
            }
        }
        else{
            for (var i = 0; i < branches.length; i++) {
         
                if((Math.abs(this.position[0]-branches[i].position[0]) < 1.5) && (Math.abs(this.position[2]-branches[i].position[2]) < 1.5) && this.position[1] < 0.7 ){
                    this.branch = branches[i];
                    //this.branch.orientation = this.orientation;
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
        
        this.scene.pushMatrix();

        //Changing Bird Position and Orientation
        
        this.scene.translate(...this.position);
        //this.scene.scale(10,10,10);

        this.scene.rotate(-this.orientation, 0.0, 1.0, 0.0);

        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        if(this.isDescending && this.velocity != 0){
            this.scene.rotate(-Math.PI/8, 0, 0, 1);
        }
        else if (this.isAscending && this.velocity != 0){
            this.scene.rotate(+Math.PI/8, 0, 0, 1);
        }

//Drawing Bird

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

        //Drawing Right eye

        this.scene.pushMatrix();
        this.scene.translate(0.7,0.1,0.1);
        this.scene.rotate(-Math.PI/6,1,0,0);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.popMatrix();

        //Drawing Left eye

        this.scene.pushMatrix();
        this.scene.translate(0.7,0.1,-0.1);
        this.scene.rotate(-5*Math.PI/6,1,0,0);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.popMatrix();

        
    //Drawing Neck
        
        this.scene.pushMatrix();
        this.scene.translate(0.4,0,0);
        this.scene.rotate(90*Math.PI/180,0,0,1);
        this.headMaterial.apply();
        this.neck.display();
        this.scene.popMatrix();

    //Drawing Beak
    
    //Drawing Top Beak
    
    this.scene.pushMatrix();
    this.scene.translate(0.8,0.05,0);
    this.scene.rotate(-90*Math.PI/180,0,0,1);
    //this.scene.rotate(180*Math.PI/180,0,0,1);
    this.beakMaterial.apply();
    this.topBeak.display();
    this.scene.popMatrix();
    
    //Drawing Bottom Beak
    
    this.scene.pushMatrix();
    this.scene.translate(0.8,-0.05,0);
    this.scene.rotate(-90*Math.PI/180,0,0,1);
    //this.scene.rotate(180*Math.PI/180,0,0,1);
    this.beakMaterial.apply();
    this.bottomBeak.display();
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
    
    //Drawing Left Foot
    
    this.scene.pushMatrix();
    this.scene.translate(-1.4,-0.2,0.2);
    this.scene.rotate(90*Math.PI/180,0,0,1);
    this.beakMaterial.apply();
    this.foot.display();
    this.scene.popMatrix();
    
    //Drawing Left Foot
    
    this.scene.pushMatrix();
    this.scene.translate(-1.4,-0.2,-0.2);
    this.scene.rotate(90*Math.PI/180,0,0,1);
    this.beakMaterial.apply();
    this.foot.display();
    this.scene.popMatrix();
    
    
    //Drawing the Left Wing

        //Left wing End

        this.scene.pushMatrix();
        this.scene.rotate(this.ang, 1.0, 0.0, 0.0);
        this.scene.translate(-0.4, 0, 1.4);
        this.scene.rotate(-Math.PI/2, 0 , 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.leftWingEnd.display();
        this.scene.popMatrix();

        //Left wing Beggining
        
        this.scene.pushMatrix();
        this.scene.rotate(this.ang, 1, 0, 0);
        this.scene.translate(-0.8, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.leftWingBeggining.display();
        this.scene.popMatrix();
        
    //Drawing the Right Wing

        //Right wing end

        this.scene.pushMatrix();
        this.scene.rotate(-this.ang, 1.0, 0.0, 0.0);
        this.scene.translate(-0.4, 0, -1.4);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.rightWingEnd.display();
        this.scene.popMatrix();

        //Right wing beggining

        this.scene.pushMatrix();
        this.scene.rotate(-this.ang, 1, 0, 0);
        this.scene.translate(-0.8, 0, -0.2);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.wingMaterial.apply();
        this.rightWingBeggining.display();
        this.scene.popMatrix();
        
        
    //Tail Drawing
    
    this.scene.pushMatrix();
    this.scene.translate(-1.7,0,0);
    this.scene.rotate(3*Math.PI/4, 0, 1, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.headMaterial.apply();
    this.tail.display();
    this.scene.popMatrix();
    
    
    //Drawing Catched Branch
    
        if(this.catchedBranch){
            this.branch.position = [0, 0, 0];
            this.branch.orientation = 0;
            this.scene.pushMatrix();
            this.scene.translate(-1.5, -0.2,-1);
            //this.scene.rotate(Math.PI,0 , 1, 0);
            this.branch.display(); 
            this.scene.popMatrix();
        }
    this.scene.popMatrix();
    }
    
}