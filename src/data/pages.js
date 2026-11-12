// Summit, Partner and Vote page content (verbatim from summit.php, partner.php, vote.php).

export const tickerSummit = [
  'CAMPUS CHANGEMAKERS SUMMIT',
  'VENUE AND DATES TO BE ANNOUNCED SOON',
  'REGISTRATION OPEN (FIRST-COME, FIRST-SERVED)',
  'DISCOVER • LEARN • RECOGNISE • INSPIRE',
];

export const whyAttend = [
  ['Learn what actually works', 'Analyze real models from campuses currently leading in volunteer mobilization and social impact. Skip theoretical talks and discover proven frameworks.'],
  ['Build real connections', 'Network with faculty, student leaders, NGOs, and corporate CSR leaders in a single room. Expand your collegiate partner ecosystem across India.'],
  ['Walk away with a plan', 'Gain practical, scalable ideas and roadmaps you can implement on your campus the very next week to mobilize hundreds of student volunteers.'],
  ["Get on Bhumi's radar", 'Open doors for future institutional partnerships, sustained mentorship, grant funding, and national spotlight for your college clubs.'],
];

export const tracks = [
  ['TRACK 01 • ECOSYSTEM LEADERSHIP', 'Fireside Chat', 'Hear directly from ecosystem leaders on how cross-sector collaboration can close real community gaps.'],
  ['TRACK 02 • PROVEN PLAYBOOKS', 'Spark Stories', 'Short, high-impact presentations on proven volunteering ideas you can adapt for your own campus.'],
  ['TRACK 03 • LIVE PITCHING', 'Change Your Challenge', 'Sharpen your problem-solving on stage, Pitch live solutions; the best idea wins a special gift.'],
  ['TRACK 04 • NATIONAL CONNECT', 'Networking', 'Connect with changemakers from campuses across India. Build long-term multi-college alliances.'],
];

export const tickerPartner = [
  'PARTNERSHIP ECOSYSTEM 2027',
  '200+ COLLEGES NATIONWIDE',
  '70,000+ STUDENT VOTERS',
  'VENUE AND DATES TO BE ANNOUNCED SOON',
  'BHUMI CAMPUS AWARDS 2027',
  'FUELING STUDENT-LED IMPACT',
  'ELEVATING CAMPUS SOCIAL RESPONSIBILITY',
];

export const partnerStats = [
  { value: 200, suffix: '+', label: 'Colleges Nationwide' },
  { value: 30, suffix: '+', label: 'Awards Conferred' },
  { value: 70000, suffix: '+', label: 'Student Voters' },
  { value: 200000, suffix: '+', label: 'Youth Reached' },
];

export const whyPartner = [
  ['Advance Your Mission', 'Influence thousands of socially conscious students and colleges aligned with your cause.'],
  ['Youth Engagement at Scale', 'Reach 50,000+ verified youth voters nationwide – the largest socially active campus community.'],
  ['Visibility & Recognition', 'Position your organisation among India’s top socially responsible colleges and youth leaders.'],
  ['Network with Changemakers', 'Build partnerships with progressive colleges, youth clubs, and administrators aligned with your values.'],
  ['Celebrate your Impact', 'Get recognised on a national stage dedicated to social impact and sustainability.'],
];

// true = included, false = not included, 'x' = "Exclusive at 30"
export const matrix = [
  ['Acknowledgement during Event', true, true, true],
  ['Logo on Website', true, true, true],
  ['Logo at Venue', false, true, true],
  ['Logo on Stage', false, false, true],
  ['Invited to Awards event', true, true, true],
  ['Invitation to Jury Panel', false, false, 'x'],
  ['Opportunity to Handover Awards', false, false, 'x'],
  ['Pro-Bono Consulting on Youth Volunteer Engagement', false, false, 'x'],
];

export const tickerVote = [
  'VOTER VERIFICATION 2027',
  "PEOPLE'S CHOICE CATEGORY",
  '70,000+ STUDENT VOTERS',
  'ONE VERIFIED BALLOT PER VOTER',
  'BHUMI CAMPUS AWARDS 2027',
  'VENUE AND DATES TO BE ANNOUNCED SOON',
];

export const ballotColleges = [
  ['DG Vaishnav College, Chennai', 'DG Vaishnav College, Chennai (Rotaract & NSS)'],
  ['Loyola College, Chennai', 'Loyola College, Chennai (YRC & Outreach Club)'],
  ['Stella Maris College, Chennai', 'Stella Maris College, Chennai (Social Arts Forum)'],
  ['IIT Madras, Chennai', 'IIT Madras (NSS Social Welfare Track)'],
  ['Christ University, Bangalore', 'Christ University, Bangalore (Centre for Social Action)'],
  ["St. Xavier's College, Kolkata", "St. Xavier's College, Kolkata (AICUF Social Cell)"],
  ['Hansraj College, Delhi', 'Hansraj College, Delhi University (NSS & Harit)'],
  ['Symbiosis International, Pune', 'Symbiosis International, Pune (SCOPE Volunteer Unit)'],
  ['PSG College of Technology, Coimbatore', 'PSG College of Technology, Coimbatore (Youth Club)'],
  ['Other Nominated College', 'Other Nominated Campus (Enter in notes)'],
];

export const voteRules = [
  ['', '1 Person = 1 Vote', 'Rigorous verification prevents multiple automated votes. Each email and phone combination receives exactly one vote in the final count.'],
  ['', "People's Choice", "Unlike jury-evaluated categories, the People's Choice Award is 100% determined by verified collegiate and public voting."],
  ['', '200+ Campuses', 'Colleges across North, South, East, West, and Central zones compete for national social responsibility honors.'],
  ['', 'Need Help?', 'Facing any verification issues? Contact the secretariat via email at campusawards@bhumi.ngo.'],
];
