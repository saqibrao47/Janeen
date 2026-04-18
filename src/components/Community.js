import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaWhatsapp, FaChartBar } from 'react-icons/fa';
import CountUp from 'react-countup';
import { fadeUpVariants, staggerContainer, glowPulse } from '../hooks/useScrollAnimation';

const EXNESS_LINK = 'https://example.com/exness-referral';
const WHATSAPP_CHANNEL = 'https://wa.me/0000000000';

const STEPS = [
  {
    title: 'Install Exness',
    Icon: FaDownload,
    desc: "Download and register via Janeen's referral link (placeholder link).",
  },
  {
    title: 'Message Janeen',
    Icon: FaWhatsapp,
    desc: "Send a screenshot of your Exness registration to confirm.",
  },
  {
    title: 'Get Signals',
    Icon: FaChartBar,
    desc: 'Get added to the private WhatsApp group and start receiving daily signals.',
  },
];

export default function Community() {
  return (
    <section id="community" className="section communitySection">
      <div className="communityBg" />
      <div className="container communityInner">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="cTitle">Ready to Trade Smarter?</h2>
          <p className="cSub">Join hundreds of traders getting free daily signals</p>
        </motion.div>

        <motion.div
          className="cSteps"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {STEPS.map((s, i) => (
            <motion.div key={s.title} variants={fadeUpVariants} className="glass cCard">
              <div className="cCardTop">
                <div className="cIcon">
                  <s.Icon />
                </div>
                <div className="cStepNum">Step {i + 1}</div>
              </div>
              <h3 className="cCardTitle">{s.title}</h3>
              <p className="cCardDesc">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="cCtas"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.a
            href="https://one.exnessonelink.com/a/3shaweu8jk"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary cBtn"
            whileHover={{ y: -2 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            Install Exness Now
          </motion.a>
          <motion.a
            href="https://www.whatsapp.com/channel/0029Vb7GtAaDp2Q7hYRrKu1I"
            target="_blank"
            rel="noreferrer"
            className="btn btn-green cBtn"
            whileHover={{ y: -2 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          >
            <FaWhatsapp /> Join WhatsApp Channel
          </motion.a>
        </motion.div>

        <motion.div
          className="floatingCount glass"
          animate={glowPulse}
          aria-label="Members joined counter"
        >
          <div className="floatingNum">
            <CountUp end={500} duration={2.2} />+
          </div>
          <div className="floatingLabel">Members Joined</div>
        </motion.div>
      </div>

      <style>{`
        .communitySection{
          position: relative;
          overflow: hidden;
        }
        .communityBg{
          position:absolute;
          inset:-40%;
          background: linear-gradient(135deg, rgba(201,168,76,0.55), rgba(123,97,255,0.45));
          filter: blur(70px);
          animation: gradMove 10s ease-in-out infinite;
          opacity: 0.9;
          pointer-events:none;
        }
        @keyframes gradMove{
          0%,100%{ transform: translate3d(-2%, -2%, 0) rotate(0deg); }
          50%{ transform: translate3d(2%, 2%, 0) rotate(2deg); }
        }
        .communityInner{
          position: relative;
        }
        .cTitle{
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin: 0 0 10px;
        }
        .cSub{
          margin: 0 0 24px;
          opacity: 0.92;
          font-weight: 600;
        }
        .cSteps{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin: 18px 0 22px;
        }
        .cCard{
          padding: 20px;
          border-color: rgba(255,255,255,0.12);
        }
        .cCardTop{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom: 12px;
        }
        .cIcon{
          width: 46px;
          height: 46px;
          border-radius: 999px;
          display:grid;
          place-items:center;
          background: rgba(10,10,15,0.25);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
        }
        .cStepNum{
          font-weight: 900;
          letter-spacing: 0.08em;
          font-size: 0.78rem;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }
        .cCardTitle{
          margin: 0 0 10px;
          font-family: var(--font-display);
          font-size: 1.35rem;
        }
        .cCardDesc{
          margin: 0;
          line-height: 1.7;
          opacity: 0.92;
        }
        .cCtas{
          display:flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .cBtn{
          padding: 14px 20px;
          font-size: 1rem;
        }
        .floatingCount{
          position:absolute;
          right: 18px;
          top: 18px;
          padding: 14px 14px;
          border-color: rgba(255,255,255,0.14);
          text-align:center;
        }
        .floatingNum{
          font-family: var(--font-display);
          color: var(--color-primary);
          font-size: 1.7rem;
        }
        .floatingLabel{
          opacity: 0.9;
          font-weight: 700;
          font-size: 0.92rem;
        }
        @media (max-width: 900px){
          .cSteps{ grid-template-columns: 1fr; }
          .floatingCount{
            position: static;
            margin-top: 18px;
            width: fit-content;
          }
        }
      `}</style>
    </section>
  );
}

