import { useEffect, useMemo, useRef, useState } from 'react';

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const glowPulse = {
  boxShadow: [
    '0 0 0px rgba(201, 168, 76, 0.0)',
    '0 0 22px rgba(201, 168, 76, 0.35)',
    '0 0 0px rgba(201, 168, 76, 0.0)',
  ],
  transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
};

export function useTypewriter(words, speed = 85) {
  const safeWords = useMemo(() => (Array.isArray(words) ? words : []), [words]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (safeWords.length === 0) return;

    const current = safeWords[index % safeWords.length];
    const nextText = isDeleting
      ? current.slice(0, Math.max(0, text.length - 1))
      : current.slice(0, Math.min(current.length, text.length + 1));

    const atEnd = !isDeleting && nextText === current;
    const atStart = isDeleting && nextText.length === 0;

    const delay = atEnd ? 900 : isDeleting ? Math.max(30, speed * 0.6) : speed;

    const t = setTimeout(() => {
      setText(nextText);
      if (atEnd) setIsDeleting(true);
      if (atStart) {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % safeWords.length);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [index, isDeleting, safeWords, speed, text]);

  return { text, isDeleting };
}

export function useCountUp(end, duration = 1200) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const target = useMemo(() => {
    const n = Number(end);
    return Number.isFinite(n) ? n : 0;
  }, [end]);

  useEffect(() => {
    if (!ref.current || hasStarted) return;
    const el = ref.current;

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setHasStarted(true);
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / Math.max(1, duration));
      setValue(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, hasStarted, target]);

  return { ref, value };
}

