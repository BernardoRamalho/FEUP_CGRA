/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, frontTexture, backTexture, leftTexture, rightTexture, topTexture, bottomTexture) {
        super(scene);
                
        //Initialize MyUnitCubeQuad objects
        this.frontQuad = new MyQuad(this.scene); //The Front Face of the cube is the one with positive Z value
        this.leftQuad = new MyQuad(this.scene); //In relation to us, this is, the one with negative X value
        this.rightQuad = new MyQuad(this.scene);
        this.backQuad = new MyQuad(this.scene);
        this.topQuad = new MyQuad(this.scene);
        this.bottomQuad = new MyQuad(this.scene);

        //Initialize Textures
        this.frontTexture = frontTexture;
        this.backTexture = backTexture;
        this.leftTexture = leftTexture;
        this.rightTexture = rightTexture;
        this.topTexture = topTexture;
        this.bottomTexture = bottomTexture;

        this.initMaterials();
    
    }
    initMaterials() {
        //Front
        this.frontMaterial = new CGFappearance(this.scene);
        this.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setDiffuse(1, 1, 1, 1);
        this.frontMaterial.setSpecular(0, 0, 0, 1);
        this.frontMaterial.setShininess(10.0);
        this.frontMaterial.loadTexture(this.frontTexture);
        this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        //Back
        this.backMaterial = new CGFappearance(this.scene);
        this.backMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.backMaterial.setDiffuse(1, 1, 1, 1);
        this.backMaterial.setSpecular(0, 0, 0, 1);
        this.backMaterial.setShininess(10.0);
        this.backMaterial.loadTexture(this.backTexture);
        this.backMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        //Left
        this.leftMaterial = new CGFappearance(this.scene);
        this.leftMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leftMaterial.setDiffuse(1, 1, 1, 1);
        this.leftMaterial.setSpecular(0, 0, 0, 1);
        this.leftMaterial.setShininess(10.0);
        this.leftMaterial.loadTexture(this.leftTexture);
        this.leftMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        //Right
        this.rightMaterial = new CGFappearance(this.scene);
        this.rightMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.rightMaterial.setDiffuse(1, 1, 1, 1);
        this.rightMaterial.setSpecular(0, 0, 0, 1);
        this.rightMaterial.setShininess(10.0);
        this.rightMaterial.loadTexture(this.rightTexture);
        this.rightMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        //Top
        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(1, 1, 1, 1);
        this.topMaterial.setSpecular(0, 0, 0, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture(this.topTexture);
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        //Back
        this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setDiffuse(1, 1, 1, 1);
        this.bottomMaterial.setSpecular(0, 0, 0, 1);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture(this.bottomTexture);
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        
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

        //Displaying Back Quad
        this.scene.pushMatrix();
        
        this.scene.translate(0, 0, -0.5);
        
        this.scene.rotate(Math.PI, 1.0, 0.0, 0.0);
        
        this.backMaterial.apply();
        
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        this.backQuad.display();
        
        this.scene.popMatrix();

        //Displaying Left Quad
        this.scene.pushMatrix();
        
        this.scene.translate(-0.5,0,0);
        
        this.scene.rotate(-Math.PI/2, 0.0, 1.0, 0.0);
        
        this.leftMaterial.apply();
        
        this.leftQuad.display();
        
        this.scene.popMatrix();

        //Displaying Right Quad
        this.scene.pushMatrix();
        
        this.scene.translate(0.5,0,0);
        
        this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
        
        this.rightMaterial.apply();
        
        this.rightQuad.display();
        
        this.scene.popMatrix();

        //Displaying Front Quad
        this.scene.pushMatrix();
        
        this.scene.translate(0.0, 0.0, 0.5);
        
        this.frontMaterial.apply();
        
        this.frontQuad.display();
        
        this.scene.popMatrix();

        //Displaying Bottom Quad
        this.scene.pushMatrix();
        
        this.scene.translate(0.0, -0.5, 0.0);
        
        this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
        
        this.bottomMaterial.apply();
        
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        this.bottomQuad.display();
        
        this.scene.popMatrix();
    }
}
