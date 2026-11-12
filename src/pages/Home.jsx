import { useMemo, useRef, useState, useEffect } from 'react';
import SmartLink from '../components/SmartLink.jsx';
import {
  Btn, usePageMotion, Header, Hero, Statement, Panels, PassingPhotos, Opening, Fan, Bars, Verbs, RuleList, Figure,
  Filmstrip, AskBoth, FaqTiles, Footer,
} from '../components/Poster.jsx';
import { Counter } from '../components/Motion.jsx';
import { LINKS } from '../data/links.js';
import { whyBca, benefits, imperatives, categories, dossiers, DOSSIER_DOCS, applySteps, phases, keyDates, moments, faqs } from '../data/home.js';

const LINKS_NAV = [
  ['About', '#what-is-bca'],
  ['Categories', '#categories'],
  ['How to apply', '#how-to-apply'],
  ['Summit', '/summit'],
  ['Partner', '/partner'],
];

const noEmoji = (s) => s.replace(/\p{Extended_Pictographic}️?\s*/gu, '');
const parseDate = (s) => {
  const d = new Date(s.replace('*', '') + ' 23:59:59 GMT+0530');
  return Number.isNaN(d.getTime()) ? null : d;
};

/* ---------------------------------------------------------------- category finder rules (from the guidelines) */
const WHO = [
  ['faculty', 'A college (faculty coordinator or nominated staff)'],
  ['student', 'A student'],
];
const DID = {
  faculty: [
    ['yearround', 'Year-round social initiatives'],
    ['innovation', 'An innovative solution to a community problem'],
    ['green', 'Green campus practices'],
    ['gdd', 'A Good Deeds Day campaign'],
    ['du', 'A Daan Utsav campaign'],
    ['mentor', 'Faculty who mentor NSS, NCC or social clubs'],
    ['club', 'A club active all year'],
  ],
  student: [
    ['lead', 'I led a volunteer initiative'],
    ['innovation', 'I built a solution to a social or environmental problem'],
  ],
};
const FITS = {
  cat1: ['faculty', 'yearround'], cat2: ['faculty', 'innovation'], cat3: ['faculty', 'green'],
  cat5: ['faculty', 'gdd'], cat6: ['faculty', 'gdd'], cat7: ['faculty', 'du'], cat8: ['faculty', 'du'],
  cat9: ['student', 'lead'], cat10: ['student', 'innovation'], cat11: ['faculty', 'mentor'], cat12: ['faculty', 'club'],
};

function useDaysLeft() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);
  const next = keyDates.map(([m, d]) => ({ m, d: parseDate(d) })).find((k) => k.d && k.d.getTime() > now);
  if (!next) return null;
  return { label: next.m, days: Math.ceil((next.d.getTime() - now) / 864e5), date: next.d };
}

