import React from 'react';
import { motion } from 'framer-motion';

export default function SplineScene() {
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      animate={{ y: [0, -10, 0], scale: [1, 1.015, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

