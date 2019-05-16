/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
	constructor(scene) {
        super(scene);

		//Initialize scene objects
        this.cube1 = new MyUnitCubeQuad(scene, 'images/wood-house-window.jpg', 'images/wood-house.jpg', 'images/wood-house-window.jpg', 'images/wood-house-window.jpg', 'images/wood-house.jpg', 'images/wood-house.jpg');        
        this.cube = new MyUnitCubeQuad(scene, 'images/wood-house-door.jpg', 'images/wood-house.jpg', 'images/wood-house-window.jpg', 'images/wood-house-window.jpg', 'images/wood-house.jpg', 'images/wood-house.jpg');
        this.pyramid = new MyPyramid(scene, 4, 4, 0.5, 2);
        this.prism = new MyPrism(scene, 8, 1, 2, 0.2);
        this.quad = new MyQuad(scene);

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
    
        this.poolMaterial = new CGFappearance(this.scene);
        this.poolMaterial.setDiffuse(1, 1, 1, 1.0);
        this.poolMaterial.setSpecular(1, 1, 1, 1.0);
        this.poolMaterial.setShininess(10.0);
        this.poolMaterial.loadTexture('images/pool.jpg');
        this.poolMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display()
    {

        // Cube Transformation
        this.scene.pushMatrix();
        
        this.scene.scale(2, 2, 2);
        
        this.scene.translate(-0.5, 0 ,0.5);
        
        this.cube.display();
        
        this.scene.popMatrix();  

        // Cube Transformation
        this.scene.pushMatrix();
        
        this.scene.scale(2, 2, 2); 
        
        this.scene.translate(0.5, 0, 0.5);
        
        this.cube1.display();
        
        this.scene.popMatrix();  

        // Cube Transformation
        this.scene.pushMatrix();
        
        this.scene.scale(2, 2, 2); 
        
        this.scene.translate(0.5, 0, -0.5);
        
        this.cube1.display();
        
        this.scene.popMatrix();  

        // Cube Transformation
        this.scene.pushMatrix();
        
        this.scene.scale(2, 2, 2); 
        
        this.scene.translate(-0.5, 0, -0.5);
        
        this.cube1.display();
        
        this.scene.popMatrix();  

        
        //Pyramid Transformation
        this.scene.pushMatrix();
        
        this.scene.scale(2,2,2); 
        
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        
        this.scene.translate(0, 0.5, 0);
        
        this.roofMaterial.apply();
        
        this.pyramid.display();
        
        this.scene.popMatrix();
        
        
        // Column 1
        this.scene.pushMatrix();
        
        this.scene.translate(2.3, -1, 2.3);
        
        this.collumnMaterial.apply();
        
        this.prism.display();
        
        this.scene.popMatrix();
        
        // Column 2
        this.scene.pushMatrix();
        
        this.scene.translate(-2.3, -1, 2.3);
        
        this.collumnMaterial.apply()
        
        this.prism.display();
        
        this.scene.popMatrix();

        //Pool
        this.scene.pushMatrix();
        
        this.scene.translate(0, -0.9, 10);
        
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        
        this.scene.scale(10, 10, 10); 
        
        this.poolMaterial.apply();
        
        this.quad.display();
        
        this.scene.popMatrix(); 
    }
}