export default function Home({ booted }) {
  const root = useRef(null);
  usePageMotion(root, booted);
  const next = useDaysLeft();
  const [who, setWho] = useState(null);
  const [did, setDid] = useState([]);

  const matches = useMemo(() => {
    if (!who) return null;
    return categories.filter((c) => FITS[c.key][0] === who && (did.length === 0 || did.includes(FITS[c.key][1]))).map((c) => c.key);
  }, [who, did]);

  const toggleDid = (k) => setDid((d) => (d.includes(k) ? d.filter((x) => x !== k) : [...d, k]));
  const pickWho = (w) => { setWho(w); setDid([]); };

  // matching categories move to the top of the list, so nothing has to be dimmed or hidden
  const orderedCats = useMemo(
    () => (matches ? [...categories.filter((c) => matches.includes(c.key)), ...categories.filter((c) => !matches.includes(c.key))] : categories),
    [matches]
  );

  const factLine = next
    ? `${next.label}: ${next.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}, ${next.days} ${next.days === 1 ? 'day' : 'days'} left.`
    : 'Venue and dates to be announced soon.';

  return (
    <div ref={root} className="page">
      <Header links={LINKS_NAV} action={['Apply now', LINKS.apply]} />
      <main>
        <Hero
          booted={booted}
          lines={['Campus', 'Awards']}
          photo="bca-moment-2.jpg"
          alt="A student volunteer painting a Stop Child Labour mural on a campus wall"
          lead="Bhumi Campus Awards 2027 is India's leading platform for recognizing socially responsible colleges - now with the Campus Changemakers Summit, a national day of learning, connection & recognition."
          fact={factLine}
          action={['Apply now', LINKS.apply]}
          second={['Vote now', LINKS.vote]}
        />

        <Statement
          id="what-is-bca"
          title="What is BCA"
          statement="Across colleges in India, student clubs, and faculty-led initiatives, young volunteers are actively responding to community needs, running campaigns, and mobilising their peers."
          body={[
            'Much of this critical work remains unseen, undocumented, and disconnected from the wider social ecosystem.',
            'Bhumi Campus Awards (BCA) 2027 exists to change that. It is a national platform that recognises and advances campus-led social impact, celebrating the institutions and individuals making service a core part of campus culture.',
            'It is not just about recognising past successes; it is about discovering what works, analysing the metrics, and inspiring hundreds of other campuses to act. From recognizing campus volunteers to building a national movement.',
          ]}
          aside={
            <>
              <div className="year field--sage">
                <p className="year__n">2025</p>
                <p>BCA brought 71 campuses into the national spotlight across 13 categories and 4 zones, supported by CSR and HR leaders from PVR Nest, Maveric Systems Ltd., and Ford Motor Pvt. Ltd.</p>
              </div>
              <div className="year field--gold">
                <p className="year__n">2027</p>
                <p>Bhumi Campus Awards will be a space for a comprehensive national learning, recognition, and action ecosystem: India's platform for recognising colleges, students and faculty driving social impact on campus.</p>
              </div>
            </>
          }
        />

        <PassingPhotos
          id="why-bca"
          title="Why BCA"
          intro="Are you ready to celebrate the change-makers of our academic world? BCA 2027 recognizes the colleges, students and faculty setting the standard for social responsibility, volunteer mobilisation and leadership."
          items={[
            ['bca-hero-centerpiece.jpg', 'College delegates receiving an award on the BCA stage', ...whyBca[0]],
            ['bca-moment-8.jpg', 'A student holding a placard about girls dropping out of school', ...whyBca[1]],
            ['bca-moment-7.jpg', 'A college team in red volunteer shirts receiving a certificate', ...whyBca[2]],
            ['bca-moment-5.jpg', 'Winners holding a plaque with jury members', ...whyBca[3]],
            ['bca-moment-4.jpg', 'Students planting saplings by a hill road', ...whyBca[4]],
            ['event-photo-2.jpg', 'The full BCA cohort on stage under the Bhumi Campus Awards backdrop', ...whyBca[5]],
          ]}
        />

        <Opening
          id="benefits"
          title="What you get"
          intro="Tangible national honors, elite access, and high-impact amplification for participating colleges and leaders. Every category honors a Winner, Runner 1, and Runner 2."
          photo="bca-2022-ceremony-stage.jpg"
          alt="A winning college group on the Bhumi Congratulates stage"
          items={benefits.map(([, t, d]) => [t, d])}
        />

        <Panels
          id="two-halves"
          title="Two halves"
          intro="This year, BCA is bigger. From a single award moment to a full day of learning, connection and recognition, BCA now gives every campus a reason to show up and engage, not just apply."
          panels={[
            { tone: 'black', size: 'm', head: 'Morning: Campus Changemakers Summit', text: 'Campuses convene to analyze proven volunteering strategies, connect with peers, NGOs, and CSR leaders, and pitch live solutions to real community challenges.', children: <Btn href="/summit" tone="accent">Summit overview and register</Btn> },
            { tone: 'accent', size: 'm', head: 'Afternoon: Grand Awards Ceremony', text: "A national stage celebrating this year's top-performing colleges, students, and faculty with certificates, trophies, and institutional spotlight.", children: <Btn href="#how-to-apply" tone="ink">Application process</Btn> },
          ]}
        />

        <Fan
          id="why-colleges-contribute"
          title="Why it matters"
          lead="Why colleges in India need to contribute towards social responsibility: in today’s interconnected world, colleges have a pivotal role to play beyond academics, and it is essential for building resilient communities."
          cards={[
            [imperatives[0][0], imperatives[0][1], 'bca-moment-1.jpg', 'gold'],
            [imperatives[1][0], imperatives[1][1], 'bca-moment-4.jpg', 'sage'],
            [imperatives[2][0], imperatives[2][1], 'bca-moment-3.jpg', 'accent'],
            [imperatives[3][0], imperatives[3][1], 'bca-guru-nanak-award.jpg', 'paper'],
          ]}
        />

        <Bars
          id="categories"
          word="Awards"
          intro="Eleven award categories across Institution, Student, and Faculty tiers. Every category honors a Winner, Runner 1, and Runner 2."
          rows={orderedCats.map((c) => {
            const d = dossiers[c.key];
            return {
              key: c.key,
              title: c.title,
              tag: `${c.pill} · ${c.code}`,
              lead: d.desc,
              match: matches ? matches.includes(c.key) : false,
              body: (
                <>
                  <h4>Evaluation criteria</h4>
                  <ul>{d.criteria.map((x) => <li key={x}>{x}</li>)}</ul>
                  <h4>Honors and commendations</h4>
                  <p>{d.grant}</p>
                  <h4>Documentation</h4>
                  <p>{DOSSIER_DOCS}</p>
                  <div className="row-acts">
                    <Btn href={LINKS.apply}>Apply for this category</Btn>
                    <Btn href={LINKS.vote} tone="ink">Cast public vote</Btn>
                  </div>
                </>
              ),
            };
          })}
        >
          <div className="finder">
            <h3 className="finder__q">Find your categories</h3>
            <p className="finder__hint">Who is applying?</p>
            <div className="finder__opts" role="group" aria-label="Who is applying">
              {WHO.map(([k, l]) => (
                <button key={k} type="button" aria-pressed={who === k} className="chip" onClick={() => pickWho(k)}>{l}</button>
              ))}
            </div>
            {who && (
              <>
                <p className="finder__hint">What did your campus do?</p>
                <div className="finder__opts" role="group" aria-label="What your campus did">
                  {DID[who].map(([k, l]) => (
                    <button key={k} type="button" aria-pressed={did.includes(k)} className="chip" onClick={() => toggleDid(k)}>{l}</button>
                  ))}
                </div>
                <p className="finder__out" aria-live="polite">
                  {matches.length === 0 && 'No category matches that combination. Try another activity.'}
                  {matches.length > 0 && matches.length <= 3 && `${matches.length === 1 ? 'One category fits' : `${matches.length} categories fit`}; they are now at the top of the list. Each needs a self-nomination and a short video per project.`}
                  {matches.length > 3 && `${matches.length} categories fit. Choose your strongest three: applying for more than three leads to disqualification.`}
                  {who === 'student' && ' Students can only apply for these two student categories.'}
                  {' '}People's Choice needs no application.
                </p>
                <button type="button" className="finder__reset" onClick={() => { setWho(null); setDid([]); }}>Clear</button>
              </>
            )}
          </div>
        </Bars>

        <Verbs
          id="evaluation-process"
          title="Evaluation process"
          panels={[
            ['APPLY', 'bca-moment-3.jpg', 'Students collecting litter in gloves during a campus cleanup', `${phases[0][1]} Fill the BCA application form: general info, 1–2 projects with proof, and category-specific questions.`],
            ['JUDGE', 'bca-moment-5.jpg', 'Jury members with a winning team and their plaque', `${phases[1][1]} Every application first goes through an initial screening round.`],
            ['VOTE', 'event-photo-1.jpg', "The People's Choice winners on stage", phases[2][1]],
            ['WIN', 'bca-dg-vaishnav-winner.jpg', 'Dwaraka Doss Goverdhan Doss Vaishnav College receiving the Social Exemplar award', `${phases[3][1]} Shortlisted colleges and individuals are felicitated on stage and featured nationally across digital and print media.`],
          ]}
        />

        <RuleList
          id="how-to-apply"
          title="How to apply"
          intro="Follow the updated structured application and evaluation process for BCA 2027. Fill the BCA application form, go through evaluation, and get recognized."
          rules={applySteps.one.map(([b, t]) => [b.replace(/:$/, ''), t.trim()])}
          closing={
            <>
              <h3>The disqualification rule</h3>
              <p>A college can win a maximum of 2 awards in total (1 Winner + 1 Runner-up). Applications missing required proof, submitted late, or exceeding 3 categories will be disqualified.</p>
              <Btn href={LINKS.apply}>Open application form</Btn>
            </>
          }
        />

        <Figure
          id="participate"
          claim="People's Choice"
          figure={<Counter value={70000} />}
          unit="+"
          caption="Student voters in the last edition. No application needed: this category is decided entirely by public vote, and the college with the highest number of votes in its zone wins."
        >
          <h3>Your voice matters</h3>
          <p>Students: do you believe your college deserves recognition for its outstanding contributions to society? Cast your vote and rally your campus peers to take the lead in your zone.</p>
          <Btn href={LINKS.vote} tone="ink">Cast student vote now</Btn>
          <p>Faculty and principals: showcase your institution’s commitment to social change and join the ranks of India's leading socially responsible colleges.</p>
          <Btn href={LINKS.apply}>Submit BCA application form</Btn>
        </Figure>

        <section className="dates field--gold" id="key-dates">
          <div className="dates__side">
            <h2 className="sec-title" data-rise>Key dates</h2>
            <p data-rise>Mark your calendar for all major milestones leading up to the ceremony (venue and dates to be announced soon).</p>
            {next && (
              <p className="dates__next" data-rise>
                <span className="dates__days">{next.days}</span> {next.days === 1 ? 'day' : 'days'} until {next.label.toLowerCase()}.
              </p>
            )}
          </div>
          <table className="dates__table">
            <caption className="sr-only">BCA 2027 timeline</caption>
            <thead><tr><th scope="col">Milestone</th><th scope="col">Date</th></tr></thead>
            <tbody>
              {keyDates.map(([m, d, kind]) => {
                const date = parseDate(d);
                const past = date && date.getTime() < Date.now();
                return (
                  <tr key={m} className={`${kind ? `is-${kind}` : ''} ${past ? 'is-past' : ''}`}>
                    <td>{noEmoji(m)}{past && <span className="dates__done"> (passed)</span>}</td>
                    <td>{d}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="figs" aria-label="BCA 2025 in figures">
          {[['71', 'Campuses in the 2025 spotlight'], ['13', 'Categories in 2025'], ['4', 'Zones across India'], ['200+', 'Colleges engaged']].map(([n, l]) => (
            <div className="figs__item" key={l} data-rise>
              <p className="figs__n">{n}</p>
              <p>{l}</p>
            </div>
          ))}
        </section>

        <Filmstrip
          id="moments"
          title="BCA in action"
          intro="Moments of national impact from our last edition: student changemakers, campus clubs, college delegates and jury leaders, and the transformative impact of institutional volunteerism."
          frames={moments}
          tail={
            <div className="film__frame film__spot field--accent">
              <h3>Your campus spotlight here</h3>
              <p>Will your institution take the national stage (venue and dates to be announced soon)? Submit your application today.</p>
              <SmartLink href={LINKS.apply} className="film__spot-link">Apply for BCA 2027</SmartLink>
            </div>
          }
        />

        <FaqTiles
          id="faq"
          title="Questions"
          items={faqs.map(([q, a]) => [q, a === 'EMAIL' ? <>Reach out to us at <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.</> : a])}
        />

        <AskBoth
          lines={['Apply', 'or vote?']}
          a={['Apply for BCA 2027', LINKS.apply]}
          b={['Vote for your college', LINKS.vote]}
          after="Both take you to the official BCA portal. Or register for the Campus Changemakers Summit."
        />
      </main>

      <Footer
        photo="bca-moment-8.jpg"
        alt="A student volunteer raising a placard at a campus campaign"
        menu={[['What is BCA', '#what-is-bca'], ['Categories', '#categories'], ['How to apply', '#how-to-apply'], ['Key dates', '#key-dates'], ['Summit', '/summit'], ['Partner with us', '/partner'], ['FAQ', '#faq']]}
        portals={[['BCA application form', LINKS.apply], ['Public voting portal', LINKS.vote], ['Partner application form', LINKS.partnerForm], ['Photo drive archive', LINKS.photoDrive], ['Bhumi NGO main portal', LINKS.bhumi]]}
        blurb="India’s leading national platform recognizing socially responsible colleges, inspiring campus changemakers, and fostering sustainable community leadership."
      />
    </div>
  );
}
