import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useWebGLSupport } from "../../hooks/useWebGL";

interface SceneCanvasProps {
  children: ReactNode;
  fallback: ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  className?: string;
  dpr?: [number, number];
}

export function SceneCanvas({ children, fallback, camera, className, dpr = [1, 1.75] }: SceneCanvasProps) {
  const webglSupported = useWebGLSupport();

  if (webglSupported === false) {
    return <div className={className}>{fallback}</div>;
  }

  if (webglSupported === null) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: camera?.position ?? [0, 0, 8], fov: camera?.fov ?? 40 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
