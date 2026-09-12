/* The VIP additions. Served only on the VIP host — the public deploy leaves
   this file out, so an invitation-only roundtable never sits in a public
   page's source. Same shape as events.js.

   Both write to their own CRM next to the public ones, created 2026-09-10:
   "CRM San Diego Executive Roundtable" and "CRM San Diego VIP Dinner". */
export const VIP_EVENTS = [
  {
    id: 'roundtable',
    vip: true,
    kicker: 'Morning of · twelve chairs',
    title: 'VIP Executive Roundtable',
    by: 'hosted by Don Norman & DNDA',
    partners: ['dnda'],
    weekday: 'Thursday', date: '17 September 2026', time: '9:15 – 9:45 AM',
    start: '2026-09-17T09:15:00', end: '2026-09-17T09:45:00',
    venue: 'UC San Diego Park & Market, 1st floor', address: '1100 Market St, San Diego, CA 92101',
    maps: 'https://maps.google.com/?q=UC+San+Diego+Park+%26+Market,+1100+Market+St,+San+Diego,+CA+92101',
    bg: 'assets/img/bg/don-norman.jpg', bgPos: '70% 30%',
    seats: '12 selected leaders · invitation only',
    tick: { on: 'Seat reserved', off: 'Reserve my seat' },
    lede: 'Twelve chairs. One of them has your name on it.',
    body: 'The future of humanity-centred design, in thirty minutes, with the man who wrote the book on it. Don Norman and his non-profit, the Don Norman Design Award, host twelve selected leaders upstairs at the venue before the doors open. You are one of them.',
    agenda: [
      ['9:15', 'Coffee upstairs, doors closed — twelve people, one table'],
      ['9:20', 'Don Norman opens: what humanity-centred design asks of leaders now'],
      ['9:45', 'Down to the main stage for the opening'],
    ],
    fine: 'Invitation only. Please don’t forward — the seat is tied to your name.',
    notion: { email: 'Email', db: 'f79c8f08-281d-4ea5-8ad2-bfa8af99b605', dataSource: 'ccfbeb1d-2c31-4435-ac98-fad8f84d3fa2' },
  },
  {
    id: 'dinner',
    vip: true,
    kicker: 'The night before',
    title: 'VIP Dinner',
    by: 'powered by Edenspiekermann',
    partners: ['edenspiekermann'],
    weekday: 'Wednesday', date: '16 September 2026', time: '7:30 PM',
    start: '2026-09-16T19:30:00', end: '2026-09-16T22:00:00',
    venue: 'Nolita Hall, Little Italy', address: '2305 India St, San Diego, CA 92101',
    maps: 'https://maps.google.com/?q=Nolita+Hall,+2305+India+St,+San+Diego,+CA+92101',
    bg: 'assets/img/bg/nolita.jpg', bgPos: '50% 60%',
    seats: 'VIP guests · seat reserved for you',
    tick: { on: 'Seat reserved', off: 'Reserve my seat' },
    lede: 'A long table, a short guest list, and no slides.',
    body: 'Dinner in Little Italy with the people who run design and product at companies you know, hosted by Edenspiekermann. No agenda, no stage — the conversation the conference doesn’t have room for. Slip out of Create Now early; your seat is kept.',
    agenda: [
      ['7:30', 'Drinks at the bar'],
      ['8:00', 'Dinner is served'],
      ['Late', 'Whenever the table decides'],
    ],
    fine: '',
    notion: { email: 'Email', db: '4a3958a6-8ab3-4a1a-860c-7faefb4078f2', dataSource: '3c5d4a2f-cba3-4e87-934f-089f1a272480' },
  },
];
