import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUpVariants } from '../hooks/useScrollAnimation';

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section id="about" className="section">
      <div className="container aboutGrid">
        <motion.div
          className="aboutPhotoWrap"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="aboutPhotoFrame">
            <img
              // src="https://picsum.photos/600/600"
              alt="Janeen"
              className="aboutPhoto"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          className="aboutContent"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="sectionTitle">
            About <span className="glow-text" style={{ color: 'var(--color-primary)' }}>Me</span>
          </h2>

          <p className="muted">
            I’m <strong>Janeen</strong> — a Forex Trader, TikTok Live Host, and Exness Affiliate focused on helping
            everyday traders build clarity and confidence in the markets.
          </p>
          <p className="muted">
            I share <strong>free trading signals</strong> with viewers who install Exness via my link, and I break down
            market structure live so you can understand the “why” behind every setup.
          </p>
          <p className="muted">
            For traders who want consistency, I run a <strong>private WhatsApp group and channel</strong> where the
            community gets daily signal drops, reminders, and live-session recaps.
          </p>

          <div ref={ref} className="aboutStats">
            <div className="glass statCard">
              <div className="statNumber">
                {inView ? <CountUp end={155000} duration={1.6} separator="," /> : '0'}
                <span className="statPlus">+</span>
              </div>
              <div className="statLabel">Followers</div>
            </div>
            <div className="glass statCard">
              <div className="statNumber">
                {inView ? <CountUp end={500} duration={1.4} /> : '0'}
                <span className="statPlus">+</span>
              </div>
              <div className="statLabel">Signals Sent</div>
            </div>
            <div className="glass statCard">
              <div className="statNumber">
                {inView ? <CountUp end={3} duration={1.2} /> : '0'}
              </div>
              <div className="statLabel">Years Trading</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .sectionTitle{
          font-family: var(--font-display);
          margin: 0 0 14px;
          font-size: 2.2rem;
          letter-spacing: 0.02em;
        }
        .muted{
          opacity: 0.9;
          line-height: 1.75;
          margin: 0 0 12px;
        }
        .aboutGrid{
          display:grid;
          grid-template-columns: 0.95fr 1.25fr;
          gap: 46px;
          align-items:center;
        }
        .aboutPhotoWrap{
          display:flex;
          justify-content:center;
        }
        .aboutPhotoFrame{
          width: min(360px, 84vw);
          aspect-ratio: 1/1;
          border-radius: 999px;
          padding: 10px;
          border: 1px solid rgba(201,168,76,0.35);
          box-shadow: 0 0 0px rgba(201,168,76,0.0);
          animation: goldHalo 2.6s ease-in-out infinite;
          background: rgba(255,255,255,0.02);
        }
        .aboutPhoto{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 999px;
          display:block;
          filter: saturate(1.05) contrast(1.05);
        }
        @keyframes goldHalo{
          0%,100%{ box-shadow: 0 0 0px rgba(201,168,76,0.0); }
          50%{ box-shadow: 0 0 32px rgba(201,168,76,0.32); }
        }
        .aboutStats{
          margin-top: 20px;
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .statCard{
          padding: 16px 14px;
        }
        .statNumber{
          font-family: var(--font-display);
          color: var(--color-primary);
          font-size: 1.6rem;
          letter-spacing: 0.02em;
        }
        .statPlus{ opacity: 0.9; }
        .statLabel{
          margin-top: 6px;
          opacity: 0.9;
          font-weight: 600;
          font-size: 0.95rem;
        }
        @media (max-width: 900px){
          .aboutGrid{ grid-template-columns: 1fr; }
          .aboutStats{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

