/* The two evenings. This is the only place they live: the cards, the calendar
   files, the consent lines and the Notion mapping all read from it.

   `notion` names the property that holds the email in each database — the two
   databases were created separately and spell it differently. */
export const CITY = 'San Diego';
export const CONFERENCE = { date: 'Thursday 17 September 2026', venue: 'UC San Diego Park & Market' };

export const EVENTS = [
  {
    id: 'adobe',
    kicker: 'The night before',
    title: 'Create Now',
    by: 'with Adobe',
    partners: ['adobe'],
    weekday: 'Wednesday', date: '16 September 2026', time: '6:00 – 9:00 PM',
    start: '2026-09-16T18:00:00', end: '2026-09-16T21:00:00',
    venue: 'The Lane', address: '900 Bayfront Ct, Ste 200, San Diego, CA 92101',
    maps: 'https://maps.google.com/?q=The+Lane,+900+Bayfront+Ct+Ste+200,+San+Diego,+CA+92101',
    bg: 'assets/img/bg/create-now.jpg', bgPos: '50% 42%',
    lede: 'Arrive a stranger. Leave with people to sit next to tomorrow.',
    body: 'Adobe opens San Diego Design Week the evening before DDX: real workflows in Photoshop, Illustrator and Firefly from the people who build them, local creators on stage, and drinks and bites on the bay.',
    agenda: [
      ['6:00', 'Get settled — check in, a drink, a bite'],
      ['7:00', 'Get inspired — Adobe’s Michael Fugoso and local creators'],
      ['8:00', 'Get connected — meet the speakers and each other'],
    ],
    fine: 'By attending you consent to the use of your likeness in photos and video from the event.',
    notion: { email: 'Email', db: '3ce9967f-86f3-80ca-83a3-c55fea88789f' },
  },
  {
    id: 'happy-hour',
    kicker: 'After the last talk',
    title: 'Happy Hour',
    by: 'with Marvin & dscout',
    partners: ['marvin', 'dscout'],
    weekday: 'Thursday', date: '17 September 2026', time: '6:00 – 8:30 PM',
    start: '2026-09-17T18:00:00', end: '2026-09-17T20:30:00',
    venue: 'UC San Diego Park & Market', address: '1100 Market St, San Diego, CA 92101',
    maps: 'https://maps.google.com/?q=UC+San+Diego+Park+%26+Market,+1100+Market+St,+San+Diego,+CA+92101',
    bg: 'assets/img/bg/park-market.jpg', bgPos: '50% 55%',
    lede: 'The ideas are still warm. Don’t let them cool on the way to the hotel.',
    body: 'When the stage goes dark, the room doesn’t. Marvin and dscout host drinks, food and the conversations that didn’t fit in the Q&A, right where the conference ends. Registration required. Please use your business email.',
    agenda: [
      ['6:00', 'Doors — straight from the closing session'],
      ['6:30', 'Food, drinks and the people you meant to talk to'],
      ['8:30', 'Last call'],
    ],
    /* The Marvin/Dscout consent line is printed permanently under the form
       (index.html), not only once this card is picked. */
    fine: '',
    notion: { email: 'Business Email', db: '3d09967f-86f3-8021-b7cc-c8f926efbd34' },
  },
];

export const byId = (id) => EVENTS.find((e) => e.id === id) || null;
