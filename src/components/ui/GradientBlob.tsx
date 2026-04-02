"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uMouseVelocity;
  uniform float uDisturbance;
  varying vec2 vUv;

  // Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // Mouse in same coordinate space
    vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
    vec2 vel = uMouseVelocity * vec2(aspect, 1.0);
    float velLen = length(vel);

    // --- Water ripple waves from mouse ---
    vec2 toMouse = p - mouse;
    float dist = length(toMouse);
    vec2 radialDir = dist > 0.001 ? normalize(toMouse) : vec2(0.0);

    // Ripple rings — multiple frequencies, decay with distance
    // Multiply by dist so waves are zero AT the cursor (no dot) and grow outward
    float phase = uTime * 2.5;
    float ripple1 = sin(dist * 12.0 - phase)             * exp(-dist * 1.8) * dist;
    float ripple2 = sin(dist * 8.0  - phase * 0.65 + 2.0) * exp(-dist * 1.3) * dist;
    float ripple3 = sin(dist * 18.0 - phase * 1.3)        * exp(-dist * 3.0) * dist;

    float ripples = ripple1 * 0.5 + ripple2 * 0.35 + ripple3 * 0.15;

    // Directional wake — waves stronger in direction of movement
    vec2 velDir = velLen > 0.0001 ? normalize(vel) : vec2(0.0);
    float wake = dot(radialDir, velDir) * 0.35 + 0.65;
    wake = mix(1.0, wake, smoothstep(0.0, 0.25, uDisturbance));

    // UV warp from ripples — subtle coordinate distortion
    float warpAmp = uDisturbance * 0.05;
    vec2 wp = p + radialDir * ripples * warpAmp * wake;

    // Noise layers on warped coordinates
    float n1 = snoise(wp * 1.5 + vec2(t * 0.7, t * 0.5));
    float n2 = snoise(wp * 2.2 + vec2(-t * 0.5, t * 0.8));
    float n3 = snoise(wp * 0.8 + vec2(t * 0.3, -t * 0.4));

    // Blob centers — slow organic drift + subtle mouse attraction
    float mouseInfluence = 0.15;
    vec2 b1 = vec2(-0.15 + n3 * 0.1, 0.1 + n1 * 0.08) + (mouse - vec2(-0.15, 0.1)) * mouseInfluence;
    vec2 b2 = vec2(0.25 + n1 * 0.1, -0.05 + n2 * 0.08) + (mouse - vec2(0.25, -0.05)) * mouseInfluence;
    vec2 b3 = vec2(0.0 + n2 * 0.08, 0.2 + n3 * 0.06) + (mouse - vec2(0.0, 0.2)) * mouseInfluence;

    // Soft distances on warped space
    float d1 = length(wp - b1);
    float d2 = length(wp - b2);
    float d3 = length(wp - b3);

    // Smooth blobs — large, soft falloff
    float blob1 = smoothstep(0.55, 0.0, d1 + n1 * 0.15);
    float blob2 = smoothstep(0.5, 0.0, d2 + n2 * 0.12);
    float blob3 = smoothstep(0.45, 0.0, d3 + n3 * 0.1);

    // Colors
    vec3 pink   = vec3(0.92, 0.25, 0.62);
    vec3 purple = vec3(0.55, 0.18, 0.82);
    vec3 blue   = vec3(0.30, 0.45, 0.95);
    vec3 base   = vec3(0.95, 0.95, 0.96);

    // Compose with smooth mix
    vec3 color = base;
    color = mix(color, pink,   blob1 * 0.85);
    color = mix(color, purple, blob2 * 0.75);
    color = mix(color, blue,   blob3 * 0.6);

    // Visible wave caustics — bright/dark rings you can actually see
    float caustic1 = sin(dist * 12.0 - phase)             * exp(-dist * 1.8) * dist;
    float caustic2 = sin(dist * 8.0  - phase * 0.65 + 2.0) * exp(-dist * 1.3) * dist;
    float caustics = (caustic1 * 0.6 + caustic2 * 0.4) * uDisturbance * wake;
    color += caustics * 0.18;

    // Vignette
    float vignette = 1.0 - smoothstep(0.4, 1.2, length(p));
    color = mix(base, color, vignette * 0.9 + 0.1);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseCurrent = useRef(new THREE.Vector2(0.5, 0.5));
  const mousePrev = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityCurrent = useRef(new THREE.Vector2(0, 0));
  const disturbance = useRef(0);
  const { gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
      uDisturbance: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseTarget.current.set(
        Math.max(0, Math.min(1, x)),
        Math.max(0, Math.min(1, y))
      );
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [gl]);

  useFrame(({ clock, size }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);

    mousePrev.current.copy(mouseCurrent.current);

    // Slow trailing — gradient drifts behind the cursor
    mouseCurrent.current.lerp(mouseTarget.current, 0.018);
    uniforms.uMouse.value.copy(mouseCurrent.current);

    // Velocity with smooth lerp
    const rawVelocity = new THREE.Vector2().subVectors(mouseCurrent.current, mousePrev.current);
    velocityCurrent.current.lerp(rawVelocity, 0.06);
    uniforms.uMouseVelocity.value.copy(velocityCurrent.current);

    // Disturbance energy — builds when mouse moves, slowly decays (waves persist)
    const speed = rawVelocity.length();
    disturbance.current = Math.min(1, disturbance.current + speed * 120);
    disturbance.current *= 0.988; // slow decay so ripples linger
    uniforms.uDisturbance.value = disturbance.current;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function GradientBlob() {
  return (
    <div className="h-full w-full">
      <Canvas
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
      >
        <GradientMesh />
      </Canvas>
    </div>
  );
}
