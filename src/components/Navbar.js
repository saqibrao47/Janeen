import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Schedule', to: 'schedule' },
  { label: 'Videos', to: 'videos' },
  { label: 'Community', to: 'community' },
  { label: 'Join Now', to: 'community' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navStyle = useMemo(
    () => ({
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '14px 5%',
      transition: 'all 220ms ease',
      background: scrolled ? 'rgba(10,10,15,0.8)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    }),
    [scrolled]
  );

  return (
    <>
      <nav style={navStyle}>
        <div className="navInner">
          <div className="navLogo">
            <span className="glow-text">JANEEN</span>
          </div>

          <div className="navLinks">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                spy
                smooth
                duration={600}
                offset={-84}
                activeClass="active"
                className="navLink"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button className="hamburger" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
            <motion.span
              className="hamLine"
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="hamLine"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.16 }}
            />
            <motion.span
              className="hamLine"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileOverlay"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
          >
            <div className="mobileLinks glass">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  spy
                  smooth
                  duration={600}
                  offset={-84}
                  className="mobileLink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navInner{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
        }
        .navLogo{
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: 0.18em;
          font-size: 0.95rem;
        }
        .navLinks{
          display:flex;
          align-items:center;
          gap:22px;
        }
        .navLink{
          position:relative;
          font-weight:600;
          opacity:0.92;
          cursor:pointer;
          padding:10px 0;
        }
        .navLink:hover{ opacity: 1; }
        .navLink.active{
          color: var(--color-primary);
        }
        .navLink.active::after{
          content:'';
          position:absolute;
          left:0;
          right:0;
          bottom:2px;
          height:2px;
          background: var(--color-primary);
          border-radius:999px;
        }
        .hamburger{
          display:none;
          width:44px;
          height:44px;
          border-radius:12px;
          border:1px solid rgba(201,168,76,0.25);
          background: rgba(255,255,255,0.03);
          cursor:pointer;
          padding:10px;
        }
        .hamLine{
          display:block;
          height:2px;
          width:100%;
          background: var(--color-primary);
          border-radius:999px;
          transform-origin:center;
        }
        .hamburger .hamLine + .hamLine{ margin-top:7px; }
        .mobileOverlay{
          position:fixed;
          inset:0;
          z-index:1100;
          background: rgba(10,10,15,0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display:flex;
          justify-content:flex-end;
          padding: 86px 4% 24px;
        }
        .mobileLinks{
          width:min(520px, 100%);
          padding:24px;
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .mobileLink{
          font-family: var(--font-display);
          font-size: 1.4rem;
          letter-spacing: 0.04em;
          padding: 12px 8px;
          cursor:pointer;
        }
        @media (max-width: 920px){
          .navLinks{ display:none; }
          .hamburger{ display:block; }
        }
      `}</style>
    </>
  );
}

