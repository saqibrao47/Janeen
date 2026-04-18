import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function SplineScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      animate={{ y: [0, -10, 0], scale: [1, 1.015, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background: 'transparent',
          }}
        >
          <motion.div
            aria-label="Loading 3D scene"
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: 'rgba(201,168,76,0.95)',
              boxShadow: '0 0 26px rgba(201,168,76,0.45)',
            }}
            animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* <Spline scene="https://prod.spline.design/2fzdsSVagfszNxsd/scene.splinecode" onLoad={() => setLoaded(true)} /> */}
    </motion.div>
  );
}


