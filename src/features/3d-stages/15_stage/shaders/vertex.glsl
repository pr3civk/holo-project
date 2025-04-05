#include "./utils/random2d.glsl"

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    // Generujemy losowe "ziarna" dla różnych aspektów glitcha
    float glitchSeed = floor(uTime * 0.5); // Zmienia się co 2 sekundy
    float nextGlitchSeed = glitchSeed + 1.0; // Następne ziarno
    float transitionFactor = fract(uTime * 0.5); // Współczynnik przejścia między ziarnami
    
    // Interpolujemy między bieżącym a następnym ziarnem
    float locationSeed = mix(
        random2D(vec2(glitchSeed, 0.0)),
        random2D(vec2(nextGlitchSeed, 0.0)),
        smoothstep(0.8, 1.0, transitionFactor) // Płynne przejście pod koniec cyklu
    );
    
    float durationSeed = mix(
        random2D(vec2(glitchSeed, 1.0)),
        random2D(vec2(nextGlitchSeed, 1.0)),
        smoothstep(0.8, 1.0, transitionFactor)
    );
    
    // Określamy centrum glitcha (losowe miejsce)
    float glitchCenterY = -5.0 + locationSeed * 10.0;
    
    // Glitch porusza się w górę z losową prędkością
    float glitchSpeed = 1.0 + durationSeed * 2.0; // Prędkość między 1.0 a 3.0
    float movingGlitchY = glitchCenterY + mod(uTime * glitchSpeed, 15.0); // Porusza się w górę i resetuje

    // Siła glitcha zależy od odległości od poruszającego się centrum
    float glitchDistance = abs(modelPosition.y - movingGlitchY);
    float glitchStrength = smoothstep(1.5, 0.0, glitchDistance); // Silniejszy bliżej centrum
    
    // Dodajemy losowe fluktuacje do siły glitcha
    glitchStrength *= sin(uTime * 4.0 + modelPosition.y) * 0.5 + 0.5;
    
    // Dodajemy płynne wygaszanie przy zmianie ziarna
    glitchStrength *= 1.0 - smoothstep(0.7, 0.99, transitionFactor);
    
    glitchStrength *= 0.15; // Kontrola ogólnej siły efektu
    
    // Aplikujemy glitch
    modelPosition.x += (random2D(modelPosition.xz + uTime * 0.5) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime * 0.7) - 0.5) * glitchStrength;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Normal model
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}