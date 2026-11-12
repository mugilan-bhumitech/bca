export const tickerHome = [
  'BCA 2027 APPLICATIONS OPEN',
  'CAMPUS CHANGEMAKERS SUMMIT & AWARDS CEREMONY: VENUE AND DATES TO BE ANNOUNCED SOON',
  'APPLICATIONS CLOSING SOON',
];

export const impactStats = [
  { chip: 'PAN-INDIA', value: 200, suffix: '+', label: 'Colleges Engaged' },
  { chip: 'RECOGNITION', value: 71, suffix: '', label: 'Campuses in Spotlight' },
  { chip: "PEOPLE'S CHOICE", value: 70000, suffix: '+', label: 'Student Voters' },
  { chip: 'SUMMIT PASS', text: 'TBA', label: 'Summit & Awards' },
];

export const whyBca = [
  ['Celebrate Social Responsibility', 'Acknowledge and reward institutions making a real difference to society and instilling humane civic values.'],
  ['Inspire Change', 'Showcase success stories that motivate other campuses across India to take active, lasting social action.'],
  ['Build Networks', 'Connect with NGOs, CSR leaders and changemakers — now in person at the Campus Changemakers Summit.'],
  ['Promote Excellence', 'Recognise the faculty, students and staff driving measurable social and environmental impact on campus.'],
  ['Learn & Grow', 'Get access to real, proven models of campus volunteering through the Campus Changemakers Summit.'],
  ['Be Part of a Movement', 'Join a growing national community of campuses recognising, learning from, and inspiring one another.'],
];

export const benefits = [
  ['', 'National Recognition', "Celebrate your college on India's foremost stage for higher education social responsibility."],
  ['', 'Invite to the BCA Summit', 'Exclusive delegate access to the Campus Changemakers Summit (Venue and Dates to be announced soon).'],
  ['', 'Featured in Bhumi Publications', 'Documented case studies circulating to CSR heads, government bodies, and social investors.'],
  ['', 'Certificate & Trophy', 'Official commendation trophy and certificates recognizing excellence for institution, faculty, and students.'],
  ['', 'Social Media Spotlight', "Spotlight campaigns across Bhumi's digital channels reaching 2,00,000+ socially active students."],
  ['', 'Networking Access to Leaders', 'Direct engagement with corporate CSR decision-makers, NGO founders, and peer university leaders.'],
  ['', 'Bhumi Goodies & More!', 'Special changemaker gift hampers, structured volunteer kits, and priority access to year-round national campaigns.'],
];

export const imperatives = [
  ['Shaping Empathetic Future Leaders', 'Crucial for shaping future leaders by instilling foundational values of empathy, integrity, and lifelong civic commitment.'],
  ['Leading Environmental Conservation', 'Colleges have a responsibility to lead by example in sustainable practices, zero waste management, and renewable energy adoption.'],
  ['Holistic Hands-On Education', 'Hands-on experience in real-world problem-solving equips students with practical skills, adaptability, and an enduring sense of purpose.'],
  ['Global Standing & Partnerships', 'A proven commitment to social responsibility elevates a college’s standing globally, attracting prestigious collaborations and grants.'],
];

export const filters = [
  { key: 'all', label: 'All Honors', count: 11 },
  { key: 'institution', label: 'Institution-Level', count: 7 },
  { key: 'student', label: 'Student-Level', count: 2 },
  { key: 'faculty-clubs', label: 'Faculty & Clubs', count: 2 },
];

