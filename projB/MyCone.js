/**
* MyCone
* @constructor
*/
class MyCone extends CGFobject {
    constructor(scene, slices, stacks, height, radius, textureCone) { //
        super(scene);

        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius = radius;

        this.initBuffers(height, radius);
    }
    
    initBuffers(height, radius) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; 
        

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(radius*Math.cos(ang), 0, radius*-Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            this.texCoords.push(0.5 + 0.5*radius*Math.cos(ang), 0.5 + 0.5*radius*Math.sin(ang))

            ang+=alphaAng;
        }

        this.texCoords.push(0.5,0.5)
        this.vertices.push(0,height,0);
        this.normals.push(0,1,0);
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}





