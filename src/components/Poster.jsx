// Building blocks of the "loud and flat" campaign-wall design, refined for space and clarity:
// nothing overlaps content, nothing important sits behind a click, and each scroll scene has one job.
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import SmartLink from './SmartLink.jsx';
import { FillText } from './Motion.jsx';
import { gsap, ScrollTrigger, getLenis, reducedMotion } from '../lib/motion.js';
import { LINKS, img } from '../data/links.js';

const desktopMotion = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

/* ------------------------------------------------------------------ button: flat, square, one fill */
export const Btn = forwardRef(function Btn({ href, onClick, tone = 'accent', children, className = '', type = 'button', ...rest }, ref) {
  const cls = `btn btn--${tone} ${className}`;
  if (href) return <SmartLink ref={ref} href={href} className={cls} {...rest}><span>{children}</span></SmartLink>;
  return <button ref={ref} type={type} onClick={onClick} className={cls} {...rest}><span>{children}</span></button>;
});

/* ------------------------------------------------------------------ page motion
   Entrances for [data-rise] are CSS scroll-timeline reveals (global.css): visible by default.
   [data-drift] pictures move gently against the scroll. */
export function usePageMotion(scope, ready) {
  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-drift]', scope.current).forEach((el) => {
          gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
    },
    { scope, dependencies: [ready] }
  );
}

