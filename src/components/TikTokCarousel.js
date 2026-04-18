import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaTiktok } from 'react-icons/fa';
import { fadeUpVariants } from '../hooks/useScrollAnimation';

// Add TikTok links one-by-one here.
const MANUAL_TIKTOK_LINKS = [
  {
    url: 'https://www.tiktok.com/@janeen16/video/7624560588751899924',
    title: 'Latest trading highlight',
  },
  {
    url: 'https://www.tiktok.com/@janeen16/video/7629259220252232981',
    title: 'Live breakdown clip',
  },
  {
    url: 'https://www.tiktok.com/@janeen16/video/7629101079837363477',
    title: 'Quick strategy tip',
  },
  {
    url: 'https://www.tiktok.com/@janeen16/video/7626528296292896020',
    title: 'Consitency is key',
  },
  {
    url: 'https://www.tiktok.com/@janeen16/video/7626083625355791636',
    title: 'Keep it simple',
  },
  {
    url: 'https://www.tiktok.com/@janeen16/video/7625003454989143317',
    title: 'Learn to trade',
  },
];

function getVideoId(url) {
  const match = String(url).match(/\/video\/(\d+)/);
  return match?.[1] || '';
}

function toEmbedUrl(videoId, shouldAutoplay) {
  const params = new URLSearchParams({
    autoplay: shouldAutoplay ? '1' : '0',
    muted: '1',
  });
  return `https://www.tiktok.com/embed/v2/${videoId}?${params.toString()}`;
}

export default function TikTokCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(() => (window.innerWidth <= 768 ? 2 : 4));
  const username = 'janeen16';
  const videos = useMemo(
    () =>
      MANUAL_TIKTOK_LINKS.map((item, i) => {
        const videoId = getVideoId(item.url);
        return {
          id: `${videoId || 'manual'}-${i}`,
          videoId,
          permalink: item.url,
          title: item.title || `TikTok Video ${i + 1}`,
        };
      }).filter((video) => Boolean(video.videoId)),
    []
  );
  const pagesData = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < videos.length; i += perView) {
      chunks.push(videos.slice(i, i + perView));
    }
    return chunks;
  }, [videos, perView]);
  const pages = pagesData.length;

  useEffect(() => {
    const onResize = () => setPerView(window.innerWidth <= 768 ? 2 : 4);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (paused || pages <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % pages);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused, pages]);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, pages - 1)));
  }, [pages]);

  return (
    <section id="videos" className="section">
      <div className="container">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="tkHead"
        >
          <h2 className="tkTitle">Latest TikTok Videos</h2>
          <a
            className="btn"
            href={`https://www.tiktok.com/@${username}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaTiktok /> @{username}
          </a>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="tkWrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="tkViewport">
            <div className="tkTrack" style={{ transform: `translateX(-${index * 100}%)` }}>
              {pagesData.map((pageVideos, pageIndex) => (
                <div key={`page-${pageIndex}`} className="tkPage">
                  <div className="tkPageGrid">
                    {pageVideos.map((video) => (
                      <div key={video.id} className="glass tkCard">
                        <div className="tkEmbedWrap">
                          <iframe
                            title={video.title}
                            src={toEmbedUrl(video.videoId, pageIndex === index)}
                            className="tkEmbed"
                            allow="autoplay; encrypted-media; fullscreen"
                            loading="lazy"
                            frameBorder="0"
                          />
                        </div>
                        <div className="tkBody">
                          <p className="tkCaption">{video.title}</p>
                          <a
                            href={video.permalink}
                            target="_blank"
                            rel="noreferrer"
                            className="tkOpenLink"
                          >
                            Open on TikTok <FaExternalLinkAlt />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tkDots">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                className={`tkDot ${i === index ? 'tkDotActive' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to TikTok page ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="tkStatus">
          {/* Static mode enabled. Add links in <code>MANUAL_TIKTOK_LINKS</code> one by one. */}
        </div>
      </div>

      <style>{`
        .tkHead{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .tkTitle{
          font-family: var(--font-display);
          font-size: 2.2rem;
          margin: 0;
        }
        .tkWrap{ position: relative; }
        .tkViewport{
          overflow: hidden;
          border-radius: var(--radius);
        }
        .tkTrack{
          display:flex;
          transition: transform 540ms ease;
        }
        .tkPage{
          min-width: 100%;
          display:block;
          padding: 2px;
        }
        .tkPageGrid{
          display:grid;
          grid-template-columns: repeat(${perView}, minmax(0, 1fr));
          gap: 14px;
        }
        .tkCard{
          overflow: hidden;
          border-color: rgba(201,168,76,0.2);
        }
        .tkEmbedWrap{
          position: relative;
          width: 100%;
          aspect-ratio: 9/16;
          background: #13131b;
          border-bottom: 1px solid rgba(201,168,76,0.18);
        }
        .tkEmbed{
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .tkBody{ padding: 12px; }
        .tkCaption{
          margin: 0;
          line-height: 1.45;
          min-height: 2.6em;
        }
        .tkOpenLink{
          margin-top: 10px;
          display:inline-flex;
          align-items:center;
          gap: 7px;
          color: var(--color-primary);
          font-size: 0.92rem;
          font-weight: 700;
        }
        .tkDots{
          display:flex;
          justify-content:center;
          gap: 8px;
          margin-top: 14px;
        }
        .tkDot{
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(201,168,76,0.3);
          background: rgba(255,255,255,0.08);
          cursor:pointer;
        }
        .tkDotActive{ background: var(--color-primary); }
        .tkStatus{
          margin-top: 14px;
          opacity: 0.75;
          font-size: 0.9rem;
        }
        @media (max-width: 768px){
          .tkPageGrid{
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}

