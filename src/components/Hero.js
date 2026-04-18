import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaTiktok, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import FloatingGlobe from './FloatingGlobe';
import SplineScene from './SplineScene';
import { useTypewriter } from '../hooks/useScrollAnimation';

const SOCIAL = [
  { label: 'TikTok', Icon: FaTiktok, href: 'https://www.tiktok.com/@janeen16' },
  { label: 'WhatsApp', Icon: FaWhatsapp, href: 'https://www.whatsapp.com/channel/0029Vb7GtAaDp2Q7hYRrKu1I' },
  { label: 'Instagram', Icon: FaInstagram, href: 'https://instagram.com/YOUR_INSTAGRAM' },
  { label: 'YouTube', Icon: FaYoutube, href: 'https://youtube.com/@YOUR_YOUTUBE' },
];

export default function Hero() {
  const { text } = useTypewriter(['Forex Trader', 'TikTok Live Host', 'Exness Affiliate'], 80);

  return (
    <header className="hero" id="top">
      <div className="bg-accent" />
      <SplineScene />
      <FloatingGlobe />

      <div className="container heroInner">
        <motion.p
          className="heroKicker"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Free Signals • Live Analysis • Community
        </motion.p>

        <motion.h1
          className="heroTitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.05 }}
        >
          I'm <span className="glow-text" style={{ color: 'var(--color-primary)' }}>JANEEN</span>
        </motion.h1>

        <motion.p
          className="heroRole"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
        >
          {text}
          <span className="caret" aria-hidden="true" />
        </motion.p>

        <motion.p
          className="heroDesc"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.18 }}
        >
         All signal. No noise.Exclusive access to live hosting, curated alerts, and a gated WhatsApp community, rooted in discipline, refined by knowledge, executed with precision.
        </motion.p>

        <motion.div
          className="heroCtas"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.25 }}
        >
          <Link to="community" smooth duration={600} offset={-84} className="btn btn-primary">
            Join the Community
          </Link>
          <Link to="schedule" smooth duration={600} offset={-84} className="btn">
            See Live Schedule
          </Link>
        </motion.div>

        <motion.div
          className="heroSocial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="heroIcon" aria-label={s.label}>
              <s.Icon size={22} />
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero{
          position: relative;
          min-height: 80vh;
          display:flex;
          align-items:center;
          padding: 120px 5% 80px;
          overflow:hidden;
        }
        .heroInner{
          position: relative;
          z-index: 1;
          max-width: 820px;
        }
        .heroKicker{
          margin: 0 0 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 0.78rem;
          opacity: 0.85;
        }
        .heroTitle{
          margin: 0 0 10px;
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          line-height: 1.05;
        }
        .heroRole{
          margin: 0 0 14px;
          font-size: 1.2rem;
          font-weight: 700;
          opacity: 0.95;
        }
        .caret{
          display:inline-block;
          width: 10px;
          height: 1.05em;
          margin-left: 6px;
          background: rgba(201,168,76,0.9);
          transform: translateY(3px);
          animation: blink 1s step-end infinite;
        }
        @keyframes blink{ 50%{ opacity: 0; } }
        .heroDesc{
          margin: 0 0 22px;
          line-height: 1.75;
          opacity: 0.9;
          max-width: 640px;
        }
        .heroCtas{
          display:flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .heroSocial{
          margin-top: 20px;
          display:flex;
          gap: 12px;
          align-items:center;
        }
        .heroIcon{
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display:grid;
          place-items:center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.22);
          color: var(--color-primary);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .heroIcon:hover{
          transform: translateY(-2px);
          box-shadow: 0 0 24px rgba(201,168,76,0.2);
        }
        @media (max-width: 768px){
          .hero{
            padding: 110px 4% 0px;
          }
        }
      `}</style>
    </header>
  );
}

