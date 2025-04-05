uniform float uFrequency;
varying vec2 vUv;

void main()
{
    // wyciągnięcie wartości y z uv
    float y = vUv.y;
    float strength = mod(y * uFrequency, 1.0);

    // Kolor finalny
    vec4 color = vec4(vec3(strength), 1.0);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include <tonemapping_fragment>
    // Colorspace z Three.js
    #include <colorspace_fragment>
}