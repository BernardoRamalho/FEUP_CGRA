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
        this.branchMaterial = new CGFappearance(this.scene);
        this.branchMaterial.setAmbient(1, 1, 1, 1);
        this.branchMaterial.setDiffuse(1, 1, 1, 1);
        this.branchMaterial.setSpecular(1, 1, 1, 1);
        this.branchMaterial.setShininess(10.0);
        this.branchMaterial.loadTexture("images/trunk.jpg"); 
        this.branchMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        this.scene.pushMatrix();

        this.branchMaterial.apply();

        this.branch.display();
        
        this.scene.popMatrix();
    }
   
}