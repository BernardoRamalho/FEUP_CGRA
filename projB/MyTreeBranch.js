/**
* MyTree
* @constructor
*/

class MyTreeBranch extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius){
        super(scene);

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        

        //Initializing MyTree Objects
        this.trunk = new MyCylinder(this.scene, 10, 1, 2, 0.2 );
        
        
        this.initMaterials();
    }

    initMaterials() {

        //Texture Trunk
        this.trunkMaterial = new CGFappearance(this.scene);
        this.trunkMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkMaterial.setSpecular(0, 0, 0, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.loadTexture("images/trunk.jpg"); 
        this.trunkMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        //Trunk Displaying
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.trunkMaterial.apply();
        this.trunk.display();
        this.scene.popMatrix();
        
        
    }
}