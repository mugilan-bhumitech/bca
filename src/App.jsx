import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Summit from './pages/Summit.jsx';
import Partner from './pages/Partner.jsx';
import Vote from './pages/Vote.jsx';
import { gsap, ScrollTrigger, startSmoothScroll, getLenis, scrollToTarget, reducedMotion } from './lib/motion.js';

const TITLES = {
  '/': 'Bhumi Campus Awards 2027 - Recognizing Socially Responsible Colleges in India',
  '/summit': 'Campus Changemakers Summit 2027 — Bhumi Campus Awards 2027',
  '/partner': 'Partner With Us — Bhumi Campus Awards 2027',
  '/vote': 'Verification — Bhumi Campus Awards 2027',
};

// Old shared links (*.php, *.html, /verification) land on the new routes with query + hash kept.
function Legacy({ to }) {
  const { search, hash } = useLocation();
  return <Navigate replace to={`${to}${search}${hash}`} />;
}

export default function App() {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const booted = true;
  const curtain = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    startSmoothScroll();
  }, []);

  // Barba-style route transition: curtain covers, page swaps, curtain lifts.
  useEffect(() => {
    if (location.pathname === shown.pathname) {
      if (location.key !== shown.key) setShown(location);
      return;
    }
    // Old shared links (*.php, *.html, /verification) only redirect: swap straight away, no curtain.
    const legacyHop = /\.(php|html)$|^\/verification\/?$/.test(location.pathname) || /\.(php|html)$|^\/verification\/?$/.test(shown.pathname);
    if (reducedMotion() || !curtain.current || legacyHop) {
      setShown(location);
      return;
    }
    const el = curtain.current;
    getLenis()?.stop();
    let swapped = false;
    const swap = () => {
      if (swapped) return;
      swapped = true;
      setShown(location);
    };
    const tl = gsap.timeline()
      .set(el, { yPercent: 100, display: 'block' })
      .to(el, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' })
      .add(swap)
      .to(el, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', delay: 0.15 })
      .set(el, { display: 'none' })
      .add(() => getLenis()?.start());
    // The curtain runs on animation frames; if a throttled or background tab stalls them,
    // still swap the page and clear the curtain so navigation never hangs.
    const fallback = setTimeout(() => {
      if (swapped) return;
      tl.kill();
      gsap.set(el, { display: 'none' });
      getLenis()?.start();
      swap();
    }, 1200);
    return () => clearTimeout(fallback);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  // After a page swap: title, scroll position / hash target, refresh triggers.
  useLayoutEffect(() => {
    document.title = TITLES[shown.pathname] ?? TITLES['/'];
    const go = () => {
      if (shown.hash) scrollToTarget(shown.hash, first.current ? { immediate: true } : {});
      else getLenis()?.scrollTo(0, { immediate: true }) ?? window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      first.current = false;
    };
    const id = requestAnimationFrame(() => requestAnimationFrame(go));
    return () => cancelAnimationFrame(id);
  }, [shown]);

  return (
    <>
      <div className="route-curtain" ref={curtain} aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}assets/images/bhumi-logo.png`} alt="" />
      </div>
      <Routes location={shown}>
        <Route path="/" element={<Home booted={booted} />} />
        <Route path="/summit" element={<Summit booted={booted} />} />
        <Route path="/partner" element={<Partner booted={booted} />} />
        <Route path="/vote" element={<Vote booted={booted} />} />
        <Route path="/verification" element={<Legacy to="/vote" />} />
        <Route path="/index.php" element={<Legacy to="/" />} />
        <Route path="/index.html" element={<Legacy to="/" />} />
        {['summit', 'partner', 'vote'].flatMap((p) => [
          <Route key={`${p}p`} path={`/${p}.php`} element={<Legacy to={`/${p}`} />} />,
          <Route key={`${p}h`} path={`/${p}.html`} element={<Legacy to={`/${p}`} />} />,
        ])}
        <Route path="*" element={<Legacy to="/" />} />
      </Routes>
    </>
  );
}
