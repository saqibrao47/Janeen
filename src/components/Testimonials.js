import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { fadeUpVariants } from '../hooks/useScrollAnimation';

const TESTIMONIALS = [
  { name: 'Ahmed K.', message: 'The signals are clear and the live breakdowns helped me stop overtrading. My entries are way cleaner now.' },
  { name: 'Sara M.', message: 'I love the TikTok lives — quick, confident, and easy to follow. The WhatsApp community is super supportive.' },
  { name: 'Tariq R.', message: 'Best part is learning the why behind each setup. I’ve improved my risk management a lot.' },
  { name: 'Mona H.', message: 'I joined for the signals, stayed for the education. The recaps and reminders keep me consistent.' },
  { name: 'Yusuf A.', message: 'The schedule is reliable and the signals are timely. I’m finally building a routine around trading.' },
  { name: 'Leila S.', message: 'Everything feels premium — clean setups, no noise, and great community energy. Highly recommend.' },
];

function initials(name) {
  const parts = String(name).split(' ').filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(() => (window.innerWidth < 820 ? 1 : 2));

  const pages = useMemo(() => Math.max(1, Math.ceil(TESTIMONIALS.length / perView)), [perView]);

  useEffect(() => {
    const onResize = () => setPerView(window.innerWidth < 820 ? 1 : 2);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (paused || pages <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % pages);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, pages]);

  useEffect(() => {
    setIndex((i) => Math.min(i, pages - 1));
  }, [pages]);

  // Translate is relative to full track width, so scale by page count.
  const translatePct = (index * 100) / pages;

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <h2 className="tTitle">What My Community Says</h2>
        </motion.div>

        <motion.div
          className="carouselWrap"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="fadeLeft" />
          <div className="fadeRight" />

          <div className="carouselViewport">
            <div
              className="carouselTrack"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {Array.from({ length: pages }).map((_, pageIdx) => {
                const slice = TESTIMONIALS.slice(pageIdx * perView, pageIdx * perView + perView);
                return (
                  <div className="carouselPage" key={pageIdx}>
                    {slice.map((t) => (
                      <div key={t.name} className="glass tCard">
                        <div className="tHead">
                          <div className="avatar">{initials(t.name)}</div>
                          <div>
                            <div className="tName">{t.name}</div>
                            <div className="stars">
                              {Array.from({ length: 5 }).map((__, i) => (
                                <FaStar key={i} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="tMsg">{t.message}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dots">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? 'dotActive' : ''}`}
                aria-label={`Go to testimonial page ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .tTitle{
          font-family: var(--font-display);
          font-size: 2.2rem;
          margin: 0 0 22px;
        }
        .carouselWrap{
          position: relative;
        }
        .carouselViewport{
          overflow: hidden;
          border-radius: var(--radius);
        }
        .carouselTrack{
          display:flex;
          width: ${pages * 100}%;
          transition: transform 520ms ease;
        }
        .carouselPage{
          width: ${100 / Math.max(1, pages)}%;
          display:grid;
          grid-template-columns: repeat(${perView}, minmax(0, 1fr));
          gap: 16px;
          padding: 2px;
        }
        .tCard{
          padding: 18px;
          border-color: rgba(201,168,76,0.16);
        }
        .tHead{
          display:flex;
          align-items:center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .avatar{
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display:grid;
          place-items:center;
          background: rgba(123,97,255,0.18);
          border: 1px solid rgba(123,97,255,0.35);
          font-weight: 800;
          letter-spacing: 0.06em;
        }
        .tName{
          font-weight: 800;
        }
        .stars{
          display:flex;
          gap: 4px;
          color: var(--color-primary);
          opacity: 0.9;
          font-size: 0.9rem;
          margin-top: 4px;
        }
        .tMsg{
          margin: 0;
          line-height: 1.7;
          opacity: 0.92;
        }
        .dots{
          display:flex;
          justify-content:center;
          gap: 10px;
          margin-top: 16px;
        }
        .dot{
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(201,168,76,0.35);
          background: rgba(255,255,255,0.06);
          cursor:pointer;
          transition: transform 160ms ease, background 160ms ease;
        }
        .dot:hover{ transform: scale(1.08); }
        .dotActive{
          background: var(--color-primary);
        }
        .fadeLeft, .fadeRight{
          position:absolute;
          top: 0;
          bottom: 36px;
          width: 64px;
          pointer-events:none;
          z-index: 2;
        }
        .fadeLeft{
          left: 0;
          background: linear-gradient(90deg, rgba(10,10,15,1), rgba(10,10,15,0));
        }
        .fadeRight{
          right: 0;
          background: linear-gradient(270deg, rgba(10,10,15,1), rgba(10,10,15,0));
        }
        @media (max-width: 820px){
          .fadeLeft, .fadeRight{ width: 40px; }
        }
      `}</style>
    </section>
  );
}

