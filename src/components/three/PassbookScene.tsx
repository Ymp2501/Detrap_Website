import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface PassbookSceneProps {
  scrollProgress: number;
  reduceMotion?: boolean;
}

function Coin({ position, delay, color }: { position: [number, number, number]; delay: number; color: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = 0.3 + Math.sin(t * 0.4) * 0.15;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.22;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[0.34, 0.34, 0.07, 32]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.28} />
      </mesh>
      <Suspense fallback={null}>
        <Text
          position={[0, 0, 0.045]}
          rotation={[Math.PI / 2, 0, 0]}
          fontSize={0.32}
          color="#181433"
          anchorX="center"
          anchorY="middle"
        >
          ₹
        </Text>
      </Suspense>
    </group>
  );
}

export function PassbookScene({ scrollProgress, reduceMotion = false }: PassbookSceneProps) {
  const passbookRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const coins = useMemo(
    () => [
      { position: [2.6, 1.1, -0.6] as [number, number, number], delay: 0, color: "#f5c518" },
      { position: [-2.7, -0.6, -1] as [number, number, number], delay: 1.4, color: "#2bbfa0" },
      { position: [2.1, -1.4, -1.4] as [number, number, number], delay: 2.6, color: "#ff5c4d" },
      { position: [-2.2, 1.6, -0.9] as [number, number, number], delay: 0.8, color: "#f5c518" },
    ],
    []
  );

  useFrame((_state, delta) => {
    if (!passbookRef.current) return;
    const idleSpeed = reduceMotion ? 0.04 : 0.16;
    passbookRef.current.rotation.y += delta * idleSpeed;

    const scrollTilt = scrollProgress * Math.PI * 0.5;
    const targetX = -0.15 + scrollTilt * 0.35 + pointer.y * -0.18;
    const targetZ = pointer.x * 0.12;

    passbookRef.current.rotation.x = THREE.MathUtils.damp(passbookRef.current.rotation.x, targetX, 4, delta);
    passbookRef.current.rotation.z = THREE.MathUtils.damp(passbookRef.current.rotation.z, targetZ, 4, delta);
    passbookRef.current.position.y = THREE.MathUtils.damp(
      passbookRef.current.position.y,
      -scrollProgress * 0.6,
      4,
      delta
    );
  });

  return (
    <group>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} color="#fff4da" />
      <pointLight position={[-4, -2, 2]} intensity={0.7} color="#2bbfa0" />
      <pointLight position={[3, -3, -2]} intensity={0.5} color="#ff5c4d" />

      <group ref={passbookRef} position={[0, -0.1, 0]} rotation={[-0.15, 0.5, 0]}>
        {/* passbook cover */}
        <RoundedBox args={[2.4, 3.3, 0.28]} radius={0.09} smoothness={4}>
          <meshStandardMaterial color="#241d54" metalness={0.35} roughness={0.4} />
        </RoundedBox>

        {/* gold spine band */}
        <mesh position={[-1.02, 0, 0.15]}>
          <boxGeometry args={[0.34, 3.3, 0.02]} />
          <meshStandardMaterial color="#f5c518" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* embossed price tag */}
        <mesh position={[0.15, 0.35, 0.155]}>
          <boxGeometry args={[1.15, 0.55, 0.03]} />
          <meshStandardMaterial color="#f5c518" metalness={0.5} roughness={0.35} />
        </mesh>
        <Suspense fallback={null}>
          <Text position={[0.15, 0.35, 0.175]} fontSize={0.26} color="#181433" anchorX="center" anchorY="middle">
            ₹500
          </Text>

          <Text
            position={[0.15, -0.35, 0.155]}
            fontSize={0.22}
            color="#faf6ed"
            maxWidth={1.7}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            DE-TRAP
          </Text>
          <Text
            position={[0.15, -0.7, 0.155]}
            fontSize={0.1}
            color="#b7b1de"
            maxWidth={1.7}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            THE DEBT TRAP
          </Text>
        </Suspense>
      </group>

      {coins.map((c, i) => (
        <Float key={i} speed={reduceMotion ? 0 : 1.2} rotationIntensity={0} floatIntensity={reduceMotion ? 0 : 0.6}>
          <Coin position={c.position} delay={c.delay} color={c.color} />
        </Float>
      ))}
    </group>
  );
}
