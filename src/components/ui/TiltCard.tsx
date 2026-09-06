import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  lift?: number;
  float?: boolean;
  floatDelay?: number;
}

export function TiltCard({
  children,
  className,
  style,
  maxTilt = 10,
  lift = 14,
  float = true,
  floatDelay = 0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
      style={{
        ...style,
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={float ? { y: [0, -8, 0] } : undefined}
      whileHover={{ y: -lift, scale: 1.015 }}
      transition={{
        default: { type: "spring", stiffness: 260, damping: 20 },
        y: { duration: 5 + (floatDelay % 3), repeat: Infinity, ease: "easeInOut", delay: floatDelay },
      }}
    >
      {children}
    </motion.div>
  );
}
