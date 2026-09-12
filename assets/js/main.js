import { EVENTS } from './events.js?v=20260912211007';
import { SUBMIT_ENDPOINT, POSTER_URL } from './config.js?v=20260912211007';
import { VIP, MIAMI, SITE, CITY, COPY } from './variant.js?v=20260912211007';
import { cardHTML } from './render.js?v=20260912211007';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* The VIP host adds its two events in front of the public pair. The file is
   fetched only there — the public deploy doesn't ship it. */
const ALL = MIAMI
  ? (await import('./events-miami.js?v=20260912211007')).MIAMI_EVENTS
  : VIP ? [...(await import('./events-vip.js?v=20260912211007')).VIP_EVENTS, ...EVENTS] : EVENTS;
const byId = (id) => ALL.find((e) => e.id === id) || null;

/* ---------- copy for this build ---------- */
$('#eyebrowName').textContent = COPY.eyebrow;
$('#eyebrowDates').textContent = COPY.dates;
$('#heroH1').innerHTML = COPY.h1;
$('#heroSub').innerHTML = COPY.sub;
$('#evTitle').textContent = COPY.pickHead;
$('#evSub').textContent = COPY.pickSub;
$('#formSub').textContent = COPY.formSub;
$('#doneSub').innerHTML = COPY.doneSub;
document.body.classList.add(SITE);
/* City-specific chrome: hero photo, links, footer line. */
const heroImg = $('.hero__img');
if (heroImg.getAttribute('src') !== CITY.hero) { heroImg.src = CITY.hero; heroImg.style.objectPosition = CITY.heroPos; }
$$('a[data-city="site"]').forEach((a) => (a.href = CITY.site));
$$('a[data-city="tickets"]').forEach((a) => (a.href = CITY.tickets));
$('#footLine').textContent = CITY.footer;
$('#footSite').textContent = CITY.site.replace('https://www.', '');
/* The Marvin/Dscout line belongs to the San Diego happy hour only. */
$('#consent').hidden = MIAMI;

/* ---------- the cards ---------- */
/* On the VIP page the invitation-only pair leads at full size; the two evenings
   everyone gets follow smaller, under their own line. */
$('#eveningsList').innerHTML = VIP
  ? [
      ...ALL.filter((e) => e.vip).map((e, i) => cardHTML(e, i)),
      '<p class="evenings__divider"><span>Also on your ticket</span></p>',
      ...ALL.filter((e) => !e.vip).map((e, i) => cardHTML(e, i + 2, { minor: true })),
    ].join('')
  : ALL.map((e, i) => cardHTML(e, i)).join('');

const form = $('#signup');
const cards = $$('.evening');
const submitBtn = $('#submitBtn');
const submitLabel = $('#submitLabel');
const barSummary = $('#barSummary');
const summary = $('#pickSummary');
const fine = $('#fine');
const status = $('#status');
const bar = $('#bar');

/* ---------- nothing is picked to begin with ----------
   Choosing is an explicit press on each card's button. The only exception is
   a link that names its evening (?event=adobe), which arrives with that one
   already chosen. */
const wanted = new URLSearchParams(location.search).getAll('event').filter(byId);
cards.forEach((card) => {
  $('input[type=checkbox]', card).checked = wanted.includes(card.dataset.event);
});

/* ---------- selection ---------- */
const selected = () => cards.filter((c) => $('input[type=checkbox]', c).checked).map((c) => c.dataset.event);

function reflect() {
  const ids = selected();
  cards.forEach((c) => c.classList.toggle('is-on', ids.includes(c.dataset.event)));
  form.classList.toggle('needs-pick', ids.length === 0);

  const names = ids.map((id) => byId(id).title);
  const total = ALL.length;
  const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
  submitBtn.disabled = ids.length === 0;
  if (!ids.length) {
    summary.textContent = VIP ? 'Nothing accepted yet.' : 'Nothing picked yet.';
    barSummary.textContent = VIP ? 'Accept an invitation above to start.' : 'Pick an evening above to start.';
    submitLabel.textContent = 'Confirm';
  } else {
    summary.textContent = ids.length === total
      ? (total === 2 ? 'Both evenings. Good call.' : `All ${total}. Good call.`)
      : `${list}.`;
    barSummary.textContent = `${ids.length} of ${total} · ${list}`;
    submitLabel.textContent = ids.length === 1 ? 'Confirm' : `Confirm ${ids.length}`;
  }
  /* Each partner's own consent line, only when their evening is on the form. */
  fine.innerHTML = ids.map((id) => byId(id).fine).filter(Boolean).map((t) => `<p>${t}</p>`).join('');
  readiness();
}
/* The whole card is the control; the button at its foot is the same control
   with a label on it. Links and the "what to expect" fold inside the card are
   the only places a click means something else. */
