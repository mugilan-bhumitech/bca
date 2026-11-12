import { useRef, useState } from 'react';
import { Btn, usePageMotion, Header, PassingPhotos, Footer } from '../components/Poster.jsx';
import { gsap, reducedMotion, scrollToTarget } from '../lib/motion.js';
import { LINKS, img } from '../data/links.js';
import { ballotColleges, voteRules } from '../data/pages.js';
import { useGSAP } from '@gsap/react';

const NAV = [
  ['Home', '/'],
  ['Categories', '/#categories'],
  ['How to apply', '/#how-to-apply'],
  ['Summit', '/summit'],
  ['Contact', '#footer_section'],
];

/*
 * Behaviour is ported 1:1 from vote.php: the "Direct Verification Form" runs entirely in the browser
 * (it generates a random ballot token and shows a confirmation; nothing is sent anywhere).
 * The "Official Zoho Portal" option is the real Zoho Creator form.
 */
export default function Vote({ booted }) {
  const root = useRef(null);
  usePageMotion(root, booted);
  const [tab, setTab] = useState('direct');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState('form');
  const [token, setToken] = useState('BCA-2027-VOTE-7892');
  const [college, setCollege] = useState('');
  const [cast, setCast] = useState(false);

  useGSAP(() => {
    if (!booted || reducedMotion()) return;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.vote__line > span', { yPercent: 105, duration: 0.9, stagger: 0.11 })
      .from('.vote__lead, .vote__switch', { y: 20, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.4)
      .from('.ballot', { y: 120, rotate: 0, duration: 1.2 }, 0.3);
  }, { scope: root, dependencies: [booted] });

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !phone.trim()) {
      alert('Please fill in both Email and WhatsApp Number.');
      return;
    }
    setStage('verifying');
    setTimeout(() => {
      setToken('BCA-2027-VOTE-' + Math.floor(1000 + Math.random() * 9000));
      setStage('verified');
      requestAnimationFrame(() => scrollToTarget('#ballot-voting-section', { offset: -120 }));
    }, 700);
  };

  const castVote = () => {
    if (!college) {
      alert('Please select a nominated college from the list to cast your vote.');
      document.getElementById('college-ballot-choice')?.focus();
      return;
    }
    setCast(true);
    requestAnimationFrame(() => scrollToTarget('#vote-cast-success', { offset: -120 }));
  };

  return (
    <div ref={root} className="page">
      <Header links={NAV} action={['Apply for BCA 2027', LINKS.apply]} />
      <main>
        <section className="vote field--accent">
          <div className="vote__side">
            <h1 className="vote__title" aria-label="Verification">
              <span className="vote__line"><span>Verify</span></span>
              <span className="vote__line"><span>and vote</span></span>
            </h1>
            <p className="vote__lead">
              Verification for the People's Choice Award. Authenticate your details to cast your official vote for the Bhumi
              Campus Awards 2027. One verified ballot per voter ensures fair, transparent recognition. Ceremony: venue and
              dates to be announced soon.
            </p>
            <div className="vote__switch" role="tablist" aria-label="Verification method">
              <button type="button" role="tab" aria-selected={tab === 'direct'} onClick={() => setTab('direct')}>Direct verification form</button>
              <button type="button" role="tab" aria-selected={tab === 'zoho'} onClick={() => setTab('zoho')}>Official Zoho portal</button>
            </div>
            <img className="vote__photo" src={img('bca-moment-8.jpg')} alt="A student volunteer raising a campaign placard" data-drift />
          </div>

          {tab === 'direct' ? (
            <div className="ballot" id="direct-verify-container">
              <h2>Voter verification</h2>
              <p>Enter your active email and WhatsApp number to unlock your official voting ballot.</p>

              {stage === 'verified' && (
                <div className="ballot__ok" role="status">
                  <strong>Verification completed.</strong> Voter authenticated as {email} ({phone}). You may now cast your vote below.
                  <span className="ballot__token">Ballot token: {token}</span>
                </div>
              )}

              <form onSubmit={submit}>
                <label className="field">
                  <span>Email (required)</span>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@college.edu" required spellCheck="false" disabled={stage === 'verified'} aria-describedby="help-email" />
                  <small id="help-email">We'll send your voting confirmation and digital voter receipt here.</small>
                </label>
                <label className="field">
                  <span>WhatsApp number (required)</span>
                  <input type="tel" name="whatsapp" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9876543210" pattern="[0-9]{10}" title="Please enter a valid 10-digit WhatsApp phone number" required disabled={stage === 'verified'} aria-describedby="help-phone" />
                  <small id="help-phone">10 digits. Used for one-time WhatsApp verification and duplicate prevention.</small>
                </label>
                <p className="ballot__note">
                  Fair ballot guarantee: each verified email and WhatsApp combination is allowed strictly one vote in the People's
                  Choice Category. Duplicate entries update the existing ballot.
                </p>
                {stage !== 'verified' && (
                  <Btn type="submit" tone="ink" disabled={stage === 'verifying'}>
                    {stage === 'verifying' ? 'Verifying credentials…' : 'Submit and proceed to vote'}
                  </Btn>
                )}
              </form>

              {stage === 'verified' && (
                <div className="ballot__step" id="ballot-voting-section">
                  <h3>Cast your ballot</h3>
                  <label className="field">
                    <span>Nominated college or institution (required)</span>
                    <select id="college-ballot-choice" value={college} onChange={(e) => setCollege(e.target.value)} disabled={cast} required>
                      <option value="" disabled>Choose a nominated college</option>
                      {ballotColleges.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </label>
                  <Btn onClick={castVote}>Confirm and cast official vote</Btn>
                  {cast && (
                    <div className="ballot__done" id="vote-cast-success" role="status">
                      <h3>Vote successfully recorded</h3>
                      <p>Thank you for supporting campus social responsibility. Your verified ballot has been added to the national tally.</p>
                      <Btn href="/" tone="ink">Return to BCA home</Btn>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="ballot ballot--zoho" id="zoho-verify-container">
              <h2>Official Bhumi Volunteering portal</h2>
              <iframe src={LINKS.zohoEmbed} title="Bhumi Campus Awards Official Zoho Verification Portal" allowtransparency="true" scrolling="auto" />
            </div>
          )}
        </section>

        <PassingPhotos
          id="rules"
          title="Voting rules"
          items={voteRules.map(([, t, d], i) => [['event-photo-1.jpg', 'bca-moment-6.jpg', 'event-photo-2.jpg', 'bca-moment-7.jpg'][i], ["The People's Choice winners on stage", 'A college delegation receiving its award', 'The full BCA cohort on stage', 'A college volunteer team with its certificate'][i], t, d])}
        />
      </main>
      <Footer
        id="footer_section"
        photo="bca-moment-8.jpg"
        alt="A student volunteer raising a placard at a campus campaign"
        menu={[['BCA home', '/'], ['Award categories', '/#categories'], ['How to apply', '/#how-to-apply'], ['Partner with us', '/partner'], ['Grand Summit 2027', '/summit']]}
        portals={[['Public voting verification', LINKS.vote], ['BCA application form', LINKS.apply], ['Partner application form', LINKS.partnerForm], ['Download partner deck', LINKS.partnerDeck]]}
        blurb="India's foremost recognition platform celebrating collegiate social responsibility, sustainability, and student leadership across higher education."
      />
    </div>
  );
}
