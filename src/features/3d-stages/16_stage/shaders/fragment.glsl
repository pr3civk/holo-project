uniform float uFrequency;
uniform float uTime;
uniform vec3 uColor;
uniform float uFalloff;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing){
        normal *= - 1.0;
    }
    // wyciągnięcie wartości y z uv
    float stripes = mod((vPosition.y- uTime * 0.2) * uFrequency, 1.0);
    stripes = pow(stripes, 2.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), normal) + 1.0;
    fresnel = fresnel * 0.9;

    // Falloff
    float falloff = smoothstep(uFalloff, 0.0, fresnel);

    float holo = stripes * fresnel;
    holo += fresnel * 0.75;
    holo *= falloff;
    
    // Kolor finalny
    vec3 colorRGB = mix(uColor, vec3(1.0), holo);
    vec4 finalColor = vec4(colorRGB, holo);
    gl_FragColor = finalColor;
    // Tonemapping z Three.js
    #include <tonemapping_fragment>
    // Colorspace z Three.js
    #include <colorspace_fragment>
}