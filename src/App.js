import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import './globals.css';
import { FaArrowUp } from 'react-icons/fa';

const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Schedule = lazy(() => import('./components/Schedule'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Community = lazy(() => import('./components/Community'));
const Footer = lazy(() => import('./components/Footer'));

function LoadingScreen() {
  return (
    <div className="loadingScreen">
      <div className="loadingBrand glow-text">JANEEN</div>
      <style>{`
        .loadingScreen{
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: #0A0A0F;
          display:grid;
          place-items:center;
        }
        .loadingBrand{
          font-family: var(--font-display);
          color: var(--color-primary);
          letter-spacing: 0.22em;
          font-weight: 800;
          font-size: 1.35rem;
          animation: pulseBrand 1.1s ease-in-out infinite;
        }
        @keyframes pulseBrand{
          0%,100%{ opacity: 0.55; transform: translateY(0); }
          50%{ opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const cursorRef = useRef(null);
  const cursorTarget = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      cursorTarget.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = cursorRef.current;
      if (el) {
        const dx = cursorTarget.current.x - cursorPos.current.x;
        const dy = cursorTarget.current.y - cursorPos.current.y;
        cursorPos.current.x += dx * 0.18;
        cursorPos.current.y += dy * 0.18;
        el.style.transform = `translate3d(${cursorPos.current.x - 5}px, ${cursorPos.current.y - 5}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const suspenseFallback = useMemo(
    () => <div style={{ minHeight: 1 }} />,
    []
  );

  return (
    <div className="app">
      {loading && <LoadingScreen />}

      <div ref={cursorRef} className="custom-cursor" />

      <Suspense fallback={suspenseFallback}>
        <Navbar />
      </Suspense>

      <main>
        <Suspense fallback={suspenseFallback}>
          <Hero />
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <About />
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <Services />
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <Schedule />
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <Community />
        </Suspense>
        <Suspense fallback={suspenseFallback}>
          <Footer />
        </Suspense>
      </main>

      {showTop && (
        <button
          className="btn btn-primary scrollTop"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
