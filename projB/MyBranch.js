/**
 * MyBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBranch extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initializing MyBranch Components
        this.branch = new MyCylinder(this.scene, 4, 4, 1, 0.3);

		this.initMaterials();
    }

    initMaterials() {

        //Branch Material
        this.brownMaterial = new CGFappearance(this.scene);
        this.brownMaterial.setAmbient(0.464, 0.207, 0.0, 1.0);
        this.brownMaterial.setDiffuse(0.464, 0.207, 0.0, 1.0);
        this.brownMaterial.setShininess(10.0);
    }

    display() {

        this.scene.pushMatrix();

        this.brownMaterial.apply();

        this.branch.display();
        
        this.scene.popMatrix();
    }
   
}