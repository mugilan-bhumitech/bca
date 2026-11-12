import { useRef } from 'react';
import { Btn, usePageMotion, Header, Hero, Panels, PassingPhotos, AskBoth, Footer } from '../components/Poster.jsx';
import { Counter } from '../components/Motion.jsx';
import { LINKS } from '../data/links.js';
import { partnerStats, whyPartner, matrix } from '../data/pages.js';

const NAV = [
  ['Home', '/'],
  ['Why partner', '#why-partner'],
  ['Benefits', '#benefits'],
  ['Summit', '/summit'],
  ['Contact', '#contact'],
];
const TIERS = ['10 colleges', '20 colleges', '30 colleges (VIP)'];

export default function Partner({ booted }) {
  const root = useRef(null);
  usePageMotion(root, booted);
  return (
    <div ref={root} className="page">
      <Header links={NAV} action={['Partner now', LINKS.partnerForm]} />
      <main>
        <Hero
          booted={booted}
          lines={['Partner', 'with BCA']}
          photo="bca-dg-vaishnav-winner.jpg"
          alt="A winning college delegation with its award on the BCA stage"
          lead="Partner with Bhumi Campus Awards 2027: a national celebration of campus social responsibility—fueling student-led impact, one college at a time."
          fact="Grand ceremony: venue and dates to be announced soon."
          action={['Partner now', LINKS.partnerForm]}
          second={['Download partner deck', LINKS.partnerDeck]}
        />

        <Panels
          id="about"
          title="Why it works"
          tone="bg"
          panels={[
            { tone: 'accent', size: 'l', big: 'Channel the energy of colleges into your mission.', text: 'Bhumi Campus Awards 2027 is a national initiative that celebrates colleges, students, and faculty who actively contribute to social good through sustainable practices, community engagement, and volunteerism. Through BCA, you can channel the energy of colleges and young people into your mission—giving your cause visibility, credibility, and a structured platform for youth volunteering.' },
            ...partnerStats.map((s, i) => ({ tone: ['black', 'sage', 'gold', 'surface'][i], size: 's', stat: true, big: <Counter value={s.value} suffix={s.suffix} />, text: s.label })),
          ]}
        />

        <PassingPhotos
          id="why-partner"
          title="Why partner"
          items={whyPartner.map(([t, d], i) => [['bca-moment-7.jpg', 'bca-moment-6.jpg', 'event-photo-2.jpg', 'bca-moment-5.jpg', 'event-photo-1.jpg'][i], 'Colleges and partners on the BCA stage', t, d])}
        />

        <section className="matrix field--sage" id="benefits">
          <div className="sec-head">
            <h2 className="sec-title" data-rise>Benefits</h2>
            <p className="sec-intro" data-rise>Your organisation will receive recognition and visibility based on the number of colleges you refer to the Campus Awards.</p>
          </div>
          <div className="matrix__scroll">
            <table>
              <caption className="sr-only">Partnership benefits by number of colleges referred</caption>
              <thead>
                <tr><th scope="col">Benefit</th>{TIERS.map((t) => <th scope="col" key={t}>{t}</th>)}</tr>
              </thead>
              <tbody>
                {matrix.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((v, i) => <td key={i} data-tier={TIERS[i]} className={v ? 'is-yes' : ''}>{v === 'x' ? 'Exclusive at 30' : v ? 'Yes' : 'No'}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Btn href={LINKS.partnerForm} tone="ink" className="matrix__act">Submit partnership interest form</Btn>
        </section>

        <AskBoth
          lines={['Partner', 'with us?']}
          a={['Partner now', LINKS.partnerForm]}
          b={['Download deck (2027)', LINKS.partnerDeck]}
          after="Join hands with Bhumi Campus Awards 2027 to scale youth leadership and social responsibility across India."
        />
      </main>
      <Footer
        photo="bca-moment-1.jpg"
        alt="A student donating blood at a campus blood donation camp"
        menu={[['BCA home', '/'], ['Why partner', '#why-partner'], ['Recognition matrix', '#benefits'], ['Campus Changemakers Summit', '/summit'], ['How to apply', '/#how-to-apply']]}
        portals={[['Partner application form', LINKS.partnerForm], ['Download partner deck', LINKS.partnerDeck], ['BCA application form', LINKS.apply], ['Public voting verification', LINKS.vote]]}
        blurb="Partnership Ecosystem 2027: channel collegiate energy and student volunteerism into high-impact social initiatives across India."
      />
    </div>
  );
}