// Card fields from the category grid; `key` opens the matching dossier.
export const categories = [
  { key: 'cat1', group: 'institution', pill: 'Zone-Wise Award', code: 'Four Zones', tone: 'blue', title: 'Most Socially Responsible Campus', desc: 'Recognizes higher education institutions with impactful, well-rounded, and sustained social responsibility initiatives.' },
  { key: 'cat2', group: 'institution', pill: 'Zone-Wise Award', code: 'Video Required', tone: 'orange', title: 'Innovative Social Initiative Award', desc: 'Recognizes institutions implementing innovative and impactful solutions to pressing community challenges.' },
  { key: 'cat3', group: 'institution', pill: 'Zone-Wise Award', code: 'Sustainability', tone: 'teal', title: 'Most Eco-Friendly Campus', desc: 'Setting the standard for green campus practices, renewable transition, zero waste management, and biodiversity.' },
  { key: 'cat5', group: 'institution', pill: 'Grant Category', code: 'GDD Campaign', tone: 'pink', title: 'Good Deeds in Action – Volunteer Award', desc: 'Recognizes institutions engaging the highest number of volunteers in Good Deeds Day (GDD) campaigns.' },
  { key: 'cat6', group: 'institution', pill: 'Grant Category', code: 'GDD Campaign', tone: 'purple', title: 'Good Deeds in Action – Impact Award', desc: 'Recognizes institutions with the most innovative and deeply impactful Good Deeds Day campaigns.' },
  { key: 'cat7', group: 'institution', pill: 'Joy of Giving', code: 'Daan Utsav', tone: 'blue', title: 'Daan Utsav – Volunteer Award', desc: 'Recognizes institutions engaging the highest number of dedicated volunteers during the Daan Utsav festival.' },
  { key: 'cat8', group: 'institution', pill: 'Joy of Giving', code: 'Video Required', tone: 'teal', title: 'Daan Utsav – Impact Award', desc: 'Recognizes institutions with the most innovative and impactful Daan Utsav community giving campaigns.' },
  { key: 'cat9', group: 'student', pill: 'Student Award', code: 'Individual', tone: 'pink', title: 'Student Changemaker of the Year', desc: 'Recognizes an exceptional student leader who has spearheaded inspiring, impactful volunteer initiatives in society.' },
  { key: 'cat10', group: 'student', pill: 'Student Award', code: 'Innovation', tone: 'orange', title: 'Social Innovation Leader', desc: 'Recognizes a student who has developed innovative and impactful solutions to social or environmental challenges.' },
  { key: 'cat11', group: 'faculty-clubs', pill: 'Faculty Honor', code: 'Mentorship', tone: 'purple', title: 'Inspiring Faculty Leader Award', desc: 'Recognizes faculty leaders who actively integrate volunteering, drive student participation, and foster innovation.' },
  { key: 'cat12', group: 'faculty-clubs', pill: 'Chapter Honor', code: 'Annual Impact', tone: 'gold', title: 'Bhumi Club of the Year', desc: 'Recognizes clubs with consistent, innovative, and impactful social initiatives throughout the year.' },
];

// Dossier modal content (verbatim from index.php's dossierData).
export const dossiers = {
  cat1: { title: 'Most Socially Responsible Campus', badge: 'ZONE-WISE AWARD • FOUR ZONES', desc: 'Recognizes higher education institutions with impactful, well-rounded, and sustained social responsibility initiatives.', criteria: ['Campus-wide volunteering participation rate (% of total student body)', 'Long-term measurable impact on local beneficiary communities', 'Institutional support, faculty guidance, and CSR co-funding mechanisms', 'Continuity and institutionalization of community outreach drives'], grant: 'Winner, Runner 1, and Runner 2 awards with official trophies and commendation certificates.' },
  cat2: { title: 'Innovative Social Initiative Award', badge: 'ZONE-WISE AWARD • VIDEO REQUIRED', desc: 'Recognizes institutions implementing innovative and impactful solutions to pressing community challenges.', criteria: ['Originality and ingenuity of the social problem-solving approach', 'Mandatory short video demonstrating field execution and results', 'Scalability to other campuses and communities'], grant: 'Winner, Runner 1, and Runner 2 trophies and national showcase.' },
  cat3: { title: 'Most Eco-Friendly Campus', badge: 'ZONE-WISE AWARD • SUSTAINABILITY', desc: 'Setting the standard for green campus practices, renewable transition, zero waste management, and biodiversity.', criteria: ['Documented waste reduction, recycling, and solar adoption', 'Student-led biodiversity, tree-plantation, and water conservation drives', 'Curricular and co-curricular environmental advocacy'], grant: 'Green Campus Trophy and institutional citation.' },
  cat5: { title: 'Good Deeds in Action – Volunteer Award', badge: 'GRANT CATEGORY • GDD CAMPAIGN', desc: 'Recognizes institutions engaging the highest number of volunteers in Good Deeds Day (GDD) campaigns.', criteria: ['Highest number of verified volunteers engaged in GDD campaigns', 'Organise volunteering activities during the official campaign window', 'Document with photos, volunteer data & a short video'], grant: 'Winner trophy & ₹25,000 project grant reimbursement for social initiatives.' },
  cat6: { title: 'Good Deeds in Action – Impact Award', badge: 'GRANT CATEGORY • GDD CAMPAIGN', desc: 'Recognizes institutions with the most innovative and deeply impactful Good Deeds Day campaigns.', criteria: ['Depth of community impact and problem-solving during GDD', 'Creative volunteer engagement and sustained outcome', 'Mandatory short video documenting project execution'], grant: 'Winner trophy & ₹1,00,000 project grant reimbursement for social initiatives.' },
  cat7: { title: 'Daan Utsav – Volunteer Award', badge: 'JOY OF GIVING • DAAN UTSAV', desc: 'Recognizes institutions engaging the highest number of dedicated volunteers during the Daan Utsav festival.', criteria: ['Mobilization volume during the Joy of Giving festival (Daan Utsav)', 'Campus-wide participation across departments and student bodies'], grant: 'Daan Utsav Trophy and commendation certificate.' },
  cat8: { title: 'Daan Utsav – Impact Award', badge: 'JOY OF GIVING • VIDEO REQUIRED', desc: 'Recognizes institutions with the most innovative and impactful Daan Utsav community giving campaigns.', criteria: ['Measurable benefit and generosity channeled to underprivileged groups', 'Creative campaign structure and high student engagement', 'Mandatory short video submission showing execution'], grant: 'Daan Utsav Impact Trophy and certificate.' },
  cat9: { title: 'Student Changemaker of the Year', badge: 'STUDENT AWARD • INDIVIDUAL', desc: 'Recognizes an exceptional student leader who has spearheaded inspiring, impactful volunteer initiatives in society.', criteria: ['Individual student application with documented community project', 'Leadership, empathy, and team mobilization demonstrated', 'Measurable social outcomes and peer endorsements'], grant: 'Youth Changemaker Trophy, Citation, and Summit Invitation.' },
  cat10: { title: 'Social Innovation Leader', badge: 'STUDENT AWARD • INNOVATION', desc: 'Recognizes a student who has developed innovative and impactful solutions to social or environmental challenges.', criteria: ['Innovative method, product, or campaign designed by a student', 'Proof of implementation and community feedback'], grant: 'Social Innovation Leader Trophy and national showcase.' },
  cat11: { title: 'Inspiring Faculty Leader Award', badge: 'FACULTY HONOR • MENTORSHIP', desc: 'Recognizes faculty leaders who actively integrate volunteering, drive student participation, and foster innovation.', criteria: ['Integration of volunteering and service-learning into campus life', 'Mentorship of student clubs, NSS, NCC, or social initiatives', 'Nominated by college management or self-application by coordinator'], grant: 'Inspiring Faculty Trophy and Academic Honor Citation.' },
  cat12: { title: 'Bhumi Club of the Year', badge: 'CHAPTER HONOR • ANNUAL IMPACT', desc: 'Recognizes clubs with consistent, innovative, and impactful social initiatives throughout the year.', criteria: ['Consistency of community campaigns across the full academic year', 'Student volunteer retention and transparent impact reporting'], grant: 'Club of the Year Trophy, project support, and Summit feature.' },
};

