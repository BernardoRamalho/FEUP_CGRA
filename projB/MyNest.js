/**
 * MySemiSphere
 * @constructor
 */
class MyNest extends CGFobject
{
	constructor(scene,slices)
	{
        super(scene);
        this.slices = slices;
        this.ang = 2*Math.PI/slices;
        this.size = 1.5;
        this.rnd = [];
        this.position = [15,0,-3];
        
        for (var j = 0; j < 50; j++) {
			for (var i = 1; i <= this.slices; i++) {
				this.rnd[i*j] = Math.random()*0.2;
			};
		};
        
        this.branch = new MyCylinder(scene,5,0.5,this.size,0.1);
        this.initMaterials();
	};

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

    
	display()
	{
        this.radius = 0.15;
        this.height = 0;

        for (var j = 0; j < 15; j++){
            for (var i = 0; i < this.slices; i++) {
                
                this.scene.pushMatrix();
                this.scene.rotate(-this.ang*i,0,1,0);
                this.scene.translate(this.size/2,this.height+ this.rnd[i*j],this.radius);
                this.scene.rotate(Math.PI/2,0,0,1);
                this.nestMaterial.apply();
                this.branch.display();
                this.scene.popMatrix();
            }
            this.radius+=0.1;

            this.height+=0.1;
            
        }
	}
};