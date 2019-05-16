/**
* MyTree
* @constructor
*/

class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, treeTopTexture, truncTexture){
        super(scene);

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.treeTopTexture = treeTopTexture;
        this.truncTexture = truncTexture;

        //Initializing MyTree Objects
        this.trunk = new MyCylinder(this.scene, 10, 10, trunkHeight, 0.5);
        this.cone = new MyCone(this.scene, 10, 10, treeTopHeight, treeTopRadius,'images/copa-arvore.jpg');
        
        this.initMaterials();
    }

    initMaterials() {

        //Texture Leaves
        this.leavesMaterial = new CGFappearance(this.scene);
        this.leavesMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leavesMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leavesMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leavesMaterial.setShininess(10.0);
        this.leavesMaterial.loadTexture(this.treeTopTexture); 
        this.leavesMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Texture Leaves
        this.trunkMaterial = new CGFappearance(this.scene);
        this.trunkMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkMaterial.setSpecular(0, 0, 0, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.loadTexture(this.truncTexture); 
        this.trunkMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        //Trunk Displaying
        this.scene.pushMatrix();
        
        this.trunkMaterial.apply();
        
        this.trunk.display();
        
        this.scene.popMatrix();
        
        //Cone Displaying
        this.scene.pushMatrix();
        
        this.scene.translate(0, this.trunkHeight, 0);
        
        this.leavesMaterial.apply();
        
        this.cone.display();
        
        this.scene.popMatrix();
        
    }
}