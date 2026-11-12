// Scroll-motion primitives. Each one degrades to static content under prefers-reduced-motion.
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText, reducedMotion } from '../lib/motion.js';

/**
 * Headline whose characters rise out of a mask.
 * mode="enter": plays once when it enters (thewatch title splits, played instead of scrubbed for legibility)
 * mode="scrub": tied to scroll position like thewatch's `from(chars, {x:'-100%', stagger:.03})` timelines
 */
export function SplitHeading({ as: Tag = 'h2', children, className = '', mode = 'enter', delay = 0, ready = true }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (!ready || reducedMotion()) return;
      const split = SplitText.create(ref.current, { type: 'lines,words,chars', mask: 'lines', linesClass: 'split-line' });
      const from = { yPercent: 115, rotate: 6, transformOrigin: '0% 100%' };
      if (mode === 'scrub') {
        gsap.from(split.chars, {
          ...from, ease: 'power3.out', stagger: 0.03,
          scrollTrigger: { trigger: ref.current, start: 'top 92%', end: 'bottom 55%', scrub: 1 },
        });
      } else {
        gsap.from(split.chars, {
          ...from, duration: 1.1, ease: 'expo.out', stagger: 0.018, delay,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        });
      }
      return () => split.revert();
    },
    { scope: ref, dependencies: [ready] }
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Paragraph whose words light up as they cross the middle of the screen —
 * thewatch "grey-line" colour scrub + prathamfolio scroll-fill effect.
 */
export function FillText({ children, className = '', as: Tag = 'p' }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const split = SplitText.create(ref.current, { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: 1 },
        }
      );
      return () => split.revert();
    },
    { scope: ref }
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Fades + lifts direct children (or `selector` matches) into view in a stagger. */
export function Reveal({ children, className = '', as: Tag = 'div', selector = ':scope > *', y = 60, stagger = 0.08, ...rest }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const items = ref.current.querySelectorAll(selector);
      gsap.set(items, { y, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger }),
      });
    },
    { scope: ref }
  );
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Image that drifts inside its frame while scrolling (thewatch img-w children y:300 stagger). */
export function ParallaxImg({ src, alt, className = '', speed = 14, loading = 'lazy' }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.fromTo(
        ref.current.querySelector('img'),
        { yPercent: -speed, scale: 1.18 },
        { yPercent: speed, scale: 1.18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={`parallax ${className}`}>
      <img src={src} alt={alt} loading={loading} />
    </div>
  );
}

/** Number that counts up once visible (port of main.js initLedgerCounters, en-IN grouping). */
export function Counter({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(reducedMotion() ? value : 0);
  useEffect(() => {
    if (reducedMotion()) return;
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 92%',
      once: true,
      onEnter: () => gsap.to(obj, { v: value, duration, ease: 'expo.out', onUpdate: () => setShown(Math.round(obj.v)) }),
    });
    return () => st.kill();
  }, [value, duration]);
  return (
    <span ref={ref} className="counter">
      {shown.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
