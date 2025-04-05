uniform float uFrequency;
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vPosition.y;
    float stripes = mod((y- uTime * 0.1) * uFrequency, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = vPosition - cameraPosition;
    float fresnel = dot(normalize(viewDirection), vNormal) + 1.0;
    fresnel = pow(fresnel, 3.0);

    // Kolor finalny
    vec4 color = vec4(vec3(1.0), fresnel);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include <tonemapping_fragment>
    // Colorspace z Three.js
    #include <colorspace_fragment>
}