export const DOSSIER_DOCS =
  'Photos, videos, reports, testimonials and any material that clearly shows your work and impact. A short video is mandatory for every project submitted.';

export const applySteps = {
  one: [
    ['Apply for up to 3 categories:', " Self-nomination is mandatory for all categories, except People's Choice."],
    ['Three-Part Submission:', ' The form has 3 parts: General Info, Project Submission (1–2 projects with proof), and Category-Specific Questions.'],
    ['Mandatory Video:', ' A short video is mandatory for every project you submit.'],
    ['Student Category Eligibility:', ' Students can only apply for Student Changemaker of the Year & Social Innovation Leader. All other categories must be submitted by a Faculty Coordinator or nominated staff.'],
    ['GDD / Daan Utsav Categories:', ' Participation in Good Deeds Day (GDD) / Daan Utsav (DU) is required if you want to apply for GDD or DU award categories. Organise volunteering activities during the official campaign window and document with photos, volunteer data & a short video.'],
  ],
};

export const phases = [
  ['Direct Applications', 'Colleges and eligible student leaders submit self-nominations detailing their year-round community impact with required project proof and video.'],
  ['3-Tier Jury Evaluation', 'An expert panel of corporate CSR and NGO leaders reviews submissions across 3 independent rounds evaluating metrics, sustainability, and innovation.'],
  ['Public Voting (Zone-Wise)', "Verified public digital voting determines the People's Choice winner for each geographic zone across thousands of active student supporters."],
  ['Summit & Awards Conclave', 'Top 5 finalists per category convene for morning learning sessions and the grand national awards ceremony (Venue and Dates to be announced soon).'],
];

export const keyDates = [
  ['Applications Open', 'October 9, 2026'],
  ["Public Voting Opens (People's Choice)", 'October 19, 2026'],
  ['Campus Changemakers Summit Registration Opens', 'November 1, 2026'],
  ['BCA Application Closes (1st deadline)', 'November 20, 2026'],
  ['Campus Changemakers Summit Registration Closes', 'November 30, 2026'],
  ['BCA Application Closes (2nd deadline)', 'December 5, 2026', 'hot'],
  ["Finalists Announced (Top 5 for every category, except People's Choice)", 'December 15, 2026'],
  ["Public Voting Closes for People's Choice Category", 'December 15, 2026*'],
  ['Winners Notified', 'Mid-December 2026'],
  ['BCA Campus Changemakers Summit & Awards Ceremony', 'Venue and Dates to be announced soon', 'finale'],
];

