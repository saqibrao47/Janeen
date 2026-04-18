import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaTiktok, FaLink } from 'react-icons/fa';
import { fadeUpVariants, staggerContainer } from '../hooks/useScrollAnimation';

const SERVICES = [
  {
    title: 'Free Trading Signals',
    Icon: FaChartLine,
    badge: 'FREE',
    description:
      "Daily forex signals shared exclusively in private WhatsApp group and channel for viewers who installed Exness via Janeen's referral link.",
  },
  {
    title: 'TikTok Live Analysis',
    Icon: FaTiktok,
    badge: 'LIVE',
    description:
      "Join Janeen live on TikTok for real-time market breakdowns, trade setups, and Q&A sessions. Free for all viewers.",
  },
  {
    title: 'Exness Partnership',
    Icon: FaLink,
    badge: 'PARTNER',
    description:
      "Register on Exness using Janeen's link to unlock access to the private signals community. Zero cost, direct benefits.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="servicesTitle">
            What I Offer <span className="underline" />
          </h2>
        </motion.div>

        <motion.div
          className="servicesGrid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={fadeUpVariants} className="glass serviceCard">
              <div className="serviceTop">
                <div className="iconCircle">
                  <s.Icon size={20} />
                </div>
                <div className="badge">{s.badge}</div>
              </div>
              <h3 className="serviceName">{s.title}</h3>
              <p className="serviceDesc">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .servicesTitle{
          font-family: var(--font-display);
          font-size: 2.2rem;
          margin: 0 0 26px;
          position: relative;
          display: inline-block;
        }
        .underline{
          display:block;
          height:3px;
          width: 120px;
          margin-top: 10px;
          background: linear-gradient(90deg, var(--color-primary), rgba(201,168,76,0.0));
          border-radius: 999px;
        }
        .servicesGrid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .serviceCard{
          padding: 22px;
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
          border-color: rgba(255,255,255,0.10);
        }
        .serviceCard:hover{
          transform: translateY(-8px);
          box-shadow: 0 0 0 1px rgba(201,168,76,0.25), 0 0 34px rgba(201,168,76,0.18);
          border-color: rgba(201,168,76,0.28);
        }
        .serviceTop{
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom: 12px;
        }
        .iconCircle{
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display:grid;
          place-items:center;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.28);
          color: var(--color-primary);
        }
        .badge{
          padding: 6px 12px;
          border-radius: 999px;
          font-weight: 800;
          letter-spacing: 0.08em;
          font-size: 0.72rem;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.28);
          color: var(--color-primary);
        }
        .serviceName{
          font-family: var(--font-display);
          margin: 0 0 10px;
          font-size: 1.35rem;
        }
        .serviceDesc{
          margin: 0;
          line-height: 1.7;
          opacity: 0.9;
        }
        @media (max-width: 900px){
          .servicesGrid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

