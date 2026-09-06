import { Suspense, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Zone {
  name: string;
  start: number;
  end: number;
  color: string;
}

const TWO_PI = Math.PI * 2;

const zones: Zone[] = [
  { name: "green", start: 0, end: (TWO_PI * 1) / 3, color: "#2bbfa0" },
  { name: "yellow", start: (TWO_PI * 1) / 3, end: (TWO_PI * 2) / 3, color: "#f5c518" },
  { name: "red", start: (TWO_PI * 2) / 3, end: TWO_PI, color: "#ff5c4d" },
];

const NEEDLE_ANGLE = Math.PI / 2;

function normalize(angle: number) {
  let a = angle % TWO_PI;
  if (a < 0) a += TWO_PI;
  return a;
}

function zoneAt(rotationZ: number): Zone {
  const angle = normalize(NEEDLE_ANGLE - rotationZ);
  return zones.find((z) => angle >= z.start && angle < z.end) ?? zones[0];
}

interface ZoneDialSceneProps {
  onZoneChange: (zone: string) => void;
  reduceMotion?: boolean;
}

export function ZoneDialScene({ onZoneChange, reduceMotion = false }: ZoneDialSceneProps) {
  const ringRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastAngle = useRef(0);
  const rotationRef = useRef(0);
  const lastZone = useRef("green");

  function angleFromPoint(x: number, y: number) {
    return Math.atan2(y, x);
  }

  function handleDown(e: ThreeEvent<PointerEvent>) {
    dragging.current = true;
    lastAngle.current = angleFromPoint(e.point.x, e.point.y);
  }

  function handleMove(e: ThreeEvent<PointerEvent>) {
    if (!dragging.current || !ringRef.current) return;
    const angle = angleFromPoint(e.point.x, e.point.y);
    let delta = angle - lastAngle.current;
    if (delta > Math.PI) delta -= TWO_PI;
    if (delta < -Math.PI) delta += TWO_PI;
    rotationRef.current += delta;
    lastAngle.current = angle;
    ringRef.current.rotation.z = rotationRef.current;

    const z = zoneAt(rotationRef.current);
    if (z.name !== lastZone.current) {
      lastZone.current = z.name;
      onZoneChange(z.name);
    }
  }

  function handleUp() {
    dragging.current = false;
  }

  useFrame((_state, delta) => {
    if (!ringRef.current) return;
    if (!dragging.current && !reduceMotion) {
      rotationRef.current += delta * 0.12;
      ringRef.current.rotation.z = rotationRef.current;
      const z = zoneAt(rotationRef.current);
      if (z.name !== lastZone.current) {
        lastZone.current = z.name;
        onZoneChange(z.name);
      }
    }
  });

  return (
    <group>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />

      {/* invisible drag surface */}
      <mesh
        position={[0, 0, -0.3]}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerLeave={handleUp}
      >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group ref={ringRef}>
        {zones.map((z) => (
          <mesh key={z.name} rotation={[0, 0, 0]}>
            <ringGeometry args={[1.15, 1.7, 64, 1, z.start, z.end - z.start]} />
            <meshStandardMaterial color={z.color} side={THREE.DoubleSide} emissive={z.color} emissiveIntensity={0.25} />
          </mesh>
        ))}
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * TWO_PI;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.42, Math.sin(a) * 1.42, 0.02]} rotation={[0, 0, a]}>
              <boxGeometry args={[0.04, 0.1, 0.02]} />
              <meshStandardMaterial color="#0f0c26" />
            </mesh>
          );
        })}
      </group>

      {/* fixed needle */}
      <group rotation={[0, 0, NEEDLE_ANGLE]}>
        <mesh position={[0, 1.0, 0.1]}>
          <coneGeometry args={[0.16, 0.5, 3]} />
          <meshStandardMaterial color="#faf6ed" />
        </mesh>
        <mesh position={[0, 0.55, 0.1]}>
          <boxGeometry args={[0.06, 0.6, 0.06]} />
          <meshStandardMaterial color="#faf6ed" />
        </mesh>
      </group>

      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#181433" />
      </mesh>
      <Suspense fallback={null}>
        <Text position={[0, 0, 0.11]} fontSize={0.18} color="#faf6ed" anchorX="center" anchorY="middle">
          PDC
        </Text>
      </Suspense>
    </group>
  );
}
