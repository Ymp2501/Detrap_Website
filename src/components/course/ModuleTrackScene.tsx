import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModuleTrackSceneProps {
  total: number;
  activeIndex: number;
  colors: string[];
  reduceMotion?: boolean;
}

const SPAN = 7.2;

function xFor(i: number, total: number) {
  if (total <= 1) return 0;
  return -SPAN / 2 + (SPAN * i) / (total - 1);
}

function Node({ x, color, active, reduceMotion }: { x: number; color: string; active: boolean; reduceMotion?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const targetScale = active ? 1.55 : 1;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const bob = reduceMotion ? 0 : Math.sin(t * 1.6 + x) * 0.06;
    ref.current.position.y = bob + (active ? 0.05 : 0);
    const s = THREE.MathUtils.damp(ref.current.scale.x, targetScale, 6, delta);
    ref.current.scale.setScalar(s);
    if (!reduceMotion) {
      ref.current.rotation.y += delta * (active ? 0.9 : 0.3);
    }
  });

  return (
    <mesh ref={ref} position={[x, 0, 0]}>
      <icosahedronGeometry args={[0.26, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={active ? color : "#000000"}
        emissiveIntensity={active ? 0.55 : 0}
        metalness={0.4}
        roughness={0.35}
      />
    </mesh>
  );
}

function Puck({ total, activeIndex, reduceMotion }: { total: number; activeIndex: number; reduceMotion?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const targetX = xFor(activeIndex, total);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 5, delta);
    if (!reduceMotion) {
      ref.current.position.y = 0.46 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05;
    } else {
      ref.current.position.y = 0.46;
    }
  });

  return (
    <mesh ref={ref} position={[targetX, 0.46, 0]}>
      <sphereGeometry args={[0.11, 20, 20]} />
      <meshStandardMaterial color="#f5c518" emissive="#f5c518" emissiveIntensity={0.8} />
    </mesh>
  );
}

export function ModuleTrackScene({ total, activeIndex, colors, reduceMotion }: ModuleTrackSceneProps) {
  const fillRef = useRef<THREE.Mesh>(null);
  const targetFillScale = total > 1 ? Math.max(0.001, activeIndex / (total - 1)) : 1;

  useFrame((_state, delta) => {
    if (!fillRef.current) return;
    const s = THREE.MathUtils.damp(fillRef.current.scale.x, targetFillScale, 5, delta);
    fillRef.current.scale.x = s;
  });

  return (
    <group position={[0, -0.1, 0]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1} />

      {/* base track */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[SPAN + 0.4, 0.05, 0.05]} />
        <meshStandardMaterial color="#2a2358" />
      </mesh>

      {/* progress fill, anchored to the left */}
      <mesh ref={fillRef} position={[-SPAN / 2 - 0.2, 0, 0.01]}>
        <boxGeometry args={[SPAN + 0.4, 0.06, 0.06]} />
        <meshStandardMaterial color="#f5c518" emissive="#f5c518" emissiveIntensity={0.3} />
      </mesh>

      {Array.from({ length: total }).map((_, i) => (
        <Node key={i} x={xFor(i, total)} color={colors[i % colors.length]} active={i === activeIndex} reduceMotion={reduceMotion} />
      ))}

      <Puck total={total} activeIndex={activeIndex} reduceMotion={reduceMotion} />
    </group>
  );
}
