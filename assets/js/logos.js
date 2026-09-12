/* Partner marks, as markup. White on the photo, each at the height its own
   proportions want. All from assets/img/logos/ — the PNGs were supplied dark
   on white and recoloured to white-on-transparent (gold kept) by
   tools/whiteout.swift. */
const ADOBE_A = '<svg viewBox="0 0 24 24" fill="#FA0F00" aria-hidden="true"><path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z"/></svg>';

export const LOGOS = {
  adobe: `<span class="logo logo--adobe" aria-label="Adobe">${ADOBE_A}<b>Adobe</b></span>`,
  marvin: '<span class="logo logo--marvin" aria-label="Marvin"><img src="assets/img/logos/marvin.svg" alt="Marvin"></span>',
  dscout: '<span class="logo logo--dscout" aria-label="dscout"><img src="assets/img/logos/dscout.png" alt="dscout"></span>',
  edenspiekermann: '<span class="logo logo--esp" aria-label="Edenspiekermann"><img src="assets/img/logos/edenspiekermann.svg" alt="Edenspiekermann"></span>',
  um: '<span class="logo logo--um" aria-label="University of Miami"><img src="assets/img/logos/um.png" alt="University of Miami"></span>',
  dnda: '<span class="logo logo--dnda" aria-label="Don Norman Design Award"><img src="assets/img/logos/dnda.png" alt="Don Norman Design Award"></span>',
};

export const logoStrip = (ids) =>
  ids.map((id) => LOGOS[id] || '').filter(Boolean).join('<span class="sep" aria-hidden="true"></span>');
