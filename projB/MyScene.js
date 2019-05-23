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

        this.axiom = "X";
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
        this.lightning = new MyLightning(this);

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
        
        //Branches

        this.branches = [this.branch1,this.branch2,this.branch3,this.branch4];
        this.desilignement_values = [Math.random() * -0.3,Math.random() * 0.3,Math.random() * -0.3,Math.random() * 0.3];
        this.desilignement_rotation = [Math.random() * Math.PI,Math.random() * Math.PI,Math.random() * Math.PI,Math.random() * Math.PI];

        this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        

        
        //Initialize some Textures
        this.textureTerrain = new CGFtexture(this, "images/terrain.jpg");
        this.appearance.setTexture(this.textureTerrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');


        this.textureMapTerrain = new CGFtexture(this, 'images/heightmap.jpg');


        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        // additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
        this.terrainShader.setUniformsValues({ uSampler2: 1 });

        
        // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");



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
            this.bird.resetS();

        }

       
    }

    update(t){
        this.checkKeys();
        this.bird.updatePosition(t);

        this.bird.updateWings(t);
        
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

        this.pushMatrix()
        this.lightning.display();
        this.popMatrix();
        

        //Uncomment following lines in case texture must have wrapping mode 'REPEAT'
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        

        // ---- BEGIN Primitive drawing section
        
        this.pushMatrix();
        this.appearance.setTexture(this.textureTerrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.apply();
        this.setActiveShader(this.terrainShader);
        this.textureMapTerrain.bind(1);
        
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
		this.setActiveShader(this.defaultShader);

        this.popMatrix();
        
        
        
        

        var row = 0;
        var line = 0;

        for (var i = 0; i < 4; i++) {

            this.pushMatrix();
            this.translate(row*2.5 - 2.5 + this.desilignement_values[i], 0, line*2.5 - 2.5 + this.desilignement_values[4-i]);
            this.rotate(this.desilignement_rotation[i],0,1,0);
            this.branches[i].display();

            this.popMatrix();

            line += 1;
            if ((i + 1) % 3 == 0){
                row++;
                line = 0;
            }
        }


        this.pushMatrix()
        this.bird.display();
        this.popMatrix()


        // restore default shader (will be needed for drawing the axis in next frame)
        // ---- END Primitive drawing section
    }
}