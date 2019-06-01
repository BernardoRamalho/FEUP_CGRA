attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
	vTextureCoord = aTextureCoord;
	vec4 map = texture2D(uSampler2, vec2(timeFactor*0.01,timeFactor*0.01)+vTextureCoord);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+aVertexNormal*map.rgb*0.05, 1.0);
}