/*
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object*/
 
class MyNest extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyPlane objects
        this.nest = new MyCylinder(this.scene,10,4,2,3);
        this.position = [10.0,0.0,0.0]
        this.initMaterials();
    }
    
    initMaterials() {

        //Texture Leaves
        this.nestMaterial = new CGFappearance(this.scene);
        this.nestMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.nestMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.nestMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.nestMaterial.setShininess(10.0);
        this.nestMaterial.loadTexture("images/nest.jpg"); 
        this.nestMaterial.setTextureWrap('REPEAT', 'REPEAT');

        
    }


    display() {

        // ---- BEGIN Primitive drawing section
        this.scene.pushMatrix();
        this.scene.translate(...this.position)
        this.nestMaterial.apply();
        this.nest.display();
        this.scene.popMatrix();
    }
}
