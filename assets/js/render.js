import { logoStrip } from './logos.js?v=20260912211007';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TICK = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

/* One evening as one selectable card. Everything comes from the event object;
   the markup here is the only place the card's shape is written. */
export function cardHTML(e, i, { minor = false } = {}) {
  const tick = e.tick || { on: 'I’m in', off: 'Count me in' };
  const third = e.seats ? `<dt>Seats</dt><dd>${esc(e.seats)}</dd>` : '';
  return `
<article class="evening${e.vip ? ' evening--vip' : ''}${minor ? ' evening--minor' : ''}" data-event="${e.id}" style="--i:${i}">
  <input type="checkbox" name="event" value="${e.id}" class="sr-only" tabindex="-1" aria-hidden="true">
  <div class="evening__photo">
    <img src="${e.bg}" alt="" style="object-position:${e.bgPos || '50% 50%'}">
    ${e.vip ? '<span class="evening__vip">VIP</span>' : ''}<span class="evening__kicker">${esc(e.kicker)}</span>
    <span class="evening__badge" aria-hidden="true">${TICK}</span>
    <div class="evening__logos">${logoStrip(e.partners)}</div>
  </div>
  <div class="evening__body">
    <h3 class="evening__title">${esc(e.title)}<small>${esc(e.by)}</small></h3>
    <p class="evening__date"><b>${esc(e.weekday)} ${esc(e.date.replace(/ \d{4}$/, ''))}</b><span>${esc(e.time)}</span></p>
    <dl class="facts">
      <dt>Where</dt><dd><b>${esc(e.venue)}</b> · <a href="${e.maps}" target="_blank" rel="noopener">${esc(e.address.split(',')[0])}</a></dd>
      ${third}
    </dl>
    <p class="evening__lede">${esc(e.lede)}</p>
    <button type="button" class="evening__toggle" aria-expanded="false"><span>What to expect</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
    <div class="evening__more">
      <p class="evening__copy">${esc(e.body)}</p>
      <dl class="agenda">${e.agenda.map(([t, w]) => `<dt>${esc(t)}</dt><dd>${esc(w)}</dd>`).join('')}</dl>
    </div>
    <button type="button" class="evening__cta" aria-pressed="false" aria-label="${esc(tick.off)}: ${esc(e.title)}">
      <i>${TICK}</i><span class="off">${esc(tick.off)}</span><span class="on">${esc(tick.on)}</span>
    </button>
  </div>
</article>`;
}
