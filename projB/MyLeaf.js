/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initializing MyLeaf
        this.leaf = new MyTriangle(this.scene,1);

		this.initMaterials();
    }

    initMaterials() {

        //Leaf Material
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.greenMaterial.setDiffuse(0.0, 1.0, 0.0, 1.0);
        this.greenMaterial.setShininess(10.0);
    }

    display() {

        this.scene.pushMatrix();

        this.greenMaterial.apply();
        this.leaf.display();
        
        this.scene.popMatrix();
    }
   
}