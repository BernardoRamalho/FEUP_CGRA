/*
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object*/
 
class MyNest extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyPlane objects
        this.nest = new MyCylinder(this.scene,4,4,2,3);
        
        
       
    
    }
    
    
    display() {

        //Uncomment following lines in case texture must have wrapping mode 'REPEAT'
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);
        



        // ---- BEGIN Primitive drawing section
        
        this.scene.pushMatrix();
    

        this.scene.popMatrix();
        
    }
}
