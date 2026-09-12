/* Which build this is. One codebase, two hosts:
     side-sandiego.ddxconference.com  → the public page, two evenings
     vip-sandiego.ddxconference.com   → the VIP page, the same two plus a dinner
                                         and Don Norman's roundtable
   Chosen from the hostname at runtime; ?vip=1 forces it for local review, and
   the artifact build sets __VIP__ because it has no hostname of its own. */
const q = new URLSearchParams(location.search);
export const VIP = globalThis.__VIP__ === true || location.hostname.startsWith('vip-') || q.has('vip');
export const MIAMI = globalThis.__MIAMI__ === true || location.hostname.startsWith('side-miami') || q.has('miami');
export const SITE = MIAMI ? 'miami' : VIP ? 'vip' : 'public';

/* What differs per city: the poster edition, the footer line, the hero photo. */
export const CITY = MIAMI
  ? { name: 'Miami', edition: 'miami', hero: 'assets/img/bg/miami-beach.jpg', heroPos: '50% 60%',
      footer: 'DDX Miami · 25 September 2026 · The LAB Miami', site: 'https://www.ddxconference.com/miami', tickets: 'https://luma.com/ddxmiami' }
  : { name: 'San Diego', edition: 'san-diego', hero: 'assets/img/bg/sunset-cliffs.jpg', heroPos: '50% 42%',
      footer: 'DDX San Diego · 17 September 2026 · UC San Diego Park & Market', site: 'https://www.ddxconference.com/sandiego', tickets: 'https://luma.com/ddxsd' };

export const COPY = MIAMI
  ? {
      eyebrow: 'DDX Miami',
      dates: '24 – 25 September 2026',
      h1: 'One day<br>on stage.<br><em>One evening</em><br>on campus.',
      sub: 'The night before DDX Miami, the University of Miami opens the Frost Institute for a panel and a reception. <b>Free for DDX ticket holders</b> — tell us you’re coming.',
      pickHead: 'The evening before',
      pickSub: 'Tap the card to add it. Then save your spot below.',
      formSub: 'We use the same details as your DDX ticket, so the door list matches.',
      doneSub: 'We’ve saved your spot and will confirm to <b id="doneMail"></b> before the week. Bring the ticket QR, and your questions for the panel.',
    }
  : VIP
  ? {
      eyebrow: 'DDX San Diego · VIP',
      dates: '16 – 17 September 2026',
      h1: 'One day<br>on stage.<br><em>A few seats</em><br>saved for you.',
      sub: 'You’re on the DDX San Diego VIP list. That means a dinner the night before, a chair at Don Norman’s table on the morning of, and the two evenings around the conference. <b>Tell us which ones you’re taking.</b>',
      pickHead: 'Your invitations',
      pickSub: 'Tap to accept. The roundtable has twelve chairs and one is yours until you say otherwise.',
      formSub: 'One form for everything. We use the same details as your DDX ticket, so every door list matches.',
      doneSub: 'We’ve reserved your seats and will confirm to <b id="doneMail"></b> before the week. Bring the ticket QR, and your questions from the day.',
    }
  : {
      eyebrow: 'DDX San Diego',
      dates: '16 – 17 September 2026',
      h1: 'One day<br>on stage.<br><em>Two evenings</em><br>to remember.',
      sub: 'The talks are why you booked the ticket. The evenings are why you’ll come back. <b>Both are free for DDX ticket holders</b> — tell us which ones you’re joining.',
      pickHead: 'Pick your evenings',
      pickSub: 'Tap a card to add it. Both is the right answer.',
      formSub: 'One form for both evenings. We use the same details as your DDX ticket, so the door list matches.',
      doneSub: 'We’ve saved your spot and will confirm to <b id="doneMail"></b> before the week. Bring the ticket QR, and your questions from the day.',
    };
