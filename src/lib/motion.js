// Motion core — mirrors what REA found on the reference sites:
//  • thewatch.60fps.fr: Lenis smooth scroll (exponential ease, lerp ≈ .1) driving GSAP ScrollTrigger scrub timelines
//  • everest.suraj.work: Lenis (lerp .14, wheelMultiplier 1.05) + reveal-on-intersect
//  • prathamfolio.com: GSAP + ScrollTrigger + Barba-style page transitions and scroll-fill text
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

export function startSmoothScroll() {
  if (lenis || reducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, touchMultiplier: 1.2 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = () => lenis;

/** Scroll to a selector / element / number, smoothly when Lenis is running. */
export function scrollToTarget(target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (target !== 0 && !el) return;
  if (lenis) lenis.scrollTo(el ?? 0, { offset: -80, duration: 1.4, ...opts });
  else if (el) el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
  else window.scrollTo(0, 0);
}

export { gsap, ScrollTrigger, SplitText };
