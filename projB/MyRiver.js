/*
 * MyRiver
 * @constructor
 * @param scene - Reference to MyScene object*/
 
class MyRiver extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyPlane objects
        this.plane = new Plane(this.scene,32);

        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(1, 1, 1, 1);
		this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(120);



        //Initialize some Textures

        this.texture = new CGFtexture(this.scene, 'images/waterTex.jpg');
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.textureMap = new CGFtexture(this.scene, 'images/waterMap.jpg');
        
        //Initialize shaders
        
        this.waterShader = new CGFshader(this.scene.gl,"shaders/water.vert" , "shaders/water.frag");
        
        this.waterShader.setUniformsValues({ timeFactor: 0 });
		this.waterShader.setUniformsValues({ uSampler2: 1 });

       

        
        // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
        this.fShaderDiv = document.getElementById("fshader");
        
        


    }
    
    updateWater(t) {		
		this.waterShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
	}
    
    display() {

        //Uncomment following lines in case texture must have wrapping mode 'REPEAT'
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);
        



        // ---- BEGIN Primitive drawing section
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.waterShader);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.apply();
        this.textureMap.bind(1);
        
        
        
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(40, 40, 1);
        this.plane.display();
		this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
        
    }
}
