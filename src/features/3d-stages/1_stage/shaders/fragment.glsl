void main()
{
    // Kolor finalny
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    // Tonemapping z Three.js
    #include <tonemapping_fragment>
    // Colorspace z Three.js
    #include <colorspace_fragment>
}