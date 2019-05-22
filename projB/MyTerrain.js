/**
 * MyTerrqin
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyPlane objects
        this.plane = new Plane(this.scene);
        
        this.appearance = new CGFappearance(this);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);

       

        //Initialize some Textures

        this.textureTerrain = new CGFtexture(this, "images/terrain.jpg");
        this.appearance.setTexture(this.textureTerrain);
        //this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.textureMapTerrain = new CGFtexture(this, 'images/heightmap.jpg');

        //Initialize shaders

        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        // additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
        this.terrainShader.setUniformsValues({ uSampler2: 1 });

        
        // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

        
    
    }
    
    
    display() {

        //Displaying Top Quad
        this.scene.pushMatrix();
        
        this.scene.translate(0.0, 0.5, 0.0);
        
        this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);
        
        this.topMaterial.apply();
        
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        this.topQuad.display();
        
        this.scene.popMatrix();

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
        
    }
}
