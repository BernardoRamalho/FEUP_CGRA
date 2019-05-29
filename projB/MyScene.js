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

        //Relampago

        /*this.axiom = "X"; //Define-se duas vezes?
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;*/
        this.lightning = new MyLightning(this);

        this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.angle = 30.0;
        this.iterations = 4;
        this.scaleFactor = 0.5;
        this.tree = new MyLSPlant(this);

        this.doGenerate = function () {
            this.lightning.generate(
                this.axiom,
                {
                    "F": [ "FF" ],
                    "X": [ "F[-X][X]F[-X]+FX"]//,"F[-X][X]F[-X]+X", "F[-X][x]+X", "F[+X]-X", "F[/X][X]F[\\\\X]+X", "F[X][X]X", "F[/X]\\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X" ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
            this.tree.generate(
                this.axiom,
                {
                    "F": [ "FF" ],
                    "X": [ "F[-X][X]F[-X]+X", "F[-X][x]+X", "F[+X]-X", "F[/X][X]F[\\\\X]+X", "F[\\X][X]/X", "F[/X]\\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X"]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );

        
        }

        this.doGenerate();

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);
        this.bird = new MyBird(this);
        this.branch1 = new MyTreeBranch(this,2,0.5);
        this.branch2 = new MyTreeBranch(this,2,0.5);
        this.branch3 = new MyTreeBranch(this,2,0.5);  
        this.branch4 = new MyTreeBranch(this,2,0.5);
        this.terrain = new MyTerrain(this);
        this.house = new MyHouse(this);
        this.cubeMapDay = new MyCubeMap(this, 90, 'images/hills_ft.png', 'images/hills_bk.png', 'images/hills_lf.png', 'images/hills_rt.png', 'images/hills_up.png', 'images/hills_dn.png');
        this.nest = new MyNest(this);
        
        //Branches

        this.branches = [this.branch1,this.branch2,this.branch3,this.branch4];
        this.desilignement_values = [Math.random() * -0.3,Math.random() * 0.3,Math.random() * -0.3,Math.random() * 0.3];
        this.desilignement_rotation = [Math.random() * Math.PI,Math.random() * Math.PI,Math.random() * Math.PI,Math.random() * Math.PI];


    }    

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(90, 90, 90), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {

        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(1);           

        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-1);
            
        }

        if (this.gui.isKeyPressed("KeyA")){
            this.bird.turn(-1);
            
        }

        if (this.gui.isKeyPressed("KeyD")){
            this.bird.turn(1);
            
        }
        
        if (this.gui.isKeyPressed("KeyR")){
            this.bird.reset();
            this.startDescending = false;

        }

        if (this.gui.isKeyPressed("KeyP")){

            this.bird.isDescending = true;  
        }

       
    }

    update(t){
        
        this.bird.updatePosition(t, this.branches);
        this.checkKeys();
        this.bird.updateWings(t);
        this.lightning.display();    
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

        

        this.pushMatrix();
        this.translate(-6,0,6);
        this.scale(10,5,10);
        //this.tree.display();
        this.popMatrix();


        this.pushMatrix();
        this.translate(5.0,1.8,-15);
        //this.house.display();
        this.popMatrix();

       // this.terrain.display();
        
        
        // ---- BEGIN Primitive drawing section
        
        
        
        
        for (var i = 0; i < 4; i++) {
            
            if (this.branches[i].isCatched == false){
                //this.branches[i].display();
            }

        }
               
            //this.cubeMapDay.display();
            //this.nest.display();
            this.bird.display(); 
            
            // ---- END Primitive drawing section
        }
    }