cards.forEach((c) => {
  const box = $('input[type=checkbox]', c);
  const btn = $('.evening__cta', c);
  c.addEventListener('click', (ev) => {
    if (ev.target.closest('a, .evening__toggle')) return;
    box.checked = !box.checked;
    btn.setAttribute('aria-pressed', String(box.checked));
    /* A short pop on the way in — the card answers the click, not just the
       button. Re-triggerable: the class is dropped once the animation ends. */
    c.classList.remove('is-pop'); void c.offsetWidth;
    if (box.checked) c.classList.add('is-pop');
    reflect();
  });
  c.addEventListener('animationend', (ev) => { if (ev.animationName === 'pop') c.classList.remove('is-pop'); });
});

/* On phones the description and agenda fold away; this unfolds them. It sits
   inside the card's label, so the click must not reach the checkbox. */
$$('.evening__toggle').forEach((b) => b.addEventListener('click', (ev) => {
  ev.preventDefault(); ev.stopPropagation();
  const card = b.closest('.evening');
  const open = card.classList.toggle('is-open');
  b.setAttribute('aria-expanded', String(open));
  b.querySelector('span').textContent = open ? 'Less' : 'What to expect';
}));

/* The CTA lights up the moment the form could be sent — the same treatment the
   poster tool gives its picker, here meaning "this is the last step". */
function readiness() {
  const ok = selected().length > 0 && form.checkValidity();
  submitBtn.classList.toggle('attention', ok);
}
form.addEventListener('input', readiness);

/* ---------- submit ---------- */
const payload = () => {
  const f = new FormData(form);
  return {
    events: selected(),
    name: f.get('name').trim(),
    email: f.get('email').trim(),
    role: f.get('role').trim(),
    company: f.get('company').trim(),
    country: (f.get('country') || '').trim(),
    phone: (f.get('phone') || '').trim(),
    ticket: f.get('ticket') === 'on',
    notes: '',
    submittedAt: new Date().toISOString(),
    page: location.href,
  };
};

async function send(data) {
  if (!SUBMIT_ENDPOINT) {
    /* Preview build: nothing is saved, and the banner at the top says so. */
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, preview: true };
  }
  const res = await fetch(SUBMIT_ENDPOINT, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `The server answered ${res.status}.`);
  return body;
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  if (!selected().length) { $('#evenings').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  if (!form.reportValidity()) return;

  const data = payload();
  submitBtn.disabled = true;
  submitBtn.classList.add('is-busy');
  submitBtn.classList.remove('attention');
  submitLabel.textContent = 'Saving…';
  status.hidden = true;
  try {
    const r = await send(data);
    done(data, r);
  } catch (err) {
    status.hidden = false;
    status.textContent = `Couldn’t save that — ${err.message} Your answers are still here; try again in a moment.`;
    submitBtn.classList.remove('is-busy');
    reflect();
  }
});

/* ---------- done ---------- */
function ics(e) {
  const stamp = (s) => s.replace(/[-:]/g, '');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//DDX//Side events//EN', 'BEGIN:VEVENT',
    `UID:${e.id}-ddx-san-diego-2026@ddxconference.com`,
    `DTSTART;TZID=America/Los_Angeles:${stamp(e.start)}`,
    `DTEND;TZID=America/Los_Angeles:${stamp(e.end)}`,
    `SUMMARY:DDX ${CITY.name} — ${e.title} · ${e.by}`,
    `LOCATION:${e.venue}, ${e.address}`,
    `DESCRIPTION:${e.lede}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}

function done(data, r) {
  const first = data.name.split(' ')[0] || 'you';
  const picked = data.events.map(byId);
  $('#doneName').textContent = first;
  $('#doneList').innerHTML = picked.map((e) => `
    <li>
      <span class="done__when">${e.weekday} · ${e.time}</span>
      <strong>${e.title} <em>${e.by}</em></strong>
      <span class="done__where">${e.venue}</span>
      <a class="done__cal" download="ddx-${e.id}.ics" href="data:text/calendar;charset=utf-8,${encodeURIComponent(ics(e))}">Add to calendar</a>
    </li>`).join('');
  $('#doneMail').textContent = data.email;
  $('#posterLink').href = `${POSTER_URL}?edition=${CITY.edition}&name=${encodeURIComponent(data.name)}`;
  $('#donePreview').hidden = !r.preview;

  $('#formWrap').hidden = true;
  bar.hidden = true;
  document.body.classList.remove('has-bar');
  const doneEl = $('#done');
  doneEl.hidden = false;
  doneEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- ready ----------
   Nothing moves until the webfont and the hero photo are in, so the page
   assembles once instead of reflowing around a late image. */
if (!SUBMIT_ENDPOINT) $('#previewBar').hidden = false;
document.body.classList.add('has-bar');
reflect();
const hero = $('.hero__img');
Promise.all([document.fonts.ready, hero.complete ? Promise.resolve() : new Promise((r) => { hero.onload = r; hero.onerror = r; })])
  .then(() => document.body.classList.add('ready'));
