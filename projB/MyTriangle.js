/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene,x) {
		super(scene);
		this.x = x;

		this.initBuffers(x);
	}
	initBuffers(x) {
		this.vertices = [
			-x, x, 0,	//0
			-x, -x, 0,	//1
			x, -x, 0,	//2

			-x, x, 0,	//0
			-x, -x, 0,	//1
			x, -x, 0	//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1

		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		this.texCoords = [
			0, 0.5,
			0, 1,
			0.5, 1,

			0, 0.5,
			0, 1,
			0.5, 1
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}