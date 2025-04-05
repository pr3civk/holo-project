varying vec2 vUv;

void main()
{

    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;


    // Uv z modelu
    vUv = uv;
}