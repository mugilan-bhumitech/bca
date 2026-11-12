import { useRef } from 'react';
import { Btn, usePageMotion, Header, Hero, Panels, Fan, Bars, Figure, AskBoth, Footer } from '../components/Poster.jsx';
import { LINKS } from '../data/links.js';
import { whyAttend, tracks } from '../data/pages.js';

const NAV = [
  ['Home', '/'],
  ['Why attend', '#why-attend'],
  ['Tracks', '#tracks'],
  ['Speakers', '#speakers'],
  ['Partner', '/partner'],
];

export default function Summit({ booted }) {
  const root = useRef(null);
  usePageMotion(root, booted);
  return (
    <div ref={root} className="page">
      <Header links={NAV} action={['Register', LINKS.summitRegister]} />
      <main>
        <Hero
          booted={booted}
          lines={['Changemakers', 'Summit']}
          photo="bca-moment-7.jpg"
          alt="A college volunteer team in red shirts on the BCA stage"
          lead="The Campus Changemakers Summit: a national gathering of students, faculty and college leaders coming together to build stronger cultures of volunteering and social responsibility on campus. Discover. Learn. Recognise. Inspire."
          fact="150 seats, first-come, first-served. Venue and dates to be announced soon."
          action={['Register now', LINKS.summitRegister]}
          second={['Apply for BCA 2027', '/#how-to-apply']}
        />

        <Panels
          id="about"
          title="The summit"
          tone="bg"
          panels={[
            { tone: 'accent', size: 'l', big: '“One room. Many changemakers. One shared goal.”', text: 'Held on the morning of the Awards Ceremony, the summit is where colleges learn from each other through real stories, conversations and live problem-solving.' },
            { tone: 'black', size: 'm', head: 'Not just talks', text: 'This is a dedicated space to analyze real stories, proven operational models, and live problem-solving—not just theoretical talks. Every college walks in to listen, and walks out with a strategic plan.' },
            { tone: 'gold', size: 's', head: '150 seats', text: 'Registration is open on a first-come, first-served basis. You do not need to apply for BCA to attend.' },
          ]}
        />

        <Fan
          id="why-attend"
          title="Why attend"
          lead="Four reasons every campus should be in the room."
          cards={whyAttend.map(([t, d], i) => [t, d, ['bca-moment-4.jpg', 'bca-moment-7.jpg', 'bca-moment-3.jpg', 'event-photo-2.jpg'][i], ['gold', 'sage', 'accent', 'paper'][i]])}
        />

        <Bars
          id="tracks"
          word="Tracks"
          intro="Campus Changemakers Summit 2027: four dynamic interactive tracks designed for actionable learning, live pitching, and authentic community connections."
          rows={tracks.map(([badge, t, d]) => ({ title: t, tag: badge.split('•')[1]?.trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase()), lead: d }))}
        />

        <Figure
          id="speakers"
          claim="Meet our speakers"
          figure="Soon"
          caption="Keynote panelists and workshop facilitators are currently being finalized. Registration is open on a first-come, first-served basis."
          tone="gold"
        >
          <h3>Registration open</h3>
          <p>Seats are limited to 150 and go in the order registrations arrive.</p>
          <Btn href={LINKS.summitRegister} tone="ink">Register for the summit</Btn>
          <Btn href="/#how-to-apply">Apply for BCA 2027</Btn>
        </Figure>

        <AskBoth
          lines={['Reserve', 'your seat']}
          a={['Register for the summit', LINKS.summitRegister]}
          b={['Back to BCA home', '/']}
          after="Registration opens the official form on hub.bhumi.club."
        />
      </main>
      <Footer
        photo="event-photo-1.jpg"
        alt="The People's Choice winners on the BCA stage"
        menu={[['BCA home', '/'], ['About the summit', '#about'], ['Why attend', '#why-attend'], ['Summit tracks', '#tracks'], ['Speakers', '#speakers'], ['Partner with us', '/partner']]}
        portals={[['Summit registration form', LINKS.summitRegister], ['BCA application form', LINKS.apply], ['Public voting verification', LINKS.vote], ['Bhumi NGO main portal', LINKS.bhumi]]}
        blurb="Campus Changemakers Summit: a national day of learning, connection & recognition. Venue and dates to be announced soon."
      />
    </div>
  );
}
