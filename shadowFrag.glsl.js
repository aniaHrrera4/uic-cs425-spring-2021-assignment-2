export default `#version 300 es 

precision highp float;

uniform sampler2D uSampler;
vec3 projCoords;
float shadow;


in vec4 vColor;
in vec4 vLightSpacePos;
out vec4 outColor;

vec3 shadowCalculation(vec4 lightSpacePos) {
    // TODO: shadow calculation
    vec3 projCoords = lightSpacePos.xyz / lightSpacePos.w;

    return projCoords;

}

void main() {
    // TODO: compute shadowmap coordenates 
    projCoords = shadowCalculation(vLightSpacePos);
   // projCoords = projCoords * 0.5 + 0.5;

    
    float closestDepth = texture(uSampler, projCoords.xy).r;

    float currentDepth = projCoords.z; 
    float shadow = currentDepth > closestDepth ? 1.0 : 0.0;

    outColor = vec4(vColor.rgb*(1.0-shadow),1.0);


    // TODO: evaluate if point is in shadow or not

    vec2 texelSize;
    texelSize.x = float(1 / textureSize(uSampler, 0).x);
    texelSize.y = float(1 / textureSize(uSampler, 0).y);


    for(int x = -1; x <= 1; ++x){
        for(int y = -1; y <= 1; ++y){
            float pcfDepth = texture(uSampler, projCoords.xy + vec2(x, y)* texelSize).r;
             //shadow += currentDepth -bias > pcfDepth ? 1.0 : 0.0;
             shadow += currentDepth  > pcfDepth ? 1.0 : 0.0;

        }
    }
    shadow /= 9.0;

    
}
`;