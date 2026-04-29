"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { ThreeFallback } from "./ThreeFallback";

const LAND_MAP_WIDTH = 160;
const LAND_MAP_HEIGHT = 80;

function isLandLike(lon: number, lat: number): boolean {
  const blobs = [
    { lon: -105, lat: 47, rx: 36, ry: 20 },
    { lon: -85, lat: 28, rx: 24, ry: 15 },
    { lon: -120, lat: 58, rx: 24, ry: 13 },
    { lon: -62, lat: -12, rx: 20, ry: 31 },
    { lon: -70, lat: -37, rx: 13, ry: 22 },
    { lon: 12, lat: 49, rx: 22, ry: 14 },
    { lon: 20, lat: 8, rx: 26, ry: 34 },
    { lon: 28, lat: -23, rx: 18, ry: 24 },
    { lon: 70, lat: 48, rx: 42, ry: 19 },
    { lon: 103, lat: 30, rx: 34, ry: 18 },
    { lon: 78, lat: 18, rx: 18, ry: 16 },
    { lon: 120, lat: 8, rx: 18, ry: 15 },
    { lon: 134, lat: -25, rx: 22, ry: 13 },
    { lon: 139, lat: 38, rx: 7, ry: 12 },
    { lon: -42, lat: 73, rx: 17, ry: 9 },
  ];

  let strength = 0;
  for (const blob of blobs) {
    const dx = Math.abs(lon - blob.lon);
    const dy = Math.abs(lat - blob.lat);
    const d =
      (dx * dx) / (blob.rx * blob.rx) + (dy * dy) / (blob.ry * blob.ry);
    if (d < 1) strength += 1 - d;
  }

  const ripple =
    Math.sin((lon + 22) * 0.18) * 0.08 +
    Math.sin((lat - 7) * 0.27) * 0.07 +
    Math.sin((lon + lat) * 0.11) * 0.05;

  return strength + ripple > 0.22;
}

// --- Module-level data generation (avoids Math.random inside render) ---

function buildGlobePositions(): {
  landPositions: Float32Array;
  oceanPositions: Float32Array;
} {
  const radius = 2.2;
  const land: number[] = [];
  const ocean: number[] = [];

  for (let y = 0; y < LAND_MAP_HEIGHT; y++) {
    for (let x = 0; x < LAND_MAP_WIDTH; x++) {
      const lon = (x / (LAND_MAP_WIDTH - 1)) * 360 - 180;
      const lat = 90 - (y / (LAND_MAP_HEIGHT - 1)) * 180;

      const densityFix = Math.cos(THREE.MathUtils.degToRad(lat));
      if (Math.random() > Math.max(0.16, densityFix)) continue;

      const latRad = THREE.MathUtils.degToRad(lat);
      const lonRad = THREE.MathUtils.degToRad(lon);
      const noise = 1 + (Math.random() - 0.5) * 0.018;

      const px = radius * noise * Math.cos(latRad) * Math.cos(lonRad);
      const py = radius * noise * Math.sin(latRad);
      const pz = radius * noise * Math.cos(latRad) * Math.sin(lonRad);

      if (isLandLike(lon, lat)) {
        land.push(px, py, pz);
      } else if (Math.random() < 0.18) {
        ocean.push(px, py, pz);
      }
    }
  }

  return {
    landPositions: new Float32Array(land),
    oceanPositions: new Float32Array(ocean),
  };
}

function buildStarPositions(): Float32Array {
  const count = 850;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 16;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
    arr[i * 3 + 2] = -Math.random() * 9 - 1;
  }
  return arr;
}

const GLOBE_DATA = buildGlobePositions();
const STAR_POSITIONS = buildStarPositions();

// -----------------------------------------------------------------------

function GlobePoints() {
  const groupRef = useRef<THREE.Group>(null);
  const landRef = useRef<THREE.Points>(null);
  const oceanRef = useRef<THREE.Points>(null);

  const latitudeLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const radius = 2.235;
    for (let lat = -60; lat <= 60; lat += 20) {
      const points: THREE.Vector3[] = [];
      const latRad = THREE.MathUtils.degToRad(lat);
      const y = radius * Math.sin(latRad);
      const r = radius * Math.cos(latRad);
      for (let i = 0; i <= 180; i++) {
        const theta = (i / 180) * Math.PI * 2;
        points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, []);

  const longitudeLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const radius = 2.24;
    for (let lon = 0; lon < 180; lon += 20) {
      const points: THREE.Vector3[] = [];
      const lonRad = THREE.MathUtils.degToRad(lon);
      for (let i = 0; i <= 180; i++) {
        const phi = (i / 180) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(lonRad),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(lonRad)
          )
        );
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return lines;
  }, []);

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (groupRef.current) {
      groupRef.current.rotation.y = prefersReduced
        ? 0
        : elapsed * 0.075 + pointer.x * 0.38;
      groupRef.current.rotation.x = prefersReduced
        ? 0
        : -0.16 + -pointer.y * 0.22;
    }
    if (landRef.current) {
      landRef.current.rotation.y = prefersReduced
        ? 0
        : Math.sin(elapsed * 0.18) * 0.015;
    }
    if (oceanRef.current) {
      oceanRef.current.rotation.y = prefersReduced ? 0 : -elapsed * 0.012;
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={oceanRef} positions={GLOBE_DATA.oceanPositions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.009}
          sizeAttenuation
          depthWrite={false}
          opacity={0.21}
        />
      </Points>

      <Points ref={landRef} positions={GLOBE_DATA.landPositions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.019}
          sizeAttenuation
          depthWrite={false}
          opacity={0.99}
        />
      </Points>

      {latitudeLines.map((geometry, index) => (
        // @ts-expect-error - R3F line primitive
        <line key={`lat-${index}`} geometry={geometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </line>
      ))}

      {longitudeLines.map((geometry, index) => (
        // @ts-expect-error - R3F line primitive
        <line key={`lon-${index}`} geometry={geometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </line>
      ))}
    </group>
  );
}

function BackgroundStars() {
  return (
    <Points positions={STAR_POSITIONS} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.006}
        sizeAttenuation
        depthWrite={false}
        opacity={0.37}
      />
    </Points>
  );
}

export function MonochromeEarth() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,rgba(255,255,255,0.07),transparent_34%)]" />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.8]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <BackgroundStars />
        <group position={[1.32, -0.1, 0]} scale={1.2}>
          <GlobePoints />
        </group>
      </Canvas>

      {/* Left fade */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,5,5,0.94)_0%,rgba(5,5,5,0.58)_36%,rgba(5,5,5,0.12)_100%)]" />

    </div>
  );
}

export function MonochromeEarthWithFallback() {
  return (
    <EarthErrorBoundary>
      <MonochromeEarth />
    </EarthErrorBoundary>
  );
}

interface EarthErrorBoundaryState {
  hasError: boolean;
}

class EarthErrorBoundary extends React.Component<
  { children: React.ReactNode },
  EarthErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): EarthErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ThreeFallback />;
    }
    return this.props.children;
  }
}
