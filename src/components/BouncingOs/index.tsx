'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, type PanInfo } from 'framer-motion';

interface BouncingO {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

interface BouncingOsProps {
  colors: string[];
  count?: number;
  size?: number;
  opacity?: number;
}

export default function BouncingOs({ 
  colors, 
  count = 6, 
  size = 100, 
  opacity = 1 
}: BouncingOsProps) {
  const [bouncingOs, setBouncingOs] = useState<BouncingO[]>([]);
  const [draggedO, setDraggedO] = useState<number | null>(null);
  const [hoveredO, setHoveredO] = useState<number | null>(null);
  const animationRef = useRef<number>();
  
  // Memoize constants to prevent unnecessary re-renders
  const O_SIZE = useMemo(() => size, [size]);
  const viewportDimensions = useMemo(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  }), []);

  // Memoized initialization function
  const initializeOs = useCallback(() => {
    const { width, height } = viewportDimensions;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * (width - 100),
      y: Math.random() * (height - 100),
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0] ?? '',
      size: O_SIZE
    }));
  }, [count, O_SIZE, colors, viewportDimensions]);

  // Initialize O's only once
  useEffect(() => {
    if (bouncingOs.length === 0) {
      setBouncingOs(initializeOs());
    }
  }, [bouncingOs.length, initializeOs]);

  // Optimized physics animation loop
  const physicsUpdate = useCallback((prev: BouncingO[]) => {
    const { width, height } = viewportDimensions;
    
    return prev.map(o => {
      // Skip physics for the dragged or hovered O
      if (draggedO === o.id || hoveredO === o.id) return o;

      let newX = o.x + o.vx;
      let newY = o.y + o.vy;
      let newVx = o.vx;
      let newVy = o.vy;

      // Bounce off walls with energy loss
      if (newX <= 0 || newX >= width) {
        newVx = -newVx * 0.9;
        newX = Math.max(0, Math.min(newX, width));
      }
      if (newY <= 0 || newY >= height) {
        newVy = -newVy * 0.9;
        newY = Math.max(0, Math.min(newY, height));
      }

      return { ...o, x: newX, y: newY, vx: newVx, vy: newVy };
    });
  }, [draggedO, hoveredO, viewportDimensions]);

  // Physics animation loop
  useEffect(() => {
    if (bouncingOs.length === 0) return;

    const animate = () => {
      setBouncingOs(prev => {
        const updated = physicsUpdate(prev);

        // Handle collisions
        handleCollisions(updated);

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bouncingOs.length, physicsUpdate]);

  // Optimized collision detection
  const handleCollisions = useCallback((os: BouncingO[]) => {
    for (let i = 0; i < os.length; i++) {
      for (let j = i + 1; j < os.length; j++) {
        const o1 = os[i];
        const o2 = os[j];
        
        // Skip collision if either O is being dragged or hovered
        if (draggedO === o1.id || draggedO === o2.id || hoveredO === o1.id || hoveredO === o2.id) continue;
        
        const dx = o2.x - o1.x;
        const dy = o2.y - o1.y;
        const distanceSquared = dx * dx + dy * dy;
        const collisionRadius = O_SIZE;
        
        if (distanceSquared < collisionRadius * collisionRadius) {
          const distance = Math.sqrt(distanceSquared);
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);
          
          // Rotate velocities
          const vx1 = o1.vx * cos + o1.vy * sin;
          const vy1 = o1.vy * cos - o1.vx * sin;
          const vx2 = o2.vx * cos + o2.vy * sin;
          const vy2 = o2.vy * cos - o2.vx * sin;
          
          // Swap velocities (elastic collision)
          const finalVx1 = vx2;
          const finalVx2 = vx1;
          
          // Rotate back
          os[i].vx = finalVx1 * cos - vy1 * sin;
          os[i].vy = vy1 * cos + finalVx1 * sin;
          os[j].vx = finalVx2 * cos - vy2 * sin;
          os[j].vy = vy2 * cos + finalVx2 * sin;
          
          // Separate O's to prevent overlap
          const overlap = collisionRadius - distance;
          const separationX = (dx / distance) * overlap * 0.5;
          const separationY = (dy / distance) * overlap * 0.5;
          
          os[i].x -= separationX;
          os[i].y -= separationY;
          os[j].x += separationX;
          os[j].y += separationY;
        }
      }
    }
  }, [draggedO, hoveredO, O_SIZE]);

  // Memoized drag handlers for better performance
  const handleDragStart = useCallback((oId: number) => {
    setDraggedO(oId);
    setBouncingOs(prev => prev.map(o => 
      o.id === oId ? { ...o, vx: 0, vy: 0 } : o
    ));
  }, []);

  const handleDragEnd = useCallback((oId: number, event: any, info: PanInfo) => {
    setDraggedO(null);
    const velocityX = info.velocity.x * 0.01;
    const velocityY = info.velocity.y * 0.01;
    setBouncingOs(prev => prev.map(o => 
      o.id === oId ? { ...o, vx: velocityX, vy: velocityY } : o
    ));
  }, []);

  // Memoized hover handlers
  const handleMouseEnter = useCallback((oId: number) => {
    setHoveredO(oId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredO(null);
  }, []);

  // Memoized animation variants for better performance
  const motionVariants = useMemo(() => ({
    default: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    drag: { 
      cursor: 'grabbing',
      scale: 1.1,
      zIndex: 1000
    }
  }), []);

  return (
    <>
      {bouncingOs.map((o) => (
        <motion.div
          key={o.id}
          className="absolute cursor-grab select-none"
          style={{
            left: `${o.x}px`,
            top: `${o.y}px`,
            fontSize: `${O_SIZE}px`,
            color: o.color,
            fontFamily: 'var(--font-jakarta)',
            fontWeight: '800',
            opacity: opacity,
            transform: 'translate(-50%, -50%)'
          }}
          drag
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => handleDragStart(o.id)}
          onDragEnd={(event, info) => handleDragEnd(o.id, event, info)}
          onMouseEnter={() => handleMouseEnter(o.id)}
          onMouseLeave={handleMouseLeave}
          variants={motionVariants}
          whileDrag="drag"
          whileTap="tap"
          animate={hoveredO === o.id ? "hover" : "default"}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          O
        </motion.div>
      ))}
    </>
  );
}
