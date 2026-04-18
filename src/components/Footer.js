import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaTiktok, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { fadeUpVariants } from '../hooks/useScrollAnimation';

const SOCIAL = [
  { label: 'TikTok', Icon: FaTiktok, href: 'https://www.tiktok.com/@YOUR_TIKTOK' },
  { label: 'WhatsApp', Icon: FaWhatsapp, href: 'https://wa.me/0000000000' },
  { label: 'Instagram', Icon: FaInstagram, href: 'https://instagram.com/YOUR_INSTAGRAM' },
  { label: 'YouTube', Icon: FaYoutube, href: 'https://youtube.com/@YOUR_YOUTUBE' },
];

const LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Schedule', to: 'schedule' },
  { label: 'Videos', to: 'videos' },
  { label: 'Community', to: 'community' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="container footerInner"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="footerCol">
          <div className="footerLogo">JANEEN</div>
          <div className="footerTag">Trading with Purpose</div>
        </div>

        <div className="footerCol">
          <div className="footerHead">Quick Links</div>
          <div className="footerLinks">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} smooth duration={600} offset={-84} className="footerLink">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footerCol">
          <div className="footerHead">Social</div>
          <div className="socialRow">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="socialIcon">
                <s.Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="footerBottom">
        <div className="footerCopy">© 2025 Janeen. All rights reserved. | Not financial advice.</div>
        <div className="footerDisc">
          <em>Trading involves risk. Signals are for educational purposes only.</em>
        </div>
      </div>

      <style>{`
        .footer{
          background: #111118;
          border-top: 1px solid rgba(201,168,76,0.55);
          padding: 48px 0 0;
        }
        .footerInner{
          display:grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          gap: 26px;
          padding: 0 5% 28px;
        }
        .footerCol{}
        .footerLogo{
          font-family: var(--font-display);
          color: var(--color-primary);
          letter-spacing: 0.18em;
          font-weight: 800;
          font-size: 1.05rem;
        }
        .footerTag{
          margin-top: 10px;
          opacity: 0.9;
          font-weight: 600;
        }
        .footerHead{
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.8rem;
          opacity: 0.9;
          margin-bottom: 12px;
        }
        .footerLinks{
          display:flex;
          flex-direction:column;
          gap: 10px;
        }
        .footerLink{
          cursor:pointer;
          opacity: 0.9;
          width: fit-content;
        }
        .footerLink:hover{ opacity: 1; color: var(--color-primary); }
        .socialRow{
          display:flex;
          gap: 12px;
          align-items:center;
          flex-wrap: wrap;
        }
        .socialIcon{
          color: var(--color-primary);
          display:inline-flex;
          transition: transform 180ms ease, filter 180ms ease;
          filter: drop-shadow(0 0 0 rgba(201,168,76,0));
        }
        .socialIcon:hover{
          transform: scale(1.2);
          filter: drop-shadow(0 0 14px rgba(201,168,76,0.45));
        }
        .footerBottom{
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 18px 5% 22px;
          text-align:center;
        }
        .footerCopy{
          opacity: 0.9;
          font-weight: 600;
        }
        .footerDisc{
          margin-top: 8px;
          opacity: 0.75;
          font-size: 0.9rem;
        }
        @media (max-width: 900px){
          .footerInner{
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}

