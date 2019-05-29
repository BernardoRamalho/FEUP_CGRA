/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
	constructor(scene) {
        super(scene);

		//Initialize scene objects
               
        this.cube = new MyUnitCubeQuad(scene, 'images/wood-house-door.jpg', 'images/wood-house.jpg', 'images/wood-house-window.jpg', 'images/wood-house-window.jpg', 'images/wood-house.jpg', 'images/wood-house.jpg',3);
        this.pyramid = new MyPyramid(scene, 4, 4, 1.5, 3);
        this.prism = new MyPrism(scene, 8, 1, 3, 0.2);
    

        this.initMaterials();
    }
    
    initMaterials() {

        this.roofMaterial = new CGFappearance(this.scene);
        this.roofMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.roofMaterial.setShininess(10.0);
        this.roofMaterial.loadTexture('images/rooftop.jpg');
        this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        this.collumnMaterial = new CGFappearance(this.scene);
        this.collumnMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.collumnMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.collumnMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.collumnMaterial.setShininess(10.0);
        this.collumnMaterial.loadTexture('images/collumn.jpg');
        this.collumnMaterial.setTextureWrap('REPEAT', 'REPEAT');

    }
    
    display()
    {

        // Cube Transformation
        this.scene.pushMatrix();
        
        this.scene.translate(-0.5, 0 ,0.5);
        
        this.cube.display();
        
        this.scene.popMatrix();  

        

        
        //Pyramid Transformation
        this.scene.pushMatrix();
        
        
        
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        
        this.scene.translate(-1, 1.5, 0);
        
        this.roofMaterial.apply();
        
        this.pyramid.display();
        
        this.scene.popMatrix();
        
        
        // Column 1
        this.scene.pushMatrix();
        
        this.scene.translate(1.3, -1.5, 2.5);
        
        this.collumnMaterial.apply();
        
        this.prism.display();
        
        this.scene.popMatrix();
        
        // Column 2
        this.scene.pushMatrix();
        
        this.scene.translate(-2.2, -1.5, 2.5);
        
        this.collumnMaterial.apply()
        
        this.prism.display();
        
        this.scene.popMatrix();

       
    }
}

