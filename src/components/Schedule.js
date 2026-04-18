import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTiktok, FaFireAlt } from 'react-icons/fa';
import { fadeUpVariants, staggerContainer } from '../hooks/useScrollAnimation';

const DAYS = [
  { key: 1, label: 'Mon' },
  { key: 2, label: 'Tue' },
  { key: 3, label: 'Wed' },
  { key: 4, label: 'Thu' },
  { key: 5, label: 'Fri' },
  { key: 6, label: 'Sat' },
  { key: 0, label: 'Sun' },
];

const ACTIVE = new Set([1, 3, 5, 6]); // Mon, Wed, Fri, Sat
const START_HOUR = 20; // 8 PM
const START_MIN = 0;
const END_TEXT = '8:00 PM – 10:00 PM';
const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@YOUR_TIKTOK';

function nextLiveDate(now = new Date()) {
  const candidate = new Date(now);
  for (let i = 0; i < 14; i += 1) {
    const d = new Date(candidate);
    d.setDate(now.getDate() + i);
    d.setHours(START_HOUR, START_MIN, 0, 0);
    if (ACTIVE.has(d.getDay()) && d.getTime() > now.getTime()) return d;
  }
  const fallback = new Date(now);
  fallback.setHours(START_HOUR, START_MIN, 0, 0);
  fallback.setDate(now.getDate() + 1);
  return fallback;
}

function formatParts(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / (24 * 3600));
  const hours = Math.floor((total % (24 * 3600)) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

export default function Schedule() {
  const target = useMemo(() => nextLiveDate(new Date()), []);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const parts = formatParts(target.getTime() - now.getTime());

  return (
    <section id="schedule" className="section">
      <div className="container">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="scheduleHead"
        >
          <h2 className="scheduleTitle">
            Catch Me Live <FaTiktok style={{ marginLeft: 10, color: 'var(--color-primary)' }} />
          </h2>
          <div className="countdown glass">
            <div className="countLabel">Next Live In</div>
            <div className="countRow">
              <span className="countNum">{parts.days}</span>
              <span className="countSep">:</span>
              <span className="countNum">{parts.hours}</span>
              <span className="countSep">:</span>
              <span className="countNum">{parts.minutes}</span>
              <span className="countSep">:</span>
              <span className="countNum">{parts.seconds}</span>
            </div>
            <div className="countHint">{END_TEXT}</div>
          </div>
        </motion.div>

        <motion.div
          className="scheduleGrid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {DAYS.map((d) => {
            const active = ACTIVE.has(d.key);
            return (
              <motion.div
                key={d.label}
                variants={fadeUpVariants}
                className={`glass dayCard ${active ? 'activeDay' : 'inactiveDay'}`}
              >
                <div className="dayTop">
                  <div className="dayName">{d.label}</div>
                  {active && (
                    <div className="dayFire">
                      <FaFireAlt /> <span className="srOnly">Active live day</span>
                    </div>
                  )}
                </div>
                <div className="dayTime">{active ? END_TEXT : '—'}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.a
          href={TIKTOK_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary scheduleBtn"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          Set Reminder
        </motion.a>
      </div>

      <style>{`
        .scheduleHead{
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          gap: 18px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .scheduleTitle{
          font-family: var(--font-display);
          margin: 0;
          font-size: 2.2rem;
        }
        .countdown{
          padding: 14px 16px;
          min-width: min(420px, 100%);
          border-color: rgba(201,168,76,0.18);
        }
        .countLabel{
          font-weight: 700;
          opacity: 0.9;
          margin-bottom: 6px;
        }
        .countRow{
          display:flex;
          align-items:baseline;
          gap: 8px;
          font-family: var(--font-display);
        }
        .countNum{
          color: var(--color-primary);
          font-size: 1.7rem;
          letter-spacing: 0.05em;
        }
        .countSep{ opacity: 0.6; }
        .countHint{
          margin-top: 6px;
          opacity: 0.85;
          font-size: 0.95rem;
        }
        .scheduleGrid{
          display:grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 12px;
          margin: 18px 0 24px;
        }
        .dayCard{
          padding: 14px 12px;
          min-height: 92px;
        }
        .dayTop{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 10px;
          margin-bottom: 10px;
        }
        .dayName{
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.85rem;
        }
        .dayTime{
          opacity: 0.9;
          font-size: 0.92rem;
          line-height: 1.35;
        }
        .inactiveDay{
          opacity: 0.45;
        }
        .activeDay{
          border-color: rgba(201,168,76,0.28);
          box-shadow: 0 0 28px rgba(201,168,76,0.12);
          animation: pulseDay 2.6s ease-in-out infinite;
        }
        @keyframes pulseDay{
          0%,100%{ transform: translateY(0px); box-shadow: 0 0 18px rgba(201,168,76,0.08); }
          50%{ transform: translateY(-2px); box-shadow: 0 0 34px rgba(201,168,76,0.18); }
        }
        .dayFire{
          color: var(--color-primary);
          display:flex;
          align-items:center;
          gap: 6px;
          font-size: 0.95rem;
        }
        .scheduleBtn{ width: fit-content; }
        .srOnly{
          position:absolute;
          width:1px;height:1px;
          padding:0;margin:-1px;
          overflow:hidden;clip:rect(0,0,0,0);
          white-space:nowrap;border:0;
        }
        @media (max-width: 980px){
          .scheduleGrid{
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px){
          .scheduleGrid{
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}

