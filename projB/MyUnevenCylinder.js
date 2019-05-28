/**
* MyCylinder
* @constructor
*/
class MyUnevenCylinder extends CGFobject {
    constructor(scene, slices, stacks, height, radiusTop,radiusBottom) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;
        this.initBuffers(height, radiusTop, radiusBottom);

    }
    
    initBuffers(height, radiusTop,radiusBottom) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        

        this.vertices.push(radiusBottom, 0, 0);
        this.vertices.push(radiusTop, height, 0);

        this.normals.push(radiusBottom, 0, 0);
        this.normals.push(radiusTop,0 ,0);

        this.texCoords.push(0, 1);
        this.texCoords.push(0, 0);

        ang += alphaAng;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(radiusBottom*ca, 0, radiusBottom*-sa);//1
            this.vertices.push(radiusTop*ca, height, radiusTop*-sa);//2
 
            this.normals.push(ca, 0, -sa);//1
            this.normals.push(ca, 0, -sa);//2
  
            //Texture Coordinates
            this.texCoords.push(i * (1 / this.slices) + 1 / this.slices, 1);
            this.texCoords.push(i * (1 / this.slices) + 1 / this.slices, 0);

            this.indices.push(2*i+2, (2*i+1) , (2*i+0) );
            this.indices.push(2*i+2, (2*i+3) , (2*i+1) );
            

            ang+=alphaAng;
        }

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