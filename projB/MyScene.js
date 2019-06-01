/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
        this.appearance = null;
        
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

           

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);
        this.bird = new MyBird(this);
        this.branch1 = new MyTreeBranch(this,2,0.5);
        this.branch2 = new MyTreeBranch(this,2,0.5);
        this.branch3 = new MyTreeBranch(this,2,0.5);  
        this.branch4 = new MyTreeBranch(this,2,0.5);
        this.terrain = new MyTerrain(this);
        this.water = new MyRiver(this);
        this.house = new MyHouse(this,5);
        this.cubeMapDay = new MyCubeMap(this, 60, 'images/hills_ft.png', 'images/hills_bk.png', 'images/hills_lf.png', 'images/hills_rt.png', 'images/hills_up.png', 'images/hills_dn.png');
        this.nest = new MyNest(this,15);
        this.tree = new MyTree(this);
        this.florest = new MyTreeGroupPatch(this);
        this.lightning = new MyLightning(this);
        
       // this.semiSphere = new MySemiSphere(this,10,3,5);
        
        //Branches

        this.branches = [this.branch1,this.branch2,this.branch3,this.branch4];
        this.desilignement_values = [5+Math.random() * -0.3,5+Math.random() * 0.3,5+Math.random() * -0.3,5+Math.random() * 0.3];
        this.desilignement_rotation = [Math.random() * Math.PI,Math.random() * Math.PI,Math.random() * Math.PI,Math.random() * Math.PI];


    }    

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(60, 60, 60), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys(t) {

        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        
        if (this.gui.isKeyPressed("KeyW"))
            this.bird.accelerate(1);           

        else if (this.gui.isKeyPressed("KeyS"))
            this.bird.accelerate(-1);
        
        if (this.gui.isKeyPressed("KeyA"))
            this.bird.turn(-1);

        if (this.gui.isKeyPressed("KeyD"))
            this.bird.turn(1);
            
        if (this.gui.isKeyPressed("KeyR")){
            this.bird.reset();
            
        }

        if (this.gui.isKeyPressed("KeyP"))
            this.bird.isDescending = true;  
        
        if (this.gui.isKeyPressed("KeyL")){
            this.lightning = new MyLightning(this);
            this.lightning.startAnimation(t); 
            this.lightning.displayLightning = true;
        }
    }

    update(t){
        
        this.bird.updatePosition(t, this.branches, this.nest,this.house.position);
        this.checkKeys(t);
        this.water.updateWater(t/3);
        this.bird.updateWings(t);

        if (this.lightning.displayLightning)
            this.lightning.update(t);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);



        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();


        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();


        // ---- BEGIN Primitive drawing section

        //Display House

        this.pushMatrix();
        this.translate(...this.house.position);
        this.house.display();
        this.popMatrix();

        //Display Trees

        this.pushMatrix();
        this.translate(-2,0,-15)
        this.florest.display();
        this.popMatrix();


        //Display Water

        //Display Terrain
        
        this.pushMatrix();
        this.translate(0.0,-0.5,0.0);
        this.terrain.display();
        this.popMatrix();
        
        
        this.pushMatrix();
        this.translate(-5.0,0.1,7.0);
        this.rotate(Math.PI/2,0,1,0);
        this.water.display();
        this.popMatrix();
        
        
        //Display Branches
        
        for (var i = 0; i < 4; i++) {
            if (this.branches[i].isCatched == false)
                this.branches[i].display();
        }

        //Display Bird

        this.bird.display(); 


        //Display Nest

        this.pushMatrix();
        this.translate(...this.nest.position);
        this.nest.display();
        this.popMatrix();
        
        
        //Display CubeMap  

        this.cubeMapDay.display();


        //Display Lightning

        this.pushMatrix();
        this.scale(5,5,5);
        this.translate(...this.lightning.position);
        this.rotate(Math.PI/3,0,1,0);
        this.rotate(Math.PI,0,0,1);
        this.lightning.display();
        this.popMatrix();
            
            
            // ---- END Primitive drawing section
        }
    }