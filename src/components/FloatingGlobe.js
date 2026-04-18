import React, { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function GlobeMesh() {
  const meshRef = useRef(null);
  const baseY = 0;

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1, 2);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0025;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    meshRef.current.position.y = baseY + Math.sin(t * 1.1) * 0.08;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color="#C9A84C" wireframe />
    </mesh>
  );
}

export default function FloatingGlobe() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 18,
        right: 18,
        width: 400,
        height: 400,
        zIndex: 2,
        pointerEvents: 'none',
      }}
      className="floatingGlobe"
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 3.2], fov: 50 }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <ambientLight intensity={0.55} />
          <GlobeMesh />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </Suspense>

      <style>{`
        @media (max-width: 768px) {
          .floatingGlobe {
            width: 200px !important;
            height: 200px !important;
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}

