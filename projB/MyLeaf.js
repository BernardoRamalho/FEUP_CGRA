/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initializing MyLeaf
        this.leaf = new MyTriangle(this.scene,1.5);

		this.initMaterials();
    }

    initMaterials() {

        //Leaf MAterial
        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leafMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leafMaterial.setShininess(10.0);
        this.leafMaterial.loadTexture("images/copa-arvore.jpg"); 
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {

        this.scene.pushMatrix();

        this.leafMaterial.apply();
        this.leaf.display();
        
        this.scene.popMatrix();
    }
   
}