#include "./utils/random2d.glsl"

uniform float uTime;
uniform float uHoverGlitch;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    // Generujemy losowe "ziarna" dla różnych aspektów glitcha
    float glitchSeed = floor(uTime * 0.8);
    float nextGlitchSeed = glitchSeed + 1.0;
    float transitionFactor = fract(uTime * 0.8);
    
    
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
    float glitchCenterY2 = 0.0 + random2D(vec2(glitchSeed + 0.5, 0.3)) * 10.0 - 5.0;
    
    
    // Glitch porusza się w górę z losową prędkością
    float glitchSpeed = 1.0 + durationSeed * 2.0;
    float movingGlitchY = glitchCenterY + mod(uTime * glitchSpeed, 15.0);
    float movingGlitchY2 = glitchCenterY2 + mod(uTime * (glitchSpeed * 0.7), 15.0); // Drugi glitch z inną prędkością
    

    // Siła glitcha zależy od odległości od poruszającego się centrum
    float glitchDistance = min(
        abs(modelPosition.y - movingGlitchY),
        abs(modelPosition.y - movingGlitchY2)
    );
    float glitchStrength = smoothstep(1.8, 0.0, glitchDistance); // Zwiększony zasięg
    
    // Dodajemy losowe fluktuacje do siły glitcha
    glitchStrength *= sin(uTime * 4.0 + modelPosition.y) * 0.5 + 0.5;
    
    // Dodajemy dodatkowy czynnik, który zapewnia, że glitch pojawia się regularnie
    float regularGlitch = step(0.7, sin(uTime * 0.4) * 0.5 + 0.5); // Regularny puls co kilka sekund
    glitchStrength = max(glitchStrength, regularGlitch * 0.1 * (random2D(vec2(position.x + uTime, position.y - uTime)) * 0.8 + 0.2));
    
    // Dodajemy płynne wygaszanie przy zmianie ziarna
    glitchStrength *= 1.0 - smoothstep(0.7, 1.0, transitionFactor);
    
    glitchStrength *= 0.2; // Zwiększona ogólna siła efektu
    
    // Dodajemy efekt glitcha przy najechaniu myszą
    float hoverGlitchEffect = random2D(vec2(position.x * 50.0 + uTime, position.y * 50.0 - uTime)) * uHoverGlitch * 0.2;
    
    // Aplikujemy glitch
    modelPosition.x += (random2D(modelPosition.xz + uTime * 0.5) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime * 0.7) - 0.5) * glitchStrength;
    
    // Aplikujemy glitch przy najechaniu
    modelPosition.x += (random2D(position.xy + uTime * 2.0) - 0.5) * hoverGlitchEffect;
    modelPosition.y += (random2D(position.yz + uTime * 1.5) - 0.5) * hoverGlitchEffect;
    modelPosition.z += (random2D(position.zx + uTime * 1.8) - 0.5) * hoverGlitchEffect;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Normal model
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}