export const moments = [
  ['bca-dg-vaishnav-winner.jpg', 'Overall Winner — The Social Exemplar', 'Dwaraka Doss Goverdhan Doss Vaishnav College receiving the prestigious Social Exemplar award on the national stage.', 'Overall Winner — The Social Exemplar: Dwaraka Doss Goverdhan Doss Vaishnav College'],
  ['bca-guru-nanak-award.jpg', 'Best Waste Management at Campus', 'Guru Nanak College honored for institutional eco-conservation, composting, and zero-waste initiatives.', 'Best Waste Management at Campus — Guru Nanak College'],
  ['bca-2022-ceremony-stage.jpg', 'Youth Changemakers & Campus Volunteers', 'Empowering young student leaders to tackle community challenges with empathy and teamwork.', 'Youth Changemakers & Campus Volunteers on Stage'],
  ['bca-moment-1.jpg', 'National Delegation & Ceremony', 'Celebrating faculty leaders, principals, and top-performing student clubs on the grand stage.', 'National Delegation & Ceremony'],
  ['bca-moment-2.jpg', 'Faculty Leadership & Mentorship Honors', 'Recognizing visionary faculty advisors who guide campus NSS, NCC, and social impact clubs year-round.', 'Faculty Leadership & Mentors Recognition'],
  ['bca-moment-3.jpg', 'Student Changemakers Trophy Spotlight', 'Honoring exceptional student changemakers tackling pressing issues through hands-on service.', 'Student Changemaker Trophy Celebration'],
  ['bca-moment-4.jpg', 'Campus Changemakers Conclave', 'Colleges across India convening to exchange proven volunteering playbooks and pitch live community solutions.', 'Campus Changemakers Summit Delegates'],
  ['bca-moment-5.jpg', 'Institutional Leadership Felicitation', 'Higher education administrators committed to integrating community engagement into campus culture.', 'Deans & Institutional Leadership Felicitation'],
  ['bca-moment-6.jpg', 'Civic Volunteer Mobilization', 'Inspiring thousands of students to run cleanups, blood donation camps, and literacy drives.', 'Campus Volunteer Mobilization in Action'],
  ['bca-moment-7.jpg', 'Corporate CSR & Jury Leaders', 'Eminent jury panel connecting with campus innovators to provide industry mentorship and recognition.', 'CSR Decision-Makers & Jury Leaders'],
  ['bca-moment-8.jpg', 'All-India Higher Education Youth Network', 'Building a nationwide community of socially committed colleges advancing youth-driven transformation.', 'All-India Higher Education Youth Network'],
];

export const faqs = [
  ['Who can apply for Bhumi Campus Awards 2027?', "Any college, student leader, or faculty member across India. You don't need to be a Bhumi partner college to participate."],
  ['Is it free to apply?', 'Yes, completely free. There are no charges at any stage.'],
  ['How many categories can we apply for?', 'Up to 3 categories per college. Applying for more will lead to disqualification.'],
  ['Who should submit the application — student or faculty?', 'Students can only apply for the two student-level categories (Student Changemaker of the Year, Social Innovation Leader). All other categories must be submitted by a Faculty Coordinator or a person nominated by the college management.'],
  ['Is self-nomination mandatory?', "Yes, for every category except People's Choice."],
  ["What is the People's Choice category?", 'No application needed — the college with the highest number of votes in its zone wins directly. Voting stays open through the application period.'],
  ['Is it mandatory to participate in GDD or Daan Utsav?', 'No — only required if you want to be considered for GDD or Daan Utsav award categories.'],
  ['How many awards can one college win?', 'A maximum of 2 in total (1 Winner + 1 Runner-up combined), across all categories.'],
  ['What proof or documents are required?', 'Photos, videos, reports, testimonials and any material that clearly shows your work and impact. A short video is mandatory for every project submitted.'],
  ['How are applications evaluated?', 'An initial screening round, followed by 3 rounds of independent jury evaluation, before finalists are shortlisted.'],
  ['What is the Campus Changemakers Summit?', 'A new addition this year — a half-day gathering held on the morning of the Awards Ceremony, where colleges learn from each other through real stories, conversations and live problem-solving.'],
  ['Do I need to attend the Campus Changemakers Summit to apply for BCA?', "No, they're separate. Registration for the Campus Changemakers Summit is open on a first-come, first-served basis."],
  ['When and where is the ceremony?', 'Venue and Dates to be announced soon.'],
  ['When is the last date to apply?', 'Dec 5th (2nd deadline). First deadline closes November 20th.'],
  ['Will our college be featured publicly?', "Yes — selected colleges and individuals are featured on Bhumi's website, social media and other platforms."],
  ['What if we face issues while filling the form?', 'EMAIL'],
];
