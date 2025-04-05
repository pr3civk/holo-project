varying vec2 vUv;

void main()
{
    // wyciągnięcie wartości x z uv
    float x = vUv.x;

    // Kolor finalny
    vec4 color = vec4(vec3(x), 1.0);
    gl_FragColor = color;
    // Tonemapping z Three.js
    #include <tonemapping_fragment>
    // Colorspace z Three.js
    #include <colorspace_fragment>
}