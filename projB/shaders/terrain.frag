#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;


void main() {
	
	vec4 map = texture2D(uSampler2, vTextureCoord);

	vec4 color = texture2D(uSampler, vTextureCoord );
	vec4 color1 = texture2D(uSampler3, vec2(1.0-map.r));
	gl_FragColor =  color1 *color;

}