/* ------------------------------------------------------------------ header: always there, wordmark + links + one action */
export function Header({ links, action }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => setScrolled(s.scroll() > 24) });
    return () => st.kill();
  }, []);
  useEffect(() => {
    const l = getLenis();
    open ? l?.stop() : l?.start();
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);
  return (
    <>
      <header className={`bar ${open ? 'is-open' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <SmartLink href="/" className="bar__mark" onClick={() => setOpen(false)}>
          <img src={img('bhumi-logo.png')} alt="" width="36" height="26" />
          <span>Bhumi Campus Awards</span>
        </SmartLink>
        <nav className="bar__links" aria-label="Main navigation">
          {links.map(([l, h]) => <SmartLink key={l} href={h}>{l}</SmartLink>)}
        </nav>
        <Btn href={action[1]} className="bar__action">{action[0]}</Btn>
        <button type="button" className="bar__menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div className={`sheet ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Menu">
          {links.map(([l, h]) => (
            <SmartLink key={l} href={h} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l}</SmartLink>
          ))}
        </nav>
        <Btn href={action[1]} tone="ink" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{action[0]}</Btn>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ hero: the focal moment
   Shouted headline over a tilted pasted photograph. On scroll (desktop) the headline parts
   and the photograph opens to the whole screen, carrying the lead with it. */
export function Hero({ lines, lead, fact, photo, alt, action, second, booted }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (!booted) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'expo.out' } })
          .from('.hero__line > span', { yPercent: 105, duration: 1, stagger: 0.1 })
          .from('.hero__frame', { yPercent: 18, opacity: 0, duration: 1.2 }, 0.15)
          .from('.hero__foot > *', { y: 16, opacity: 0, duration: 0.7, stagger: 0.06 }, 0.3);
      });
      mm.add(desktopMotion, () => {
        gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=110%', scrub: 0.6, pin: true, anticipatePin: 1 } })
          .to('.hero__line--0', { xPercent: -60, opacity: 0, ease: 'power2.in' }, 0)
          .to('.hero__line--1', { xPercent: 60, opacity: 0, ease: 'power2.in' }, 0)
          .to('.hero__foot', { opacity: 0, y: 30, ease: 'power1.in', duration: 0.35 }, 0)
          .fromTo('.hero__frame', { clipPath: 'inset(40% 36.5% 0% 36.5%)', rotate: -3 }, { clipPath: 'inset(0% 0% 0% 0%)', rotate: 0, ease: 'power2.inOut' }, 0)
          .fromTo('.hero__frame img', { scale: 1.25 }, { scale: 1, ease: 'power2.inOut' }, 0);
      });
    },
    { scope: ref, dependencies: [booted] }
  );
  const longest = Math.max(...lines.map((l) => l.length));
  return (
    <section className="hero" ref={ref}>
      <h1 className="hero__title" style={{ '--fit': `calc((100vw - 2 * var(--m)) / ${longest * 1.12})` }}>
        {lines.map((l, i) => <span className={`hero__line hero__line--${i}`} key={l}><span>{l}</span></span>)}
      </h1>
      <div className="hero__frame">
        <img src={img(photo)} alt={alt} width="1600" height="1067" />
      </div>
      <div className="hero__foot">
        <div className="hero__lead">
          <p>{lead}</p>
          <div className="hero__acts">
            {action && <Btn href={action[1]}>{action[0]}</Btn>}
            {second && <Btn href={second[1]} tone="ink">{second[0]}</Btn>}
          </div>
        </div>
        <p className="hero__fact">{fact}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ statement: one big idea that fills as you read */
export function Statement({ id, title, statement, body, aside }) {
  return (
    <section className="statement" id={id}>
      <h2 className="sec-title" data-rise>{title}</h2>
      <div className="statement__grid">
        <FillText className="statement__big">{statement}</FillText>
        <div className="statement__body">
          {body.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
      {aside && <div className="statement__aside">{aside}</div>}
    </section>
  );
}

/* ------------------------------------------------------------------ panels of unequal width, with air between */
export function Panels({ id, title, intro, panels, tone = 'bg' }) {
  return (
    <section className={`panels field--${tone}`} id={id}>
      <div className="sec-head">
        <h2 className="sec-title" data-rise>{title}</h2>
        {intro && <p className="sec-intro" data-rise>{intro}</p>}
      </div>
      <div className="panels__row">
        {panels.map((p, i) => (
          <div key={i} className={`panel field--${p.tone} panel--${p.size ?? 'm'} ${p.stat ? 'panel--stat' : ''}`}>
            {p.big && <p className="panel__big">{p.big}</p>}
            {p.head && <h3 className="panel__head">{p.head}</h3>}
            {p.text && <p className="panel__text">{p.text}</p>}
            {p.children}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ photographs on the wall, each with its line beneath */
export function PassingPhotos({ id, title, intro, items }) {
  return (
    <section className="photos" id={id}>
      <div className="sec-head">
        <h2 className="sec-title" data-rise>{title}</h2>
        {intro && <p className="sec-intro" data-rise>{intro}</p>}
      </div>
      <div className="photos__grid">
        {items.map(([photo, alt, head, text]) => (
          <figure className="photos__item" key={head}>
            <div className="photos__img"><img data-drift src={img(photo)} alt={alt} loading="lazy" width="800" height="1000" /></div>
            <figcaption>
              <h3>{head}</h3>
              <p>{text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ the picture opens to the whole screen, then the list */
export function Opening({ id, title, intro, photo, alt, items }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(desktopMotion, () => {
        gsap.timeline({ scrollTrigger: { trigger: '.opening__stage', start: 'top top', end: '+=90%', scrub: 0.6, pin: true } })
          .fromTo('.opening__pic', { clipPath: 'inset(6% 12% 6% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' }, 0)
          .fromTo('.opening__pic img', { scale: 1.2 }, { scale: 1, ease: 'power2.inOut' }, 0);
      });
    },
    { scope: ref }
  );
  return (
    <section className="opening" id={id} ref={ref}>
      <div className="sec-head">
        <h2 className="sec-title" data-rise>{title}</h2>
        <p className="sec-intro" data-rise>{intro}</p>
      </div>
      <div className="opening__stage">
        <div className="opening__pic">
          <img src={img(photo)} alt={alt} loading="lazy" />
        </div>
      </div>
      <ul className="benefits">
        {items.map(([head, text]) => (
          <li key={head}>
            <h3>{head}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export const Slips = Opening;

/* ------------------------------------------------------------------ four cards dealt onto the table, side by side */
export function Fan({ id, title, lead, cards }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(desktopMotion, () => {
        gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'center 55%', scrub: 0.6 } })
          .from('.deal__card', { yPercent: 40, rotate: (i) => [-6, 4, -3, 5][i % 4], ease: 'power3.out', stagger: 0.12 });
      });
    },
    { scope: ref }
  );
  return (
    <section className="deal field--black" id={id} ref={ref}>
      <div className="sec-head">
        <h2 className="sec-title" data-rise>{title}</h2>
        {lead && <p className="sec-intro" data-rise>{lead}</p>}
      </div>
      <div className="deal__row">
        {cards.map(([head, text, photo, tone]) => (
          <article className={`deal__card field--${tone}`} key={head}>
            {photo && <div className="deal__img"><img src={img(photo)} alt="" loading="lazy" /></div>}
            <h3>{head}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ giant word over an index of rows.
   Every row shows its title and description; the full criteria open in place. */
export function Bars({ id, word, intro, children, rows, tone = 'surface' }) {
  const [openKey, setOpenKey] = useState(null);
  return (
    <section className={`bars field--${tone}`} id={id}>
      <h2 className="bars__word" data-rise style={{ fontSize: `calc((100vw - 2 * var(--m)) / ${word.length * 1.12})` }}>{word}</h2>
      <div className="bars__grid">
        <div className="bars__side">
          {intro && <p className="sec-intro" data-rise>{intro}</p>}
          {children}
        </div>
        <ul className="bars__list">
          {rows.map((r) => {
            const k = r.key ?? r.title;
            const open = openKey === k;
            return (
              <li key={k} id={r.key} className={`row ${r.match ? 'is-match' : ''} ${open ? 'is-open' : ''}`}>
                <div className="row__top">
                  <h3 className="row__title">{r.title}</h3>
                  {r.match && <span className="row__badge">Matches your campus</span>}
                </div>
                {r.tag && <p className="row__tag">{r.tag}</p>}
                {r.lead && <p className="row__lead">{r.lead}</p>}
                {r.body && (
                  <>
                    <button type="button" className="row__toggle" aria-expanded={open} aria-controls={`${k}-body`} onClick={() => setOpenKey(open ? null : k)}>
                      {open ? 'Hide criteria' : 'View criteria'}
                    </button>
                    {open && <div className="row__body" id={`${k}-body`}>{r.body}</div>}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ one verb at a time */
export function Verbs({ id, title, panels }) {
  return (
    <section className="verbs" id={id} aria-label={title}>
      <h2 className="sr-only">{title}</h2>
      {panels.map(([verb, photo, alt, text]) => (
        <div className="verb" key={verb}>
          <img className="verb__img" src={img(photo)} alt={alt} loading="lazy" />
          <div className="verb__shade" />
          <div className="verb__sticky"><p className="verb__word" aria-hidden="true">{verb}</p></div>
          <div className="verb__text">
            <h3>{verb.charAt(0) + verb.slice(1).toLowerCase()}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ rules as a readable list */
export function RuleList({ id, title, intro, rules, closing }) {
  return (
    <section className="rules" id={id}>
      <div className="sec-head">
        <h2 className="sec-title" data-rise>{title}</h2>
        {intro && <p className="sec-intro" data-rise>{intro}</p>}
      </div>
      <div className="rules__grid">
        <ul className="rules__list">
          {rules.map(([h, t]) => (
            <li key={h}>
              <h3>{h}</h3>
              <p>{t}</p>
            </li>
          ))}
        </ul>
        {closing && <div className="rules__closing field--black">{closing}</div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ one figure owns the screen */
export function Figure({ id, claim, figure, unit, caption, children, tone = 'sage' }) {
  return (
    <section className={`figure field--${tone}`} id={id}>
      <h2 className="figure__claim" data-rise>{claim}</h2>
      <div className="figure__foot">
        <div>
          <p className="figure__num" data-rise>{figure}{unit && <sup>{unit}</sup>}</p>
          <p className="figure__cap" data-rise>{caption}</p>
        </div>
        <div className="figure__side">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ horizontal filmstrip (desktop), list (phone) */
export function Filmstrip({ id, title, intro, frames, tail }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(desktopMotion, () => {
        const strip = ref.current.querySelector('.film__strip');
        const dist = () => strip.scrollWidth - window.innerWidth;
        gsap.to(strip, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: '.film__stage', start: 'top top', end: () => `+=${dist()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
        gsap.to('.film__bar span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.film__stage', start: 'top top', end: () => `+=${dist()}`, scrub: true } });
      });
    },
    { scope: ref }
  );
  return (
    <section className="film" id={id} ref={ref}>
      <div className="film__stage">
        <div className="film__strip">
          <div className="film__intro">
            <h2 className="sec-title">{title}</h2>
            <p className="sec-intro">{intro}</p>
          </div>
          {frames.map(([file, head, text, alt]) => (
            <figure className="film__frame" key={file}>
              <div className="film__img"><img src={img(file)} alt={alt} loading="lazy" /></div>
              <figcaption>
                <h3>{head}</h3>
                <p>{text}</p>
              </figcaption>
            </figure>
          ))}
          {tail}
        </div>
        <div className="film__bar" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ closing question at both edges */
export function AskBoth({ lines, a, b, after }) {
  return (
    <section className="ask field--black">
      <h2 className="ask__q" style={{ '--fit': `calc((100vw - 2 * var(--m)) / ${Math.max(...lines.map((l) => l.length)) * 1.12})` }}>
        <span>{lines[0]}</span><span>{lines[1]}</span>
      </h2>
      <div className="ask__mid">
        <div className="ask__row">
          <Btn href={a[1]}>{a[0]}</Btn>
          <span className="ask__or">or</span>
          <Btn href={b[1]} tone="paper">{b[0]}</Btn>
        </div>
        {after && <p className="ask__after">{after}</p>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ accordion of filled tiles */
export function FaqTiles({ id, title, items }) {
  return (
    <section className="faq" id={id}>
      <h2 className="faq__title" data-rise>{title}</h2>
      <div className="faq__list">
        {items.map(([q, a]) => (
          <details className="tile" name="faq" key={q}>
            <summary>{q}<i className="plus" aria-hidden="true" /></summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer: photograph half, menu half */
export function Footer({ photo, alt, menu, portals, blurb, id = 'contact' }) {
  return (
    <footer className="foot" id={id}>
      <div className="foot__photo"><img src={img(photo)} alt={alt} loading="lazy" /></div>
      <div className="foot__side">
        <SmartLink href="/" className="foot__mark">
          <img src={img('bhumi-logo.png')} alt="" width="36" height="26" /> Bhumi Campus Awards
        </SmartLink>
        <nav className="foot__menu" aria-label="Footer">
          {menu.map(([l, h]) => <SmartLink key={l} href={h}>{l}</SmartLink>)}
        </nav>
        <div className="foot__blocks">
          <div>
            <h2>Contact</h2>
            <p>{LINKS.address}</p>
            <p><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p>
          </div>
          <div>
            <h2>Portals</h2>
            <ul>{portals.map(([l, h]) => <li key={l}><SmartLink href={h}>{l}</SmartLink></li>)}</ul>
          </div>
        </div>
        <p className="foot__legal">{blurb} © 2027 Bhumi Campus Awards. Dedicated to Indian Higher Education Institutions.</p>
      </div>
    </footer>
  );
}
