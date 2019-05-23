/*
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object*/
 
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyPlane objects
        this.plane = new Plane(this.scene,32);
        
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);

       

        //Initialize some Textures

        this.textureTerrain = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance.setTexture(this.textureTerrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.textureMapTerrain = new CGFtexture(this.scene, 'images/heightmap.jpg');
        this.textureColorTerrain = new CGFtexture(this.scene,'images/altimetry.png')

        //Initialize shaders

        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        // additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
        this.terrainShader.setUniformsValues({ uSampler2: 1,uSampler3 : 2 });


        
        // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

        
    
    }
    
    
    display() {

        //Uncomment following lines in case texture must have wrapping mode 'REPEAT'
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);
        



        // ---- BEGIN Primitive drawing section
        
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);
        this.appearance.setTexture(this.textureTerrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.apply();
        this.textureMapTerrain.bind(1);
        this.textureColorTerrain.bind(2);

        
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 1);
        this.plane.display();
		this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
        
    }
}
